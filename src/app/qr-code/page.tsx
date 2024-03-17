"use client"

import {Box, Container, Typography} from "@mui/joy"
import {useCallback, useEffect, useState} from "react"
import QRCode from "qrcode"
import styles from "./page.module.scss"
import {
  getQRCodeFormInitializer,
  getQRCodeFormValues,
  QRCodeForm,
  QRCodeFormValues
} from "@/components/Forms/QRCodeForm"
import {FormProvider, useForm} from "react-hook-form"
import {usePathname, useRouter, useSearchParams} from "next/navigation"

export default function QRCodePage() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const getQRCodeFromSearchParams = useCallback(() => {
    return Object.fromEntries(searchParams)
  }, [searchParams])

  const [values, setValues] = useState<QRCodeFormValues>(
    getQRCodeFormValues(getQRCodeFromSearchParams())
  )

  const formMethods = useForm<QRCodeFormValues>(
    getQRCodeFormInitializer(getQRCodeFromSearchParams())
  )
  const {watch} = formMethods

  useEffect(() => {
    const subscription = watch((value, {name, type}) => {
      if (type !== "change" || !name) return

      setValues((prev) => ({...prev, ...value}))
      const params = new URLSearchParams(searchParams)
      Object.entries(value).forEach(([key, value]) => {
        if (value) params.set(key, value)
        else params.delete(key)
      })
      // @ts-ignore
      router.replace(`${pathname}?${params.toString()}`)
    })
    return () => subscription.unsubscribe()
  }, [pathname, router, searchParams, watch])

  useEffect(() => {
    const img = document.getElementById("qr-image")

    if (!values.url) {
      img?.removeAttribute("src")
      return
    }

    QRCode.toDataURL(values.url, {
      width: undefined,
      color: {
        light: values.light,
        dark: values.dark
      }
    })
      .then((url) => {
        img?.setAttribute("src", url)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [values])

  return (
    <main>
      <Container>
        <Typography level="h1">QR Code</Typography>
        <FormProvider {...formMethods}>
          <Box mt={2}>
            <QRCodeForm formId="new-qr-code-form" maxFieldWidth={300} />
            <img
              id="qr-image"
              alt="qr code image preview"
              className={styles.qrCode}
            />
          </Box>
        </FormProvider>
      </Container>
    </main>
  )
}
