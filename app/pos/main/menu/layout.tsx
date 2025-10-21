// Dependecies
import { ReactNode } from "react";
// Components
import { SizeCategoryBtns, UtilityBtns } from "./components";

const MenuLayout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <>
      <SizeCategoryBtns />
      <UtilityBtns />

      <div className={`row-span-10 col-span-6 grid grid-cols-6 grid-rows-9 gap-x-1 gap-y-3`}>
        {children}
      </div>
    </>
  )
}

export default MenuLayout;
