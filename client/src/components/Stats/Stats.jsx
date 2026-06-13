import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaTv, FaSmile, FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import './Stats.css'

function Counter({ target, isDecimal }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, isDecimal])

  return <span ref={ref}>{isDecimal ? count.toFixed(1) : count.toLocaleString()}</span>
}

export default function Stats({ profile }) {
  const stats = [
    { icon: <FaCalendarAlt />, target: profile?.experience || 10, label: 'Years Experience', suffix: '+' },
    { icon: <FaTv />, target: profile?.tvsRepaired || 5000, label: 'TVs Repaired', suffix: '+' },
    { icon: <FaSmile />, target: profile?.happyCustomers || 4800, label: 'Happy Customers', suffix: '+' },
    { icon: <FaMapMarkerAlt />, target: profile?.serviceLocations || 15, label: 'Service Locations', suffix: '+' },
    { icon: <FaStar />, target: profile?.rating || 4.9, label: 'Avg Rating', suffix: '/5', isDecimal: true },
  ]

  return (
    <section className="stats-section" id="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="stat-card glass-card"
              data-aos="zoom-in"
              data-aos-delay={i * 80}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-number">
                <Counter target={s.target} isDecimal={s.isDecimal} />
                <span className="stat-suffix">{s.suffix}</span>
              </div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
