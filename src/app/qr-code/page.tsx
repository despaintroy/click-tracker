"use client"

import {Box, Button, Container, Stack, Typography} from "@mui/joy"
import {Suspense, useCallback, useEffect, useState} from "react"
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
import {QRCodeEndpoint} from "@/app/api/generate-code/route"
import styles from "./page.module.scss"

function QRCodePage() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [hasCode, setHasCode] = useState(false)

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
      setHasCode(false)
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
    setHasCode(true)
  }, [values])

  return (
    <>
      <Typography level="h1">QR Code</Typography>
      <FormProvider {...formMethods}>
        <Box mt={2}>
          <QRCodeForm
            formId="new-qr-code-form"
            maxFieldWidth={300}
            onSubmit={console.log}
            sx={{mb: 2}}
          />
          <canvas
            id="qr-image"
            className={styles.qrCanvas}
            aria-hidden={!hasCode}
          />
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              component="a"
              download="my-qr-code.svg"
              href={`/api/generate-code?${new URLSearchParams({
                ...values,
                margin: values.margin.toString(),
                fileType: "svg"
              } satisfies QRCodeEndpoint).toString()}`}
              disabled={!hasCode}
            >
              Download SVG
            </Button>
            <Button
              component="a"
              download="my-qr-code.png"
              href={`/api/generate-code?${new URLSearchParams({
                ...values,
                margin: values.margin.toString(),
                fileType: "png"
              } satisfies QRCodeEndpoint).toString()}`}
              disabled={!hasCode}
            >
              Download PNG
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </>
  )
}

export default function QRCodePageWrapper() {
  return (
    <Suspense>
      <QRCodePage />
    </Suspense>
  )
}
