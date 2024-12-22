import {MoonLoader} from "react-spinners"

export default function Loader() {
  return (
    <div className='h-screen top-0 left-0 w-screen flex justify-center items-center absolute backdrop-blur-md z-50'>
      <MoonLoader color="#3b82f6"/>
    </div>
  )
}