import { motion } from "framer-motion";

export const InputAuthUi = ({ type, placeholder, className, error, ...props }: Ui.InputProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="flex flex-col relative ">
      <input type={type} placeholder="" {...props} className={`${className} z-[999] peer w-full h-[53px] 2xl:h-[60px] peer-focus:placeholder-transparent px-3 border-gray-200 border-b text-sm focus:outline-none  ${error ? "focus:border-red-500" : "focus:border-black"} }`} />

      <label
        className={`
    absolute left-3 text-gray-200
    transition-all duration-200 text-md
    peer-placeholder-shown:top-4
    peer-placeholder-shown:text-gray-400
    top-1 font-regular

  `}
      >
        {placeholder} *
      </label>
      <div className="min-h-[15px] 2xl:my-2 mt-1.5">{error && <span className="text-red-500 text-sm mt-1 2xl:text-[17px]">{error}</span>}</div>
    </motion.div>
  );
};
