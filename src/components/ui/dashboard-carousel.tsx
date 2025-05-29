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
    <div className="relative w-full max-w-screen overflow-hidden">
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={800}
        className="w-full"
      >
        {screenshots.map((screenshot, index) => (
          <SwiperSlide key={`${screenshot.image}-${index}`}>
            <div className="px-2 sm:px-3 py-4 md:py-6">
              <div
                className={cn(
                  "relative w-full max-w-[800px] mx-auto rounded-[2rem] overflow-hidden",
                  "transition-all duration-700",
                  activeIndex === index ? "scale-100 z-20" : "scale-90 z-10",
                  "border-4 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                )}
              >
                <div className="relative">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full max-h-[500px] object-contain"
                    loading="lazy"
                  />
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