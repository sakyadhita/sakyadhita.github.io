import React from 'react'
import NavBar from './NavBar/NavBar'
import Footer from './Footer'

export default function PageLayout({ children, hideFooter }) {
  return (
    <div style={{ overflowX: 'hidden', height: '100vh' }} id="page-layout">
      <NavBar />
      {children}
      {!hideFooter ? <Footer /> : null}
    </div>
  )
}
