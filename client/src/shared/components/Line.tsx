import clsx from "clsx";

interface Props {
  horizontal?: boolean;
}

export default function Line({horizontal = false}: Props) {
  return (
    <div 
      className={
        clsx(
          "bg-gray-200 dark:bg-gray-500 rounded-md",
          horizontal ? "h-inherit w-px" : "w-inherit h-px"
        )
      }
    ></div>
  )
}