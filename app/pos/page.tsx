// Components
import { LockScreenForm } from './components';
// Styles
import "@/styles/PosStyles.css";



export default function POS() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LockScreenForm />
    </div>
  )
}