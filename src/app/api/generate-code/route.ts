import {NextResponse} from "next/server"
import QRCode from "qrcode"
import {z} from "zod"

const qrCodeEndpointSchema = z.object({
  url: z.string().default(""),
  light: z
    .string()
    .refine((value) => /^#[0-9a-fA-F]{6}$/.test(value), {
      message: "Invalid hex color"
    })
    .default("#ffffff"),
  dark: z
    .string()
    .refine((value) => /^#[0-9a-fA-F]{6}$/.test(value), {
      message: "Invalid hex color"
    })
    .default("#000000"),
  margin: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "Margin must be a number greater than 0"
    }),
  fileType: z.enum(["svg", "png"]).default("svg")
})

export type QRCodeEndpoint = z.infer<typeof qrCodeEndpointSchema>

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const body = Object.fromEntries(searchParams.entries())
  const result = qrCodeEndpointSchema.safeParse(body)
  if (result.success) {
    const {url, light, dark, margin, fileType} = result.data
    const filePath = `/tmp/qr-code.${fileType}`
    await QRCode.toFile(filePath, url, {
      color: {light, dark},
      margin: Number(margin)
    })

    const {
      promises: {stat}
    } = await import("fs")
    const {size} = await stat(filePath)

    // respond with file
    return new NextResponse(
      await (await import("fs")).promises.readFile(filePath),
      {
        headers: {
          "Content-Type": fileType === "svg" ? "image/svg+xml" : "image/png",
          "Content-Length": size.toString()
        }
      }
    )
  } else {
    return NextResponse.json(result.error, {status: 400})
  }
}
