import { useContext } from "react";
import { PosBtn } from "../../buttons";
import { PosContext } from "@/utils/PosContext";

const ErrorBox = () => {
  const { state: { modal: { err } }, dispatch } = useContext(PosContext)!;

  return (
    <div className="w-1/3 h-1/3 rounded-3xl p-4 flex flex-col justify-around items-center bg-white text-black">
      <p className="text-2xl font-extrabold text-center">{err.message ?? "Something Went Wrong"}</p>
      <PosBtn className="w-1/3 h-1/6" text="Close" onClick={() => dispatch({ type: "CLEAR_ERR" })} />
    </div>
  );
}

export default ErrorBox;
