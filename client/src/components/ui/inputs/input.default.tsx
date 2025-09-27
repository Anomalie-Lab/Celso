export const InputDefault = ({ label, type = "text", required = false, value, error, className, ...rest }: InputDefaultProps) => {
  return (
    <div className={`relative w-full mx-auto my-4 ${className}`}>
      <input id="input" required={required} type={type} className="peer w-full z-50 bg-transparent border-b-2 border-gray-300 focus:outline-none text-lg py-1" {...rest} />
      <label
        htmlFor="input"
        className={` -z-10
    absolute left-0 transition-all duration-300
    ${error ? "text-red-500" : "text-gray-400"}
    ${value ? "-top-5 text-gray-800 text-sm" : "top-1 text-base text-gray-400"}
    peer-focus:-top-5 peer-focus:text-gray-800 peer-focus:text-sm
  `}
      >
        {label}
      </label>

      <span
        className={` ${error ? "bg-red-500" : "bg-gray-800"}
            absolute bottom-0 left-0 h-[2px] w-full bg-gray-800 
            scale-x-0 transition-transform duration-300 peer-focus:scale-x-100
          `}
      />
      {error && error !== "required" && <span className="text-red-500 text-xs italic absolute -bottom-5 left-0 mt-1 block">{error}</span>}
    </div>
  );
};
