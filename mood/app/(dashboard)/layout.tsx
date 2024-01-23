import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const DashboardLayout = ({ children }: any) => {
  return (
    <div className="relative h-screen w-screen text-white">
      <aside className="absolute top-0 left-0 h-full w-[200px] border-r border-white/40">
        <Link href="/journal">
          <div className="text-3xl text-center mt-4">MOOD</div>
        </Link>
      </aside>
      <div className="ml-[200px] h-full w-[calc(100vw - 200px)]">
        <header className="h-[60px] border-b border-white/40">
          <nav className="flex h-full px-4 justify-end items-center">
            <UserButton afterSignOutUrl="/" />
          </nav>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
