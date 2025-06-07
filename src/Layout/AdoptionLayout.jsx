import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'

export default function AdoptionLayout() {
  const location = useLocation()
  const isFormPage = location.pathname.includes('/adoption/adoption-form')

  return (
    <div>
      {!isFormPage && <HeroSlider />}
      <Outlet />
    </div>
  )
}
