'use client'

import { type ReactElement, useCallback, useState } from 'react'
import Image from 'next/image'
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import { type CarouselType, type Media } from '@/payload-types'

function CarouselClient(props: CarouselType): ReactElement {
  const { images } = props as {
    images: {
      image: Media
      caption?: string
      id?: string
    }[]
  }

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img) => (
          <div className="relative w-full h-[400px] lg:h-[800px] flex-shrink-0" key={img.id}>
            <div>
              <Image
                src={img.image.url ?? ''}
                alt={img.image.alt}
                fill
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute z-10 text-lg left-0 bg-black text-white bottom-12 p-4 max-w-lg">
              <p className="line-clamp-2 text-pretty">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black p-2"
        aria-label="Previous slide"
      >
        <CaretLeft size={32} fill="white" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black p-2"
        aria-label="Next slide"
      >
        <CaretRight size={32} fill="white" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {images.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => {
              setCurrentIndex(index)
            }}
            className={`w-3 h-3 rounded-full outline outline-white bg-black ${index === currentIndex ? 'outline-4' : ' outline-2  opacity-50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export { CarouselClient }
