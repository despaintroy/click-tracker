"use server"

import {Prisma, PrismaClient, User} from "@prisma/client"
import UserCreateInput = Prisma.UserCreateInput
import UserUpdateInput = Prisma.UserUpdateInput

const prisma = new PrismaClient()

export async function getUsers() {
  return prisma.user.findMany()
}

export async function createUser(data: UserCreateInput) {
  return prisma.user.create({data})
}

export async function deleteAllUsers() {
  return prisma.user.deleteMany()
}

export async function updateUser(id: string, data: UserUpdateInput) {
  return prisma.user.update({where: {id}, data})
}
