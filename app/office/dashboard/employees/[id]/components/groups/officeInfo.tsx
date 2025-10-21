import { Btn } from "@/app/components"
import Group from "."
import CustomField from "../field"
import { useParams } from "next/navigation";

type OfficeInfoProps = {
  office_info: DataBase.People.Info.IOfficeInfo | undefined;
  editing: boolean;
}

const OfficeInfoGroup = ({ office_info, editing }: OfficeInfoProps) => {
  const { id } = useParams();

  return (
    <Group className="row-span-3" header="Office Info">
      <CustomField {...{
        className: "col-span-2",
        id: "office_info.access",
        type: "checkbox",
        text: "Access",
        data: office_info?.access,
        editing,
      }} />
      {office_info?.access && (
        <CustomField {...{
          className: "col-span-4",
          id: "office_info.username",
          text: "Username",
          data: office_info?.username,
          editing,
        }} />
      )}
      {id !== "new" && (
        <CustomField {...{
          className: "col-span-2 row-start-3",
          id: "office_info.password_reset",
          type: "checkbox",
          text: "Needs Reset",
          data: office_info?.password_reset,
          editing,
        }} />
      )}
      {office_info?.password && (
        <div className="col-span-5 row-start-3 grid grid-cols-subgrid h-full relative">
          <CustomField {...{
            className: "col-span-3",
            id: "office_info.password",
            text: "Password",
            data: office_info.password,
            editing,
          }} />
          {editing && <Btn className="rounded-full border-black border-2 col-span-2" text="Clear Password" />}
        </div>
      )}
    </Group>
  );
}

export default OfficeInfoGroup;
