import { useRef } from 'react'
import AnnouncementBar from '@assets/components/AnnouncementBar/AnnouncementBar'

export default function AnnouncementCarousel ({ form }) {
  const carouselRef = useRef(null)

  const scrollNext = () => {
    if (carouselRef.current) {
      const width = carouselRef.current.clientWidth
      carouselRef.current.scrollBy({ left: width, behavior: 'smooth' })
    }
  }

  const scrollPrev = () => {
    if (carouselRef.current) {
      const width = carouselRef.current.clientWidth
      carouselRef.current.scrollBy({ left: -width, behavior: 'smooth' })
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <button
        onClick={scrollPrev}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        ◀
      </button>

      <div
        ref={carouselRef}
        className="carousel-container"
        style={{
          display: 'flex',
          overflowX: 'hidden',
          scrollSnapType: 'x mandatory',
          gap: '20px',
          scrollBehavior: 'smooth',
        }}
      >
        {form.content.announcements.map((announcement, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 100%',
              scrollSnapAlign: 'start',
            }}
          >
            <AnnouncementBar
              id={index}
              form={form}
              announcement={announcement}
            />
          </div>
        ))}
      </div>

      <button
        onClick={scrollNext}
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        ▶
      </button>
    </div>
  )
}
