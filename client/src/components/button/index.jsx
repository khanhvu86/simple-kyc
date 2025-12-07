export const Button = (props) => {
  const {
    children,
    type = 'button',
    handleClick,
    isLoading = false,
    disabled = false,
    ...rest
  } = props;

  return (
    <button
      type={type}
      className="btn-primary px-4 py-2 rounded-md cursor-pointer flex items-center gap-3"
      {...rest}
      onClick={handleClick}
      disabled={disabled}
    >
      {isLoading && (
        <div
          role="spinbutton"
          className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"
        ></div>
      )}
      {children}
    </button>
  );
};

export default Button;
