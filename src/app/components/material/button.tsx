const Button = ({
    label,
    type = "button",
    disabled = false,
  }: {
    label: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }) => {
    return (
      <button
        type={type}
       
        disabled={disabled}
        className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {label}
      </button>
    );
  };
  
 export default Button;