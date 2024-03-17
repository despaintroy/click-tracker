import {FC} from "react"
import {Container, Link, Sheet, Stack} from "@mui/joy"
import {SUPPORT_EMAIL, SUPPORT_PHONE} from "@/constants"
import {standardizePhoneNumber} from "@/lib/helpers"
import {Mail, PhoneIphone} from "@mui/icons-material"

const Footer: FC = () => {
  return (
    <Sheet variant="soft" sx={{mt: 5, py: 5}}>
      {/* <ShopByTemple /> */}
      {/* <Contact /> */}
      <Container>
        <Stack spacing={1}>
          <Link
            href={`mailto:${SUPPORT_EMAIL}`}
            color="blue"
            startDecorator={<Mail />}
          >
            {SUPPORT_EMAIL}
          </Link>
          <Link
            href={`tel:${standardizePhoneNumber(SUPPORT_PHONE)}`}
            color="blue"
            startDecorator={<PhoneIphone />}
          >
            {SUPPORT_PHONE}
          </Link>
        </Stack>
      </Container>
    </Sheet>
  )
}

export default Footer
