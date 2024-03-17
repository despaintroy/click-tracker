"use client"

import {Box, Container, Input, Typography} from "@mui/joy"
import {useEffect, useState} from "react"
import QRCode from "qrcode"
import styles from "./page.module.scss"

export default function QRCodePage() {
  const [value, setValue] = useState("")

  useEffect(() => {
    const img = document.getElementById("qr-image")

    if (!value) {
      img?.removeAttribute("src")
      return
    }

    QRCode.toDataURL(value)
      .then((url) => {
        img?.setAttribute("src", url)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [value])

  return (
    <main>
      <Container>
        <Typography level="h1">QR Code</Typography>

        <Box mt={2}>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
          <img
            id="qr-image"
            alt="qr code image preview"
            className={styles.qrCode}
          />
        </Box>
      </Container>
    </main>
  )
}
