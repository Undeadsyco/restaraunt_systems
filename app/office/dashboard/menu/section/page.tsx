// Controllers
import { SectionController } from "@/lib/DBModels/controllers";
// Components
import SectionContainer from "./components";
import { LinkBtn } from "@/app/components";

const getSections = async () => {
  const sections = await SectionController.getAll();

  return JSON.stringify({ sections });
}

export default async function Section() {
  const { sections } = JSON.parse(await getSections());

  return (
    <>
      <SectionContainer {...{ sections }} />
      <div className="row-start-12 col-span-full flex justify-around items-center">
        <LinkBtn {...{ className: "bordered p-1 px-6", href: "/office/dashboard/menu", text: "Back" }} />
      </div>
    </>
  )
}