import {NextResponse} from "next/server"
import {qrCodeFormSchema} from "@/components/Forms/QRCodeForm"
import QRCode from "qrcode"

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const body = Object.fromEntries(searchParams.entries())
  const result = qrCodeFormSchema.safeParse(body)
  if (result.success) {
    const {url, light, dark, margin} = result.data
    const filePath = `/tmp/qr-code.svg`
    await QRCode.toFile(filePath, url, {
      color: {light, dark},
      margin
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
          "Content-Type": "image/svg",
          "Content-Length": size.toString()
        }
      }
    )
  } else {
    return NextResponse.json(result.error, {status: 400})
  }
}
