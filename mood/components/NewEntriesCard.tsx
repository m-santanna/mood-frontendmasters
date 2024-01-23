'use client'
import { createNewJournalEntry } from '@/utils/api'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'

const NewEntriesCard = () => {
  const router = useRouter()

  const onClickHandler = async () => {
    const data = await createNewJournalEntry()
    router.push(`/journal/${data.id}`)
  }

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-zinc-800"
      onClick={onClickHandler}
    >
      <div className="px-4 py-5">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  )
}

export default NewEntriesCard
