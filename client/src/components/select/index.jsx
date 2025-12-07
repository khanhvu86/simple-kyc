import { forwardRef } from 'react';

const Select = forwardRef((props, ref) => {
  const {
    label,
    options,
    required = false,
    disabled = false,
    error,
    ...rest
  } = props;

  return (
    <div>
      {label && (
        <div className="flex gap-1">
          <label className="block text-sm font-medium">{label}</label>
          {required && <span>*</span>}
        </div>
      )}
      <select
        className={`w-full px-4 py-2 mt-2 border border-(--border-color) rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-color) ${
          disabled && 'bg-gray-50'
        }`}
        ref={ref}
        {...rest}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.key} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {error && <small className="text-red-600 my-2">{error}</small>}
    </div>
  );
});

export default Select;
