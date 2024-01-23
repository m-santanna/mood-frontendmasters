'use client'
import { useAutosave } from 'react-autosave'
import { useState } from 'react'
import { updateJournalEntry } from '@/utils/api'

const Editor = ({ entry }: any) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const updated = await updateJournalEntry(entry.id, _value)
      setIsLoading(false)
    },
  })
  return (
    <div className="h-full w-full">
      {isLoading === true && (
        <div className="text-white px-8 py-4">...saving</div>
      )}
      <textarea
        className="text-xl w-full h-full p-8 outline-none bg-black"
        value={value}
        onChange={(text) => setValue(text.target.value)}
      >
        {value}
      </textarea>
    </div>
  )
}

export default Editor
