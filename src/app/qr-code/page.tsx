"use client"

import {Box, Container, Typography} from "@mui/joy"
import {useEffect, useState} from "react"
import QRCode from "qrcode"
import styles from "./page.module.scss"
import {
  getQRCodeFormInitializer,
  getQRCodeFormValues,
  QRCodeForm,
  QRCodeFormValues
} from "@/components/Forms/QRCodeForm"
import {FormProvider, useForm} from "react-hook-form"

export default function QRCodePage() {
  const [values, setValues] = useState<QRCodeFormValues>(
    getQRCodeFormValues(null)
  )

  const formMethods = useForm<QRCodeFormValues>(getQRCodeFormInitializer())
  const {watch} = formMethods

  useEffect(() => {
    const subscription = watch((value, {name, type}) => {
      setValues((prev) => ({...prev, ...value}))
    })
    return () => subscription.unsubscribe()
  }, [watch])

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
