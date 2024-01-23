import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default function Home() {
  const { userId } = auth()
  const href = userId ? '/journal' : '/new-user'
  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center text-white">
      <h1 className="mb-4 text-7xl">Best journal app, period.</h1>
      <p className="mb-6 text-2xl text-white/60">
        if you need to track your mood, you are at the right place, at the right
        time.
      </p>
      <Link className="justify-center" href={href}>
        <button className="bg-blue-600 text-xl rounded-xl py-2 px-4">
          Get started!
        </button>
      </Link>
    </div>
  )
}
