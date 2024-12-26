import React from "react"
import Select, { MultiValue, SingleValue } from "react-select"
import {useQuery} from "react-query"
import "../../styles/select.css"
import { TableKey } from "../../types/TableKey"
import IRelatedData from "../../interfaces/IRelatedData"

interface RelationshipSelectProps {
  value: IRelatedData[];
  options: IRelatedData[];
  onChange: (value: number[]) => void;
  isMulti?: boolean;
  placeholder?: string;
}

export const RelationshipSelect: React.FC<RelationshipSelectProps> = ({value, isMulti = true, placeholder, options, onChange}) => {
  const selectedOptions = value.map(selected => ({
    label: selected.name || `Заявка ${selected.id}`,
    value: selected.id,
  }));

  const formattedOptions = options.map(option => ({
    label: option.name || `Заявка ${option.id}`,
    value: option.id,
  }));

  return (
    <Select
      isMulti={isMulti}
      options={formattedOptions}
      unstyled
      value={selectedOptions}
      onChange={selected => {
        const values = isMulti
          ? (selected as MultiValue<{ label: string; value: number }>).map(option => option.value)
          : [(selected as SingleValue<{ label: string; value: number }>)!.value];
          // onChange(values)
          console.log(values)
      }}
      placeholder={placeholder}
      className='react-select-container'
      classNamePrefix='react-select'
    />
  )
}
