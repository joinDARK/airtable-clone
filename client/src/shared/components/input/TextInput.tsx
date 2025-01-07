type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  // Можете добавить сюда какие-то свои пропсы, если нужно
  // например, label?: string;
};

export default function TextInput({ ...props }: TextInputProps) {
  return (
    <input type="text" {...props} className="p-2 bg-gray-100 dark:bg-gray-600 border dark:border-gray-500 rounded-md flex-1"/>
  )
}