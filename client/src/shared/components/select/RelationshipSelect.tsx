import React from "react"
import Select, { MultiValue, SingleValue } from "react-select"
import "@styles/select.css"
import IRelatedData from "@interfaces/IRelatedData"

interface RelationshipSelectProps {
  value: IRelatedData[];
  options: IRelatedData[];
  onChange: (value: IRelatedData[]) => void;
  isMulti?: boolean;
  placeholder?: string;
  title?: string;
}

export const RelationshipSelect: React.FC<RelationshipSelectProps> = ({value, isMulti = true, placeholder, options, onChange, title = ""}) => {
  const selectedOptions = value.map(selected => ({
    label: selected.name || `${title} ${selected.id}`,
    value: selected.id,
  }));

  const formattedOptions = options.map(option => ({
    label: option.name || `${title} ${option.id}`,
    value: option.id,
  }));

  return (
    <Select
      isMulti={isMulti}
      options={formattedOptions}
      unstyled
      value={selectedOptions}
      onChange={selected => {
        // Убедитесь, что selected имеет правильный тип
        let values: IRelatedData[];

        if (isMulti) {
          // Для множественного выбора
          const multiSelected = selected as MultiValue<{ label: string; value: number }>;
          values = multiSelected.map((item) => ({
            id: item.value,
            name: item.label,
          }));
        } else {
          // Для одиночного выбора
          const singleSelected = selected as SingleValue<{ label: string; value: number }>;
          values = singleSelected
            ? [
                {
                  id: singleSelected.value,
                  name: singleSelected.label,
                },
              ]
            : [];
        }

        onChange(values); // Обрабатываем с использованием relatedFormateer
      }}
      placeholder={placeholder}
      className='react-select-container'
      classNamePrefix='react-select'
    />
  )
}
