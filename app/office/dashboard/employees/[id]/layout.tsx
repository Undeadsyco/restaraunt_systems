export default function EmployeePageLayout({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <div className="col-span-full row-span-full text-black grid grid-cols-subgrid grid-rows-subgrid items-center">
      {children}
    </div>
  )
}