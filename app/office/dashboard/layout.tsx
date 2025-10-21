import { ReactNode } from "react";
import ProtectedRoute from "../components/protectedRoute";

export default function MainLayout({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <ProtectedRoute>{children}</ProtectedRoute>
  )
}