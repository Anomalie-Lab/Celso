import { LuStar } from "react-icons/lu";
export const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<LuStar key={i} className={`w-3 h-3 ${i <= rating ? "text-yellow-400 fill-current" : "text-yellow-400 fill-current opacity-50"}`} />);
  }
  return stars;
};
