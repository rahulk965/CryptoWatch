import React from 'react'
import Input from './Input'

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export const SearchBar: React.FC<Props> = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">🔎</span>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9"
      />
    </div>
  )
}
export default SearchBar
