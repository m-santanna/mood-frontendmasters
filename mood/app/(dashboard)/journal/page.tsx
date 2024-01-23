import EntriesCard from '@/components/EntriesCard'
import NewEntriesCard from '@/components/NewEntriesCard'
import { GetUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await GetUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  console.log('entries', entries)
  return (
    <div className="p-8">
      <h1 className="text-3xl px-4 mb-8">Journal</h1>
      <div className="grid grid-cols-3 gap-4">
        <NewEntriesCard />
        {entries.map((entry) => {
          return (
            <Link href={`/journal/${entry.id}`} key={entry.id}>
              <EntriesCard entry={entry} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default JournalPage
