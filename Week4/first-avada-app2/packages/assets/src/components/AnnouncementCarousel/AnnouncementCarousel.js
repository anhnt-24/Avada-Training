import { useRef } from 'react'
import AnnouncementBar from '@assets/components/AnnouncementBar/AnnouncementBar'
import './AnnouncementCarousel.scss'

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
    <div className="carousel-wrapper">
      <button className="carousel-btn prev" onClick={scrollPrev}>
        &#x2039;
      </button>

      <div ref={carouselRef} className="carousel-container">
        {form.content.announcements.map((announcement, index) => (
          <div key={index} className="carousel-item">
            <AnnouncementBar
              id={index}
              form={form}
              announcement={announcement}
            />
          </div>
        ))}
      </div>

      <button className="carousel-btn next" onClick={scrollNext}>
        &#x203A;
      </button>
    </div>
  )
}
