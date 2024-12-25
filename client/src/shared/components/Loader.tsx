import { MoonLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className='h-screen top-0 inset-0 bg-black/20 left-0 w-screen flex justify-center items-center absolute backdrop-blur-md z-30'>
      <MoonLoader color="#3b82f6" size={40} speedMultiplier={0.6} />
    </div>
  )
}
