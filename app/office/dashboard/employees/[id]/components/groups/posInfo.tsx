import { formatDate } from "@/utils";
import Group from ".";
import CustomField from "../field";
import { Btn } from "@/app/components";

type PosInfoGroupProps = {
  pos_info: DataBase.People.Info.IPosInfo;
  editing: boolean;
}

const PosInfoGroup = ({ pos_info, editing }: PosInfoGroupProps) => (
  <Group className="row-span-2" header="POS Info">
    <CustomField {...{
      className: "col-span-2",
      id: "pos_info.access",
      text: "Access",
      data: pos_info.access,
      editing,
    }} />
    <CustomField {...{
      className: "col-span-2",
      id: "pos_info.password_reset",
      type: "checkbox",
      text: "Needs Reset",
      data: pos_info.password_reset,
      editing,
    }} />
    {pos_info.password && (
      <div className="col-span-5 row-start-3 grid grid-cols-subgrid h-full relative">
        <CustomField {...{
          className: "col-span-3",
          id: "pos_info.password",
          text: "POS Password",
          data: pos_info.password,
          editing,
        }} />
        {editing && <Btn className="rounded-full border-black border-2 row-span-2" text="Clear Password" />}
      </div>
    )}
    {pos_info.reset_date && (
      <CustomField {...{
        className: "col-span-3",
        id: "pos_info.reset_date",
        text: "Last Reset Date",
        data: formatDate(pos_info.reset_date),
        editing,
      }} />
    )}
  </Group>
);

export default PosInfoGroup;
