import {Link, Container, Box, Sheet, Stack} from "@mui/joy"
import NextLink from "next/link"
import {FC, PropsWithChildren} from "react"
import {DesktopAuthButton} from "./AuthButton"
import styles from "./MainLayout.module.scss"
import classNames from "classnames"
import MobileDrawer from "./mobileDrawer"
import Footer from "../Footer/Footer"

const MainLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <Stack minHeight="100vh">
      <div className={styles.navBar}>
        <Container
          sx={{
            height: "100%",
            display: "flex",
            gap: "16px",
            alignItems: "center"
          }}
        >
          <MobileDrawer />

          <NextLink
            href="/"
            style={{marginRight: "auto", paddingTop: 4}}
            aria-label="Home"
          >
            <img src="/vercel.svg" alt="" height={40} />
          </NextLink>
          <div
            className={classNames(styles.desktopNavLinks, styles.onlyDesktop)}
          >
            {/*<Link component={NextLink} href="/products">*/}
            {/*  Shop*/}
            {/*</Link>*/}
            {/*<OnlyAdmin>*/}
            {/*  <Link component={NextLink} href="/admin">*/}
            {/*    Admin*/}
            {/*  </Link>*/}
            {/*</OnlyAdmin>*/}
            <DesktopAuthButton />
          </div>
        </Container>
      </div>

      <Box pt="5rem" mb="auto">
        {children}
      </Box>

      <Footer />
    </Stack>
  )
}

export default MainLayout
