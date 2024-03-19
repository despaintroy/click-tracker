"use client"

import {FC} from "react"
import {Button} from "@mui/joy"
import {getUsers} from "@/services/users"

const PrismaTest: FC = () => {
  const onClick = () => {
    console.log("onClick")
    getUsers()
      .then((users) => console.log(users))
      .catch(console.error)
  }

  return (
    <>
      <Button onClick={onClick}>Get Users</Button>
    </>
  )
}

export default PrismaTest
