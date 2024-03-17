import * as React from "react"
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry"
import MainLayout from "@/components/MainLayout"
import {Metadata} from "next"

export const metadata: Metadata = {
  title: "Troy DeSpain Photography",
  description: "Shop digital downloads of LDS temples by Troy DeSpain",
  authors: {name: "Troy DeSpain"},
  creator: "Troy DeSpain"
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fff" />
      </head>

      <body>
        <ThemeRegistry>
          <MainLayout>{children}</MainLayout>
        </ThemeRegistry>
      </body>
    </html>
  )
}
