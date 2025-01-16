type DateInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    // Можете добавить сюда какие-то свои пропсы, если нужно
    // например, label?: string;
  };
  
  export default function NumberInput({...props}: DateInputProps) {
    return (
      <input type="number" {...props} className="p-2 bg-gray-100 dark:bg-gray-600 border dark:border-gray-500 rounded-md flex-1"/>
    )
  }