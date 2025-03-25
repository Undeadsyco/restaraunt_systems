import PosBtn, { PosBtnProps } from "./posBtn";

type sizeBtnProps = POS.Props.PosComponent & {
  size: POS.Data.IDough;

}

const SizeBtn = ({ size, state, dispatch }: sizeBtnProps) => (
  <PosBtn
    className={`size-btn ${size._id === state.currentSize ? "pizza-size-btn-active" : ""}`}
    text={size.name}
    action={() => dispatch({ type: "SET_SIZE", data: size._id })}
  />
)

export default SizeBtn;