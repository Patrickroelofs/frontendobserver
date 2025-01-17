import Image from 'next/image'
import { type HeroType, type Media } from '@/payload-types'

function Hero(props: HeroType) {
  const { image } = props as {
    image: Media
  }

  return (
    <header className="border-b-2 border-black">
      <div className="relative w-full h-[240px] md:h-[580px]">
        <Image
          placeholder="blur"
          className="object-cover bg-center pixelated"
          src={image.url ?? ''}
          blurDataURL={image.blurData ?? ''}
          alt={image.alt}
          fill
          priority
        />
      </div>
    </header>
  )
}

export { Hero }
