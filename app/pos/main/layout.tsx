// Components
import { ActionBtns, OrderView, Footer } from "./components";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-screen h-screen border-4 bg-slate-300 border-slate-300 rounded-2xl">
      <section className="w-full h-[95%] p-1 pb-3 grid grid-rows-12 grid-cols-4 gap-1 bg-black rounded-2xl">
        <OrderView />
        <div className="col-span-3 row-span-11 grid grid-rows-11 grid-cols-8 gap-x-1 gap-y-3 pb-2">
          {children}
        </div>
        <ActionBtns />
      </section>
      <Footer />
    </main>
  )
}