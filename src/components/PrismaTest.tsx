"use client"

import {FC} from "react"
import {Button} from "@mui/joy"
import {createUser, deleteAllUsers, getUsers, updateUser} from "@/services/users"

const PrismaTest: FC = () => {
  const onClickGet = () => {
    getUsers()
      .then((users) => console.log(users))
      .catch(console.error)
  }

  const onClickCreate = () => {
    createUser({
      name: "Troy DeSpain", email: "despaintroy@gmail.com", id: crypto.randomUUID()
    })
      .then((user) => console.log(`Created user: ${user.name}`))
      .catch(console.error)
  }

  const onClickDeleteAll = () => {
    deleteAllUsers()
      .then(({count}) => console.log(`Deleted all ${count} users`))
      .catch(console.error)
  }

  const onClickMakeAdmin = () => {
    updateUser("996b8eb0-39dd-49f1-ba88-8f0410c2e19c", {isAdmin: true})
      .then((user) => console.log(`Updated user: ${user.name} to admin`))
      .catch(console.error)
  }

  return (
    <>
      <Button onClick={onClickGet}>Get Users</Button>
      <Button onClick={onClickCreate}>Create Troy</Button>
      <Button onClick={onClickDeleteAll}>Delete All Users</Button>
      <Button onClick={onClickMakeAdmin}>Make Admin</Button>
    </>
  )
}

export default PrismaTest
