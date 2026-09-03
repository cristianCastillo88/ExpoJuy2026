import { useState, useEffect } from "react"

import expoJuyLogo from "@/imports/expojuy26_horizontal.png"
import camaraLogo from "@/imports/logo_camcomext.png"
import type { Page } from "@/types"

interface NavbarProps {
  currentPage: Page
  setPage: (page: Page) => void
}

export default function Navbar({ currentPage, setPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const scrollToSection = (id: string) => {
    if (currentPage !== "home") {
      setPage("home")
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
    setMobileOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0D2458] shadow-lg shadow-navy-900/30"
          : "bg-[#0D2458]/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between gap-6">
        {/* Logos */}
        <button
          onClick={() => {
            setPage("home")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="flex items-center gap-3 shrink-0 group"
          aria-label="ExpoJuy 2026 — Inicio"
        >
          <img
            src={expoJuyLogo}
            alt="ExpoJuy 2026"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="w-px h-7 bg-white/25 hidden sm:block" />
          <div className="hidden sm:flex items-center bg-white rounded px-2 py-1">
            <img
              src={camaraLogo}
              alt="Cámara de Comercio Exterior de Jujuy"
              className="h-7 w-auto object-contain"
            />
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {[
            { label: "Sobre Nosotros", action: () => scrollToSection("about") },
            { label: "Agenda", action: () => setPage("agenda") },
            {
              label: "Expositores",
              action: () => scrollToSection("exhibitors"),
            },
            {
              label: "Mapa del Predio",
              action: () => scrollToSection("venue"),
            },
            { label: "Novedades", action: () => scrollToSection("news") },
            { label: "Contacto", action: () => scrollToSection("footer") },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="nav-link text-sm font-medium text-slate-200 hover:text-white transition-colors pb-0.5"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage("tickets")}
            className="hidden sm:flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm px-5 py-2.5 rounded-md transition-colors"
          >
            Comprar Entradas
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Menu"
          >
            <div className="w-5 space-y-1.5">
              <span
                className={`block h-0.5 bg-white transition-all ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0D2458] border-t border-white/10 px-8 py-4 space-y-3">
          {[
            { label: "Sobre Nosotros", action: () => scrollToSection("about") },
            {
              label: "Agenda",
              action: () => {
                setPage("agenda")
                setMobileOpen(false)
              },
            },
            {
              label: "Expositores",
              action: () => scrollToSection("exhibitors"),
            },
            { label: "Mapa del Venue", action: () => scrollToSection("venue") },
            { label: "Novedades", action: () => scrollToSection("news") },
            { label: "Contacto", action: () => scrollToSection("footer") },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="block w-full text-left text-sm text-slate-200 hover:text-white py-1"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setPage("tickets")
              setMobileOpen(false)
            }}
            className="block w-full text-center bg-teal-600 text-white font-semibold text-sm px-4 py-2 rounded-md mt-2"
          >
            Comprar Entradas
          </button>
        </div>
      )}
    </nav>
  )
}
