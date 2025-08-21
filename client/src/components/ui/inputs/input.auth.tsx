import { motion } from "framer-motion";

export const InputAuthUi = ({ type, placeholder, className, error, ...props }: Ui.InputProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="flex flex-col max-w-[800px]">
      <input type={type} placeholder={placeholder} {...props} className={`${className}  ${error ? 'focus:border-red-500' : 'focus:border-black' } }`} />
      <div className="min-h-[20px] 2xl:my-2 mt-1.5">{error && <span className="text-[var(--destructive)] text-sm mt-1 2xl:text-[17px]">{error}</span>}</div>
    </motion.div>
  );
};
