import Editor from '@/components/Editor'
import { GetUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id: any) => {
  const user = await GetUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
    include: {
      analysis: true,
    },
  })
  return entry
}

const EntryPage = async ({ params }: any) => {
  const entry = await getEntry(params.id)

  const analysisData = [
    { name: 'Mood', value: entry?.analysis?.mood },
    { name: 'Summary', value: entry?.analysis?.summary },
    { name: 'Subject', value: entry?.analysis?.subject },
    { name: 'Negative', value: entry?.analysis?.negative ? 'True' : 'False' },
  ]

  return (
    <div className="w-full h-full grid grid-cols-3 ">
      <div className=" col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-white/40">
        <div
          className="px-6 py-10"
          style={{ backgroundColor: entry?.analysis?.color }}
        >
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li className="flex justify-between items-center border-y border-white/40 px-4 py-6">
                <span className="text-lg font-semibold">{item.name}</span>
                <span className="text-lg">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EntryPage
