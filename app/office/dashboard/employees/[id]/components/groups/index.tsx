type GroupProps = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  header: string;
}

const Group = ({ children, header }: GroupProps) => (
  <div className="col-span-10 col-start-2 row-span-10 rounded-3xl grid grid-cols-subgrid grid-rows-subgrid items-center bg-green-400 p-2">
    <div className="col-span-full row-span-full grid grid-cols-subgrid grid-rows-subgrid bg-white rounded-2xl">
      <h2 className="col-span-full text-2xl font-bold px-6">{header}</h2>
      {children}
    </div>
  </div>
);

export default Group;

export { default as GeneralInfoGroup } from "./general";
export { default as EmployemntInfoGroup } from "./employment";
export { default as PosInfoGroup } from "./posInfo";
export { default as OfficeInfoGroup } from "./officeInfo";
