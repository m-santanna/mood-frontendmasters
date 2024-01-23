const EntriesCard = ({ entry }: any) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="divide-y overflow-hidden divide-white/40 rounded-lg bg-zinc-800">
      <div className="px-4 py-4">{date}</div>
      <div className="px-4 py-4">summary</div>
      <div className="px-4 py-4">mood</div>
    </div>
  )
}

export default EntriesCard
