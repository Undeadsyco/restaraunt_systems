// components
import { LockScreenForm } from './components';

import "@/styles/PosStyles.css";

export default async function OEM() {
  return (
    <main className='overflow-hidden grid grid-cols-12 grid-rows-12 w-full h-full bg-slate-600'>
      {/* <section className={`absolute w-screen h-screen ${state.modalDisplay ? 'block' : "hidden"}`}>
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-70'></div>
        <div className='relative w-1/3 h-1/3 top-[33.33%] left-[33.33%] bg-white opacity-100'>
          <h1>ALERT</h1>
          <p>{state.modalMessage}</p>
          <Btn text="Close" action={() => dispatch({ type: "HIDE_MODAL" })} />
        </div>
      </section> */}

      <div className="w-screen h-screen flex justify-center items-center">
        <LockScreenForm />
      </div >
    </main>
  )
}