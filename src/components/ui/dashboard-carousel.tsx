import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Import Swiper styles
import 'swiper/css';

interface Screenshot {
  image: string;
  title: string;
  description: string;
}

interface DashboardCarouselProps {
  screenshots: Screenshot[];
  onPrev?: () => void;
  onNext?: () => void;
  activeIndex?: number;
  onSlideChange?: (index: number) => void;
}

const DashboardCarousel: React.FC<DashboardCarouselProps> = ({ 
  screenshots,
  onPrev,
  onNext,
  activeIndex: externalActiveIndex,
  onSlideChange
}) => {
  const [swiper, setSwiper] = useState<any>(null);
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const activeIndex = externalActiveIndex ?? internalActiveIndex;

  const handlePrev = () => {
    if (swiper) {
      swiper.slidePrev();
      onPrev?.();
    }
  };

  const handleNext = () => {
    if (swiper) {
      swiper.slideNext();
      onNext?.();
    }
  };

  const handleSlideChange = (swiper: any) => {
    setInternalActiveIndex(swiper.realIndex);
    if (onSlideChange) onSlideChange(swiper.realIndex);
  };

  return (
    <div className="relative w-screen h-[60vh] md:h-screen overflow-hidden">
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={200}
        className="w-full h-full"
      >
        {screenshots.map((screenshot, index) => (
          <SwiperSlide key={`${screenshot.image}-${index}`}>
            <div className="h-full px-4 py-8 md:py-16">
              <div
                className={cn(
                  "relative w-full h-full rounded-[2rem] overflow-hidden",
                  "transition-all duration-400",
                  activeIndex === index ? "scale-100 z-20" : "scale-90 z-10",
                  "border-4 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                )}
              >
                <div className="relative w-full h-full">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-aes-navy/80 via-aes-navy/30 to-transparent" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DashboardCarousel; 