import { LinkBtn } from "@/app/components"

const CancelBtn = () => (
  <LinkBtn {...{
    className: "col-start-5 col-span-2 border-2 border-black rounded-full",
    href: "/office/dashboard/employees",
    text: "Back",
  }} />
);

export default CancelBtn;
