import React from 'react'
import './InfoRedes.css'


const info_redes = () => {
  return (
    <div className='div_redes'>
      <ul>
        <li><a href="https://github.com/Raphael-Machado-Silva" className='a_redes obj' target='_blank'><i className="fa-brands fa-github"></i></a></li>
        <li><a href="https://www.linkedin.com/in/raphael-machado-silva-74457a291/" target='_blank' className='a_redes obj'><i className="fa-brands fa-linkedin"></i></a></li>
        <li><a href="#contact" target='_blank'className='a_redes obj'><i className="fa-regular fa-envelope"></i></a></li>
      </ul>
    </div>
  )
}

export default info_redes
