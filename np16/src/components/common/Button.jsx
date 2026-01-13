export const Button = ({
  children,
  variant = "primary",
  onClick,
  className = "",
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    ghost: "hover:bg-gray-100 text-gray-600",
  };
  return (
    <>
      <button
        className={`px-4 py-2 rounded-lg transition-colors ${variants[variant]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
