"use server"

import {PrismaClient, User} from "@prisma/client"

const prisma = new PrismaClient()

export async function getUsers(): Promise<User[]> {
  console.log("getUsers")
  return prisma.user.findMany()
}
