import { forwardRef } from 'react';

const Select = forwardRef((props, ref) => {
  const { label, options, error, ...rest } = props;

  return (
    <div>
      {label && <label className="block text-sm font-medium">{label}</label>}
      <select
        className="w-full px-4 py-2 mt-2 border border-(--border-color) rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-color)"
        ref={ref}
        {...rest}
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
