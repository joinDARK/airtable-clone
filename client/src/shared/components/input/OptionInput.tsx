import React from 'react';

type OptionInputProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string; label?: string }[];
};

export default function OptionInput({ options, ...props }: OptionInputProps) {
    return (
        <select
            {...props}
            className="p-2 bg-gray-100 dark:bg-gray-600 border dark:border-gray-500 rounded-md flex-1"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
