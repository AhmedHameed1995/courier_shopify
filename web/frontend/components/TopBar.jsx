import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthenticatedFetch } from '../hooks'

export function TopBar() {

  return (
    <div className='topbar-section'>
        <div className="logo-block">
            <img className='logo' src="../assets/logo.png" alt="logo image" />
            <h1 className='text-bold h4'>Shop Dashboard</h1>
            <NavLink to="/"> Sales </NavLink>
            <NavLink to="/products"> Products </NavLink>
        </div>
    </div>
  )
}