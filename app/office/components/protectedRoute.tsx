import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const ProtectedRoute = ({ children }: { children: ReactNode | ReactNode[] }) => {
  if (!cookies().has("user")) redirect("/office")

  return (<>{children}</>)
}

export default ProtectedRoute;
