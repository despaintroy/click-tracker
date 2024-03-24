import * as React from "react"
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry"
import MainLayout from "@/components/MainLayout"
import {Metadata} from "next"
import {UserProvider} from "@auth0/nextjs-auth0/client"

export const metadata: Metadata = {
  title: "Click Tracker",
  authors: {name: "Troy DeSpain"},
  creator: "Troy DeSpain",
  robots: {
    index: false,
    follow: false
  }
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fff" />
      </head>

      <UserProvider>
        <body>
          <ThemeRegistry>
            <MainLayout>{children}</MainLayout>
          </ThemeRegistry>
        </body>
      </UserProvider>
    </html>
  )
}
