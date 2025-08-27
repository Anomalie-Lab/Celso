import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

interface PaginationProps {
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

export const Pagination = ({ totalPage, setPage, page }: PaginationProps) => {
  return (
    <section className="flex justify-center items-center">
      <div className="flex gap-2 m-6 justify-center ">
        {Array.from({ length: totalPage }).map((_, i) => (
          <button key={i} onClick={() => setPage(i)} className={`px-3 py-1  ${i === page ? "bg-secondary text-white" : "bg-gray-200"}`}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0} className="px-3 py-1 bg-secondary disabled:opacity-50">
          <FaCaretLeft size={20} color="white" />
        </button>

        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPage - 1))} disabled={page === totalPage - 1} className="px-3 py-1 bg-secondary disabled:opacity-50">
          <FaCaretRight size={20} color="white" />
        </button>
      </div>
    </section>
  );
};
