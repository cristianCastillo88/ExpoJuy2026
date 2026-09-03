import { useState } from "react"
import expoJuyLogo from "@/imports/expojuy26_horizontal.png"
import camaraLogo from "@/imports/logo_camcomext.png"
import type { Page } from "@/types"

interface FooterProps {
  setPage: (page: Page) => void
}

export default function Footer({ setPage }: FooterProps) {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer id="footer" className="bg-[#070F2B] text-slate-300">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl text-white">
              Mantente Informado
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Novedades, agenda y anuncios exclusivos de ExpoJuy 2026.
            </p>
          </div>
          {subscribed ? (
            <div className="flex items-center gap-2 text-teal-400 font-medium">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              ¡Suscripción confirmada!
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex gap-2 w-full md:w-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 md:w-64 bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm px-5 py-2.5 rounded-md transition-colors whitespace-nowrap"
              >
                Suscribirse
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Logos */}
          <div className="md:col-span-1 space-y-4">
            <img
              src={expoJuyLogo}
              alt="ExpoJuy 2026"
              className="h-10 w-auto object-contain"
            />
            <p className="text-sm text-slate-400 leading-relaxed">
              La feria multisectorial más representativa del norte argentino.
              Industria, producción, comercio y tecnología en Jujuy.
            </p>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-2">
                Organiza:
              </span>
              <div className="inline-flex items-center bg-white rounded px-2.5 py-1.5 shadow-sm">
                <img
                  src={camaraLogo}
                  alt="Cámara de Comercio Exterior de Jujuy"
                  className="h-7 w-auto object-contain"
                />
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              {[
                {
                  name: "Twitter/X",
                  icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
                {
                  name: "LinkedIn",
                  icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
                {
                  name: "Instagram",
                  icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
                },
                {
                  name: "Facebook",
                  icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
              ].map((social) => (
                <button
                  key={social.name}
                  aria-label={social.name}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-teal-600 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Inicio", page: "home" as Page },
                { label: "Agenda", page: "agenda" as Page },
                { label: "Entradas", page: "tickets" as Page },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => setPage(item.page)}
                    className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              {["Expositores", "Mapa del Venue", "Noticias", "Prensa"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-slate-400 cursor-default">
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Venue */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
              Sede del Evento
            </h4>
            <address className="not-italic text-sm text-slate-400 leading-relaxed space-y-1">
              <p className="text-white font-medium">
                Predio Ferial Ciudad Cultural
              </p>
              <p>San Salvador de Jujuy, Argentina</p>
              <p className="mt-3 text-teal-400 font-semibold">Octubre 2026</p>
            </address>
            <div className="mt-4 space-y-1 text-sm text-slate-400">
              <p>
                <span className="text-slate-500">Email:</span>{" "}
                <a
                  href="mailto:info@expojuy2026.ar"
                  className="hover:text-teal-400 transition-colors"
                >
                  info@expojuy2026.ar
                </a>
              </p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
              Legal & Prensa
            </h4>
            <ul className="space-y-2.5">
              {[
                "Términos y Condiciones",
                "Política de Privacidad",
                "Política de Cookies",
                "Acreditaciones de Prensa",
                "Kit de Medios",
                "Contacto Institucional",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-slate-400 cursor-default hover:text-slate-300 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 ExpoJuy. Todos los derechos reservados.</p>
          <p>
            Cámara de Comercio Exterior de Jujuy & Ministerio de Desarrollo
            Económico y Producción.
          </p>
        </div>
      </div>
    </footer>
  )
}
