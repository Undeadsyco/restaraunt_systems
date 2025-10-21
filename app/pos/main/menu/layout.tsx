// Dependecies
import { ReactNode } from "react";
// Components
import { SectionController } from "@/lib/DBModels/controllers";
import { PosBtn } from "../../components/buttons";
import SectionBtn from "./components/layout/SectionBtn";

const getSections = async () => {
  return JSON.stringify({ sections: await SectionController.getAll() })
}

const MenuLayout = async ({ children }: { children: ReactNode | ReactNode[] }) => {
  const { sections }: { sections: DataBase.Menu.ISection[] } = JSON.parse(await getSections());
  return (
    <>
      {/* <SizeCategoryBtns /> */}
      <div className="col-span-8 grid grid-cols-7 gap-1">
        {sections.map(section => (
          <SectionBtn key={section._id} {...section} />
        ))}
        <PosBtn text="AOS" />
      </div>
      {/* <UtilityBtns /> */}

      <div className={`row-span-10 col-span-6 grid grid-cols-6 grid-rows-9 gap-x-1 gap-y-3`}>
        {children}
      </div>
    </>
  )
}

export default MenuLayout;
