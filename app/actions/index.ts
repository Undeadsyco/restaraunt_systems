import { redirect } from "next/navigation"

export const route = async (path: string) => {
  "use server"
  redirect(path);
}