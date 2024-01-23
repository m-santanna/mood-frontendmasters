import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const createUser = async () => {
  const user = await currentUser()
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        email: user.emailAddresses[0].emailAddress,
        clerkId: user.id,
      },
    })
  }
  redirect('/journal')
}

const newUserPage = async () => {
  await createUser()
}

export default newUserPage
