import React, { useState, useEffect } from 'react';
import '../assets/ManualCSS/CustomSelection.css';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const CustomSelect = ({ value, onChange, options = [] }) => {
  console.log("options ",options);
  const [selectedValue, setSelectedValue] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);

  useEffect(() => {
    if (options.length > 0) {
      setSelectedValue(options[0].value);
    }
  }, [options]);

  useEffect(() => {
    if (!value && options.length > 0) {
      onChange({ target: { value: options[0].value } });
    }
  }, [value, onChange, options]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (key) => {
    setSelectedValue(key);
    onChange({ target: { value: key } });
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container" tabIndex={0} onBlur={() => setIsOpen(false)}>
      <div className="custom-select" onClick={handleToggle}>
        {options.find(option => option.value === selectedValue)?.value || value || 'Select...'}
        <span className="dropdown-icon">
          {isOpen ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
        </span>
      </div>
      {isOpen && options.length > 0 && (
        <div className="custom-options">
          {options.map((item) => (
            <div
              key={item.key}
              className={`custom-option ${hoveredOption === item.key ? 'hovered-option' : ''} ${selectedValue === item.value ? 'selected-option' : ''}`}
              onMouseEnter={() => setHoveredOption(item.key)}
              onMouseLeave={() => setHoveredOption(null)}
              onClick={() => handleOptionClick(item.value)}
            >
              {item.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
