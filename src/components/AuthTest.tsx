"use client"

import {FC} from "react"
import {useUser} from "@auth0/nextjs-auth0/client"

const AuthTest: FC = () => {
  const {user, error, isLoading} = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (!user) return <a href="/api/auth/login">Login</a>

  console.log(user)

  return (
    <>
      <div>
        {user.picture ? (
          <img src={user.picture} alt={user.name ?? "unknown name"} />
        ) : (
          <p>No user profile picture</p>
        )}
        <h2>Name: {user.name}</h2>
        <p>Email: {user.email}</p>
      </div>

      <a href="/api/auth/logout">Logout</a>
    </>
  )
}

export default AuthTest
