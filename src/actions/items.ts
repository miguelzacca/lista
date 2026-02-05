'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getItems() {
  return await prisma.groceryItem.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function addItem(name: string, quantity?: string) {
  if (!name.trim()) return

  await prisma.groceryItem.create({
    data: {
      name,
      quantity,
    },
  })
  revalidatePath('/')
}

export async function toggleItem(id: string, isChecked: boolean) {
  await prisma.groceryItem.update({
    where: { id },
    data: { isChecked },
  })
  revalidatePath('/')
}

export async function updateItem(id: string, name: string, quantity?: string) {
  await prisma.groceryItem.update({
    where: { id },
    data: { name, quantity },
  })
  revalidatePath('/')
}

export async function deleteItem(id: string) {
  await prisma.groceryItem.delete({
    where: { id },
  })
  revalidatePath('/')
}
