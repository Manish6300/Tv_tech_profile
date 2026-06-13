import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './Brands.css'

const brands = [
  { name: 'Samsung', color: '#1428A0' },
  { name: 'LG', color: '#A50034' },
  { name: 'Sony', color: '#000000' },
  { name: 'Mi', color: '#FF6900' },
  { name: 'OnePlus', color: '#F5010C' },
  { name: 'TCL', color: '#1B3E7B' },
  { name: 'Panasonic', color: '#003087' },
  { name: 'Vu', color: '#E30613' },
  { name: 'Philips', color: '#0070C0' },
  { name: 'Haier', color: '#CC0000' },
  { name: 'Toshiba', color: '#FF0000' },
  { name: 'Realme', color: '#F5A623' },
  { name: 'Acer', color: '#83B81A' },
]

export default function Brands() {
  return (
    <section className="section section-alt" id="brands">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Supported Brands</span>
          <h2>All Major TV Brands</h2>
          <p>Expert repair service for every brand you trust</p>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          loop
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={3000}
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="brands-swiper"
          data-aos="fade-up"
        >
          {[...brands, ...brands].map((brand, i) => (
            <SwiperSlide key={i}>
              <div className="brand-card">
                <div
                  className="brand-initial"
                  style={{ background: `linear-gradient(135deg, ${brand.color}22, ${brand.color}44)`, color: brand.color }}
                >
                  {brand.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="brand-name">{brand.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
