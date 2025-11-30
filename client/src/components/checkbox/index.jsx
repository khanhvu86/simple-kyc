import { forwardRef } from 'react';

export const Checkbox = forwardRef((props, ref) => {
  const { className, label, ...rest } = props;

  return (
    <label className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        ref={ref}
        className="form-checkbox h-4 w-4 text-blue-600"
        {...rest}
      />
      <span className="ml-2 text-sm text-gray-600">{label}</span>
    </label>
  );
});

export default Checkbox;
