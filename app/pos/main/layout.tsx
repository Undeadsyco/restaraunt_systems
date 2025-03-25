// 
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
//
import DateTime from "@/app/components/dateTime";

const getUser = async (): Promise<{ id: string, name: string, pos: string }> => {
  const userCookie = cookies().get("user");
  if (!userCookie) {
    redirect("/pos");
  }

  return JSON.parse(userCookie!.value);
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {

  const user = await getUser();

  return (
    <main className="w-screen h-screen border-4 bg-slate-300 border-slate-300 rounded-2xl">
      <section className="w-full h-[95%] p-1 pb-3 grid grid-rows-12 grid-cols-4 gap-1 bg-black rounded-2xl">
        {children}
      </section>
      <div className="text-black flex px-4 justify-between bg-slate-300 rounded-b-[10px] h-[5%] items-center">
        <span className="inline-flex w-[25%] justify-around">
          <p>{user.name}</p>
          <p>{user.pos}</p>
        </span>
        <DateTime className="inline-flex w-[25%] justify-around" />
      </div>
    </main>
  )
}