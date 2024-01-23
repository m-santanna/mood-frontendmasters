import { analyze } from "@/utils/ai"
import { GetUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, { params }: any) => {
    const {content} = await request.json()
    const user = await GetUserByClerkId()
    const entry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            }
        },
        data: {
            content: content
        }
    })
    const analysis = await analyze(entry.content)
    
    const updated = await prisma.analysis.upsert({
        where: {
            entryId: entry.id
        },
        create: {
            entryId: entry.id,
            ...analysis
        },
        update: {...analysis}
    })

    console.log(updated)

    revalidatePath(`/journal/${params.id}`)

    return NextResponse.json({data: entry})
}