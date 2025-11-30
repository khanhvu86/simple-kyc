import { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  const { label, placeholder, type = 'text', error, value, ...rest } = props;

  return (
    <div>
      {label && <label className="block text-sm font-medium">{label}</label>}

      <input
        type={type}
        ref={ref}
        className="w-full px-4 py-2 mt-2 border border-(--border-color) rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-color)"
        placeholder={placeholder}
        value={value}
        {...rest}
      />

      {error && <small className="text-red-600 my-2">{error}</small>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
