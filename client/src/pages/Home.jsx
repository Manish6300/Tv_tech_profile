import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Services from '../components/Services/Services'
import Brands from '../components/Brands/Brands'
import Stats from '../components/Stats/Stats'
import Gallery from '../components/Gallery/Gallery'
import Reviews from '../components/Reviews/Reviews'
import BookingForm from '../components/BookingForm/BookingForm'
import Contact from '../components/Contact/Contact'
import FAQ from '../components/FAQ/FAQ'
import Footer from '../components/Footer/Footer'
import FloatButtons from '../components/UI/FloatButtons'
import Loader from '../components/UI/Loader'
import { profileAPI, servicesAPI, galleryAPI, reviewsAPI, socialAPI } from '../services/api'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [services, setServices] = useState([])
  const [gallery, setGallery] = useState([])
  const [reviews, setReviews] = useState([])
  const [socialLinks, setSocialLinks] = useState(null)

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 80 })
    fetchAll()
  }, [])

  const fetchAll = async () => {
    try {
      const [p, s, g, r, sl] = await Promise.all([
        profileAPI.get(),
        servicesAPI.getPublic(),
        galleryAPI.get(),
        reviewsAPI.getPublic(),
        socialAPI.get()
      ])
      setProfile(p.data.data)
      setServices(s.data.data)
      setGallery(g.data.data)
      setReviews(r.data.data)
      setSocialLinks(sl.data.data)
    } catch (err) {
      console.error('Error loading data:', err.message)
    } finally {
      setTimeout(() => setLoading(false), 1200)
    }
  }

  if (loading) return <Loader />

  return (
    <>
      <Navbar profile={profile} />
      <Hero profile={profile} socialLinks={socialLinks} />
      <About profile={profile} />
      <Services services={services} />
      <Brands />
      <Stats profile={profile} />
      <Gallery images={gallery} />
      <Reviews reviews={reviews} onRefresh={fetchAll} />
      <BookingForm />
      <Contact profile={profile} socialLinks={socialLinks} />
      <FAQ />
      <Footer profile={profile} socialLinks={socialLinks} />
      <FloatButtons whatsappLink={socialLinks?.whatsapp} />
    </>
  )
}
