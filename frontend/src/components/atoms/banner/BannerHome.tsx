"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function BannerHome() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );
  return (
    <div className="hidden md:flex">
      <Carousel plugins={[plugin.current]}>
        <CarouselContent>
          <CarouselItem>
            <Image
              src={"/images/banner/banner-example.png"}
              alt="Banner"
              width={13120}
              height={3800}
              className="w-full rounded-xl border"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={"/images/banner/banner-new.png"}
              alt="Banner"
              width={13120}
              height={3800}
              className="w-full rounded-xl"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={"/images/wp/wallpaper.png"}
              alt="Banner"
              width={13120}
              height={3800}
              className="w-full rounded-xl"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
