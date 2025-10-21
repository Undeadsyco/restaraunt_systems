import Link from "next/link";

export default async function Home() {

  return (
    <div className="w-screen h-screen">
      <h1 className="h-[15%] text-2xl text-center">Projects</h1>
      <div className="w-full h-[85%] grid grid-cols-3 grid-rows-2 p-2 gap-2">
        <div className="w-full h-full p-2">
          <Link href="/pos">
            <span className="inline-block w-full h-[15%] text-center">POS System</span>
            <span className="inline-block w-full h-[85%]">
              <iframe className="w-full h-full" src="http://localhost:3000/pos"></iframe>
            </span>
          </Link>
        </div>
        <div className="w-full h-full p-2">
          <Link href="/office">
            <span className="inline-block w-full h-[15%] text-center">Office System</span>
            <span className="inline-block w-full h-[85%]">
              <iframe className="w-full h-full" src="http://localhost:3000/office"></iframe>
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}