"use client"

import { Btn } from "@/app/components"
import { useRouter } from "next/navigation"

export const BtnContainer = () => {
  const router = useRouter();
  return (
    <div>
      <Btn {...{ className: "text-black", text: "Back", onClick() { router.push("/office/dashboard"); } }} />
    </div>
  )
}