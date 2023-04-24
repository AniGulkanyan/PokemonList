import React, { useState } from 'react';

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  onSelect: (option: Option) => void;
}

const Dropdown: React.FC<Props> = ({ options, onSelect }: Props) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        {selectedOption ? selectedOption.label : 'Select an option'}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {options.map((option: any) => (
          <li key={option.value}>
            <button className="dropdown-item" onClick={() => handleSelect(option)}>
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
