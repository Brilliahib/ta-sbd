import Image from "next/image";

export default function HomeWallpaper() {
  return (
    <div className="mb-6 md:mb-16">
      <Image
        src="/images/banner/banner-new.png"
        alt="Wallpaper"
        width={2000}
        height={647}
        className="h-[200px] w-full object-cover md:h-[600px]"
      />
    </div>
  );
}
