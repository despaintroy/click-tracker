import {Container, Typography} from "@mui/joy"
import PrismaTest from "@/components/PrismaTest"

export default function HomePage() {
  return (
    <main>
      <Container>
        <Typography level="h1">Home</Typography>

        <PrismaTest />
      </Container>
    </main>
  )
}
