import SideNav from '../ui/dashboard/sideNav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <SideNav />
      {children}
    </main>
  )
}
