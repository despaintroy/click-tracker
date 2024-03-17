"use client"

import {Close, Menu} from "@mui/icons-material"
import {Container, Drawer, IconButton, Link, Stack} from "@mui/joy"
import {useState} from "react"
import styles from "./MainLayout.module.scss"
import NextLink from "next/link"
import {MobileAuthButton} from "./AuthButton"

export default function MobileDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        className={styles.onlyMobile}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="menu"
      >
        {open ? <Close /> : <Menu />}
      </IconButton>

      <Drawer
        size="sm"
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(false)}
        slotProps={{
          root: {
            className: styles.drawer
          }
        }}
        id="menu"
        aria-label="Main menu"
      >
        <Container sx={{pt: 10}}>
          <Stack>
            <Link
              component={NextLink}
              href="/"
              className={styles.mobileNavLink}
            >
              Home
            </Link>
            {/*<Link*/}
            {/*  component={NextLink}*/}
            {/*  href="/products"*/}
            {/*  className={styles.mobileNavLink}*/}
            {/*>*/}
            {/*  Shop*/}
            {/*</Link>*/}
            {/*<OnlyAdmin>*/}
            {/*  <Link*/}
            {/*    component={NextLink}*/}
            {/*    href="/admin"*/}
            {/*    className={styles.mobileNavLink}*/}
            {/*  >*/}
            {/*    Admin*/}
            {/*  </Link>*/}
            {/*</OnlyAdmin>*/}
            <MobileAuthButton />
          </Stack>
        </Container>
      </Drawer>
    </>
  )
}
