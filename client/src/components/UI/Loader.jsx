import { FaTv } from 'react-icons/fa'
import './Loader.css'

export default function Loader() {
  return (
    <div className="page-loader">
      <div className="loader-icon"><FaTv /></div>
      <div className="loader-bar"><div className="loader-fill" /></div>
      <p>Loading...</p>
    </div>
  )
}
