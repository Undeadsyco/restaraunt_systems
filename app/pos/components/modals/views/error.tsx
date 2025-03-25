import { PosBtn } from "../../buttons";

const ErrorBox = ({ state, dispatch }: POS.Props.PosComponent) => (
  <div className="w-1/3 h-1/3 rounded-3xl p-4 flex flex-col justify-around items-center bg-white text-black">
    <p className="text-2xl font-extrabold text-center">{state.modal.err.message ?? "Something Went Wrong"}</p>
    <PosBtn className="w-1/3 h-1/6" text="Close" action={() => dispatch({ type: "CLEAR_ERR" })} />
  </div>
);

export default ErrorBox;
