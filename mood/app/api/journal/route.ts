import { analyze } from "@/utils/ai"
import { GetUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST = async () => {
   const user = await GetUserByClerkId()
   const newEntry = await prisma.journalEntry.create({
    data: {
        userId: user.id,
        content: 'Write about your day!'
    }
   })
   const analysis = await analyze(newEntry.content)
 
   revalidatePath('/journal')

   return NextResponse.json({data: newEntry})
}  