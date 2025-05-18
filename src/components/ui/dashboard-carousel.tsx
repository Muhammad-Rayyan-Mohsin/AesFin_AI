import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

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
}

const DashboardCarousel: React.FC<DashboardCarouselProps> = ({ 
  screenshots,
  onPrev,
  onNext,
  activeIndex: externalActiveIndex
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
    setInternalActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {screenshots.map((screenshot, index) => (
          <SwiperSlide key={`${screenshot.image}-${index}`}>
            <div className="h-full pl-4 pr-8 py-16">
              <motion.div
                className={cn(
                  "relative w-full h-full rounded-[2rem] overflow-hidden",
                  "transition-all duration-500",
                  activeIndex === index ? "scale-100 z-20" : "scale-90 z-10",
                  "border-4 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                )}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeIndex === index ? 1 : 0.7,
                  scale: activeIndex === index ? 1 : 0.9,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-aes-navy/80 via-aes-navy/30 to-transparent" />
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DashboardCarousel; 