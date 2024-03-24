import {Container, Divider, Typography} from "@mui/joy"
import PrismaTest from "@/components/PrismaTest"
import {getSession} from "@auth0/nextjs-auth0"
import AuthTest from "@/components/AuthTest"

export default async function HomePage() {
  const session = await getSession()

  return (
    <main>
      <Container>
        <Typography level="h1">Home</Typography>

        <Divider sx={{my: 2}} />

        <PrismaTest />

        <Divider sx={{my: 2}} />

        <AuthTest />

        <Divider sx={{my: 2}} />

        <p>
          Server session:{" "}
          {session ? session.user.name ?? "no name" : "no session"}
        </p>
      </Container>
    </main>
  )
}
