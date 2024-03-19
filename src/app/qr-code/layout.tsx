"use client"

import {ReactNode} from "react"
import {Container} from "@mui/joy"

export default function Layout(props: {children: ReactNode}) {
  return <Container>{props.children}</Container>
}
