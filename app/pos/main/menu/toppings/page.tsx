// Components
import Link from "next/link";
import ToppingTypeContainer from "./toppingTypeContainer";
import { PosBtn } from "@/app/pos/components/buttons";



const ToppingBtns = () => {

  return (
    <>
      <ToppingTypeContainer className="row-span-2 grid-rows-2" type="sauce" />
      <ToppingTypeContainer className="row-span-1 grid-rows-1" type="cheese" />
      <ToppingTypeContainer className="row-span-1 grid-rows-1" type="seasoning" />
      <ToppingTypeContainer className="row-span-2 grid-rows-2" type="meat" />
      <ToppingTypeContainer className="row-span-3 grid-rows-3" type="produce">
        <PosBtn
          className="close-btn text-white"
        >
          <Link className="link-btn" href="/pos/main/menu">Back</Link>
        </PosBtn>
      </ToppingTypeContainer>
    </>
  )
}

export default ToppingBtns;
