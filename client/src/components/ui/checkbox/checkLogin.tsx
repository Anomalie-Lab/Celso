export const CheckboxLogin = ({...props}) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <input id="cbx" type="checkbox" className="peer hidden" {...props} />

        <label htmlFor="cbx" className="block w-[27px] h-[27px] rounded border border-[#c8ccd4] cursor-pointer transition-colors duration-100 relative peer-checked:border-transparent peer-checked:bg-[var(--background-terciary)] peer-checked:animate-[jelly_0.6s_ease]">
          <span className="absolute top-[2px] left-[8px] w-[7px] h-[14px] border-r-2 border-b-2 border-white opacity-0 scale-0 rotate-45 transition-all duration-300 delay-150 peer-checked:opacity-100 peer-checked:scale-100" />
        </label>
      </div>

      <style>{`
        @keyframes jelly {
          0%   { transform: scale(1, 1); }
          30%  { transform: scale(1.25, 0.75); }
          40%  { transform: scale(0.75, 1.25); }
          50%  { transform: scale(1.15, 0.85); }
          65%  { transform: scale(0.95, 1.05); }
          75%  { transform: scale(1.05, 0.95); }
          100% { transform: scale(1, 1); }
        }
      `}</style>
    </div>
  );
};
