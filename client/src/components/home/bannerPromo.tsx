export default function BannerPromo() {
    return (
        <div className="w-full flex justify-center items-center">
        <div className="relative w-3/4 h-[550px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/banner.png')] bg-cover bg-center bg-no-repeat"></div>
        </div>
      </div>
    )
}