import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />

      <main className="grid grid-cols-4">
        <section></section>
        <section className="col-span-3 md:col-span-2 p-4">
          <Outlet />
        </section>
        <section className="hidden md:block"></section>
      </main>
    </div>
  )
}

export default Layout