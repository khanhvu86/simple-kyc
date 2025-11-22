export const Button = (props) => {
  const { children, isLoading = false, ...rest } = props;

  return (
    <button
      type="submit"
      className="btn-primary px-4 py-2 mt-4 rounded-md cursor-pointer"
      {...rest}
    >
      {isLoading && (
        <div
          role="spinbutton"
          className="h-5 w-5 border-4 mr-3 border-white border-t-transparent rounded-full animate-spin"
        ></div>
      )}
      {children}
    </button>
  );
};

export default Button;
