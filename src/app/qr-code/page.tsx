"use client"

import {Box, Button, Container, Typography} from "@mui/joy"
import {useCallback, useEffect, useState} from "react"
import QRCode from "qrcode"
import {
  getQRCodeFormInitializer,
  getQRCodeFormValues,
  QRCodeForm,
  qrCodeFormSchema,
  QRCodeFormValues
} from "@/components/Forms/QRCodeForm"
import {FormProvider, useForm} from "react-hook-form"
import {usePathname, useRouter, useSearchParams} from "next/navigation"

export default function QRCodePage() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const getQRCodeFromSearchParams = useCallback((): Partial<Models.QRCode> => {
    const parseResult = qrCodeFormSchema.safeParse(
      Object.fromEntries(searchParams.entries())
    )
    if (parseResult.success) {
      return parseResult.data
    } else {
      return getQRCodeFormValues()
    }
  }, [searchParams])

  const [values, setValues] = useState<QRCodeFormValues>(
    getQRCodeFormValues(getQRCodeFromSearchParams())
  )

  const formMethods = useForm<QRCodeFormValues>(
    getQRCodeFormInitializer(getQRCodeFromSearchParams())
  )
  const {watch} = formMethods

  useEffect(() => {
    const subscription = watch((updates) => {
      const newValues = {...values, ...updates}
      setValues(newValues)
      const params = new URLSearchParams({
        ...newValues,
        margin: newValues.margin.toString()
      })
      // @ts-ignore
      router.replace(`${pathname}?${params.toString()}`)
    })
    return () => subscription.unsubscribe()
  }, [pathname, router, searchParams, values, watch])

  useEffect(() => {
    const canvas = document.getElementById("qr-image") as HTMLCanvasElement

    if (!values.url) {
      canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    QRCode.toCanvas(canvas, values.url, {
      width: undefined,
      color: {
        light: values.light,
        dark: values.dark
      },
      margin: values.margin
    }).catch((err) => {
      console.error(err)
    })
  }, [values])

  return (
    <main>
      <Container>
        <Typography level="h1">QR Code</Typography>
        <FormProvider {...formMethods}>
          <Box mt={2}>
            <QRCodeForm
              formId="new-qr-code-form"
              maxFieldWidth={300}
              onSubmit={console.log}
              sx={{mb: 2}}
            />
            <canvas id="qr-image" />
            <Button
              component="a"
              download="my-qr-code.svg"
              href={`/api/generate-code?${new URLSearchParams({
                ...values,
                margin: values.margin.toString()
              }).toString()}`}
            >
              Download SVG
            </Button>
          </Box>
        </FormProvider>
      </Container>
    </main>
  )
}
