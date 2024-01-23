import { auth } from "@clerk/nextjs";
import { prisma } from "./db";


export const GetUserByClerkId = async () => {
    const {userId} = auth()
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            clerkId: userId as string
        }
    })
    return user

}