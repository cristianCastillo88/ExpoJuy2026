import { useState, useEffect } from "react"
import expoJuyIsotipo from "@/imports/expojuy26_isologotipo.png"
import camcomextLogo from "@/imports/logo_camcomext.png"
import type { Page } from "@/types"

interface HomeProps {
  setPage: (page: Page) => void
}

// --- Countdown Timer ---
function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now())
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])
  const total = Math.max(0, diff)
  const days = Math.floor(total / 86400000)
  const hours = Math.floor((total % 86400000) / 3600000)
  const minutes = Math.floor((total % 3600000) / 60000)
  const seconds = Math.floor((total % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-block">
      <div className="font-display text-4xl text-white leading-none">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[11px] font-medium tracking-widest uppercase text-teal-400 mt-1">
        {label}
      </div>
    </div>
  )
}

// --- FAQ Accordion ---
const faqs = [
  {
    q: "¿Cuáles son los precios de las entradas?",
    a: "Pase General: ARS 5.000 · Pase Estudiante: ARS 2.500 (con credencial vigente) · Pase Business B2B: ARS 12.000 (incluye acceso a salones de networking privado, agenda B2B y kit ejecutivo).",
  },
  {
    q: "¿Cómo llegar al Centro de Convenciones Jujuy?",
    a: "La sede está ubicada en Av. Independencia 820, San Salvador de Jujuy. Hay transporte público (líneas 14 y 22) y estacionamiento habilitado en el predio. El aeropuerto 'Gobernador Horacio Guzmán' está a 30 minutos en remís.",
  },
  {
    q: "¿Hay estacionamiento disponible en el predio?",
    a: "Sí. El predio cuenta con 600 espacios de estacionamiento gratuito para asistentes acreditados. Para pases generales el estacionamiento tiene un costo de ARS 800 por día. También habrá servicio de cochera en playas aledañas.",
  },
  {
    q: "¿Cómo obtengo mi acreditación empresarial?",
    a: "Las empresas expositoras y visitantes con interés B2B deben completar el formulario de acreditación en expojuy2026.ar/acreditaciones antes del 30 de septiembre. El pase Business B2B incluye acceso al Salón Ejecutivo, reuniones pre-agendadas y directorio de contactos.",
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-800 text-[15px]">{q}</span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full border-2 border-navy-700 flex items-center justify-center text-navy-700 transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
      </button>
      <div className={`accordion-content ${open ? "max-h-60" : "max-h-0"}`}>
        <p className="text-slate-600 text-sm leading-relaxed pb-5">{a}</p>
      </div>
    </div>
  )
}

const agendaCards = [
  {
    time: "10:00 — 11:30",
    auditorium: "Auditorio Principal",
    speaker: "Dra. Valentina Ríos",
    role: "Directora de Innovación · Ministerio de Producción",
    topic: "Economía del Conocimiento",
    color: "bg-teal-100 text-teal-700",
    image: "photo-1573496359142-b8d87734a5a2",
  },
  {
    time: "12:00 — 13:00",
    auditorium: "Sala Minería",
    speaker: "Ing. Carlos Mamani",
    role: "Gerente General · Litio Norandino S.A.",
    topic: "Minería & Litio",
    color: "bg-blue-100 text-blue-700",
    image: "photo-1541888946425-d81bb19240f5",
  },
  {
    time: "15:00 — 16:30",
    auditorium: "Pabellón Agro",
    speaker: "Lic. Florencia Zerda",
    role: "Investigadora · INTA Jujuy",
    topic: "Agro-Industria",
    color: "bg-emerald-100 text-emerald-700",
    image: "photo-1556075798-4825dfaaf498",
  },
]

const exhibitors = [
  {
    name: "Jujuy Solar S.A.",
    stand: "Pab. A · Stand 12",
    cat: "Tecnología",
    logo: "JS",
  },
  {
    name: "Minera Puna Resources",
    stand: "Pab. B · Stand 03",
    cat: "Minería",
    logo: "MP",
  },
  {
    name: "AgroNoroeste Coop.",
    stand: "Pab. C · Stand 08",
    cat: "Agro",
    logo: "AN",
  },
  {
    name: "Logística Andina S.R.L.",
    stand: "Pab. D · Stand 15",
    cat: "Servicios",
    logo: "LA",
  },
  {
    name: "Salta Ingeniería",
    stand: "Pab. A · Stand 22",
    cat: "Tecnología",
    logo: "SI",
  },
  {
    name: "Finca Los Molinos",
    stand: "Pab. C · Stand 11",
    cat: "Agro",
    logo: "FM",
  },
  {
    name: "DataNOA Systems",
    stand: "Pab. A · Stand 05",
    cat: "Tecnología",
    logo: "DN",
  },
  {
    name: "Transportes Andinos",
    stand: "Pab. D · Stand 09",
    cat: "Servicios",
    logo: "TA",
  },
]

const categories = ["Todos", "Agro", "Minería", "Tecnología", "Servicios"]

const newsItems = [
  {
    date: "28 Ago 2026",
    tag: "Institucional",
    tagColor: "bg-navy-900 text-white",
    title:
      "ExpoJuy 2026 confirma más de 200 empresas expositoras de 12 provincias",
    excerpt:
      "El evento consolida su posición como la feria industrial más importante del NOA, con participación de empresas nacionales e internacionales.",
    img: "photo-1540575467063-178a50c2df87",
  },
  {
    date: "15 Ago 2026",
    tag: "Agenda",
    tagColor: "bg-teal-600 text-white",
    title:
      "Se confirma la cumbre de minería sustentable con empresas de litio de todo el país",
    excerpt:
      "El Pabellón Minería albergará una cumbre de dos días centrada en la industrialización del litio y las nuevas regulaciones ambientales.",
    img: "photo-1518770660439-4636190af475",
  },
  {
    date: "5 Ago 2026",
    tag: "Prensa",
    tagColor: "bg-slate-700 text-white",
    title:
      "El Ministerio de Producción de Jujuy destaca la feria como catalizador de inversiones",
    excerpt:
      "Según proyecciones oficiales, ExpoJuy 2026 generará más de USD 80 millones en acuerdos comerciales durante los 4 días del evento.",
    img: "photo-1556075798-4825dfaaf498",
  },
]

const sponsors = {
  platinum: [
    { name: "Lithium Americas", abbr: "LA" },
    { name: "YPF Energía Eléctrica", abbr: "YPF" },
    { name: "Techint Group", abbr: "TG" },
  ],
  gold: [
    { name: "Banco Provincia Jujuy", abbr: "BPJ" },
    { name: "Aerolíneas Argentinas", abbr: "AA" },
    { name: "Mercado Pago", abbr: "MP" },
    { name: "Telecom Argentina", abbr: "TA" },
  ],
}

export default function Home({ setPage }: HomeProps) {
  const eventDate = new Date("2026-10-14T09:00:00")
  const countdown = useCountdown(eventDate)

  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todos")

  const filtered = exhibitors.filter((e) => {
    const matchCat = activeCategory === "Todos" || e.cat === activeCategory
    const matchSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="pt-16">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#0D2458]">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1440&h=900&fit=crop&auto=format"
            alt="Feria industrial ExpoJuy 2026"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D2458]/90 via-[#0D2458]/70 to-[#0B2A6A]/50" />
        </div>

        {/* Decorative line element */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-teal-500 to-transparent opacity-60" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-8 py-20 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-teal-500/40 bg-teal-500/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-teal-300 text-xs font-semibold tracking-widest uppercase">
                14 — 17 de Octubre 2026 · San Salvador de Jujuy
              </span>
            </div>

            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6">
              Innovación, Talento &{" "}
              <span className="text-teal-400">Producción Sustentable</span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-xl mb-10">
              El hub del norte argentino que conecta tecnología, industria y
              comercio global. Cuatro días que definen el futuro productivo del
              NOA.
            </p>

            {/* Countdown */}
            <div className="flex items-center gap-3 mb-10">
              <CountdownBlock value={countdown.days} label="Días" />
              <span className="text-teal-400 text-2xl font-light">:</span>
              <CountdownBlock value={countdown.hours} label="Horas" />
              <span className="text-teal-400 text-2xl font-light">:</span>
              <CountdownBlock value={countdown.minutes} label="Min" />
              <span className="text-teal-400 text-2xl font-light">:</span>
              <CountdownBlock value={countdown.seconds} label="Seg" />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setPage("tickets")}
                className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3.5 rounded-md transition-colors text-sm tracking-wide shadow-lg shadow-teal-900/30"
              >
                Obtener Entradas →
              </button>
              <button
                onClick={() => setPage("agenda")}
                className="border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-3.5 rounded-md transition-colors text-sm tracking-wide"
              >
                Explorar Agenda
              </button>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ===== STATS RIBBON ===== */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "+200", label: "Empresas Expositoras", icon: "🏢" },
              { value: "+50", label: "Conferencias & Paneles", icon: "🎤" },
              { value: "+30.000", label: "Visitantes Esperados", icon: "👥" },
              { value: "B2B", label: "Networking Internacional", icon: "🤝" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-start gap-4 py-4">
                <div className="w-10 h-10 rounded-lg bg-navy-900/5 flex items-center justify-center text-xl shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <div className="font-display text-3xl text-navy-900 leading-none">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 mt-1 leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="bg-slate-50 py-20">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-4">
                Sobre ExpoJuy 2026
              </p>
              <h2 className="font-display text-4xl lg:text-5xl text-navy-900 leading-tight mb-6">
                El encuentro que el norte argentino estaba esperando
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                ExpoJuy 2026 es la feria multisectorial más importante de la
                región del NOA. Organizada por la Cámara de Comercio Exterior de
                Jujuy en colaboración con el Gobierno Provincial, convoca a
                líderes de industria, tecnólogos, emprendedores y organismos
                públicos en un mismo espacio de cuatro días.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Con foco en la minería del litio, la agroindustria sustentable,
                la economía del conocimiento y el comercio exterior, la feria
                propone un programa denso de conferencias, ruedas de negocios,
                presentaciones de productos y experiencias de networking
                pensadas para generar resultados concretos.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Ediciones realizadas", val: "8va Edición" },
                  { label: "Superficie cubierta", val: "18.000 m²" },
                  { label: "Pabellones temáticos", val: "6 Pabellones" },
                  { label: "Países representados", val: "+14 Países" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white rounded-lg p-4 border border-slate-200"
                  >
                    <div className="font-display text-2xl text-teal-600">
                      {item.val}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop&auto=format"
                  alt="Pabellón industrial ExpoJuy"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-5 -left-5 bg-navy-900 text-white rounded-xl p-5 shadow-2xl max-w-xs border border-white/10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-white/10 p-2 shrink-0 border border-white/20 flex items-center justify-center">
                  <img
                    src={expoJuyIsotipo}
                    alt="ExpoJuy Isotipo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-display text-2xl text-teal-400 font-bold">
                    8va Edición
                  </div>
                  <div className="text-xs text-slate-300 leading-snug mt-0.5">
                    La feria más importante del NOA con más de 15 años de
                    historia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED AGENDA ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-3">
                Programa Destacado
              </p>
              <h2 className="font-display text-4xl text-navy-900">
                Conferencias Principales
              </h2>
            </div>
            <button
              onClick={() => setPage("agenda")}
              className="text-sm font-semibold text-navy-700 hover:text-teal-600 flex items-center gap-2 transition-colors hidden sm:flex"
            >
              Ver programa completo →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agendaCards.map((card) => (
              <div
                key={card.speaker}
                className="card-hover border border-slate-200 rounded-xl overflow-hidden bg-white"
              >
                <div className="h-40 bg-slate-100 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${card.image}?w=600&h=300&fit=crop&auto=format`}
                    alt={card.topic}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${card.color}`}
                    >
                      {card.topic}
                    </span>
                    <span className="text-xs text-slate-400">{card.time}</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-0.5">
                    {card.speaker}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3 leading-tight">
                    {card.role}
                  </p>
                  <p className="text-xs text-teal-600 font-medium">
                    {card.auditorium}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <button
              onClick={() => setPage("agenda")}
              className="text-sm font-semibold text-navy-700 hover:text-teal-600"
            >
              Ver programa completo →
            </button>
          </div>
        </div>
      </section>

      {/* ===== EXHIBITORS ===== */}
      <section id="exhibitors" className="py-20 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-3">
              Empresas Participantes
            </p>
            <h2 className="font-display text-4xl text-navy-900 mb-6">
              Expositores Destacados
            </h2>

            {/* Search + Chips */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar expositor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-teal-500 bg-white w-60"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                      activeCategory === cat
                        ? "bg-navy-900 text-white"
                        : "bg-white border border-slate-300 text-slate-600 hover:border-navy-700 hover:text-navy-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((e) => (
              <div
                key={e.name}
                className="card-hover bg-white border border-slate-200 rounded-xl p-5"
              >
                <div className="w-14 h-14 rounded-xl bg-navy-900 text-white font-bold text-sm flex items-center justify-center mb-4 font-display text-lg">
                  {e.logo}
                </div>
                <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-1">
                  {e.name}
                </h3>
                <p className="text-xs text-slate-400 mb-2">{e.stand}</p>
                <span className="text-xs bg-teal-100 text-teal-700 px-2.5 py-1 rounded-full font-medium">
                  {e.cat}
                </span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-4 text-center py-12 text-slate-400">
                No se encontraron expositores para ese criterio.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== VENUE MAP TEASER ===== */}
      <section
        id="venue"
        className="py-20 bg-navy-900 overflow-hidden relative"
      >
        <div className="absolute inset-0 opacity-5">
          {/* Grid background */}
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-teal-400 mb-4">
                Plano del Predio
              </p>
              <h2 className="font-display text-4xl text-white mb-5">
                Centro de Convenciones Jujuy · 18.000 m²
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                El predio cuenta con 6 pabellones temáticos, 3 auditorios, áreas
                de networking, restaurantes y estacionamiento. Planificá tu
                visita con el mapa interactivo.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { pab: "Pab. A", tema: "Tecnología" },
                  { pab: "Pab. B", tema: "Minería" },
                  { pab: "Pab. C", tema: "Agro" },
                  { pab: "Pab. D", tema: "Servicios" },
                  { pab: "Pab. E", tema: "Energía" },
                  { pab: "Pab. F", tema: "B2B" },
                ].map((p) => (
                  <div
                    key={p.pab}
                    className="bg-white/10 rounded-lg p-3 border border-white/10"
                  >
                    <div className="text-xs font-bold text-teal-400">
                      {p.pab}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {p.tema}
                    </div>
                  </div>
                ))}
              </div>
              <button className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-7 py-3 rounded-md text-sm transition-colors">
                Explorar Mapa Interactivo →
              </button>
            </div>

            {/* Schematic map */}
            <div className="bg-navy-950/60 rounded-2xl border border-white/10 p-6 relative">
              <div className="text-xs text-slate-500 uppercase tracking-widest mb-4">
                Vista esquemática del predio
              </div>
              <div className="grid grid-cols-3 grid-rows-3 gap-2 aspect-square max-w-sm mx-auto">
                {[
                  {
                    pab: "Pab. A",
                    color: "bg-teal-600/30 border-teal-500/40",
                    span: "col-span-2",
                  },
                  { pab: "Pab. B", color: "bg-blue-600/30 border-blue-500/40" },
                  {
                    pab: "Pab. C",
                    color: "bg-emerald-600/30 border-emerald-500/40",
                  },
                  {
                    pab: "Auditorio",
                    color: "bg-amber-600/30 border-amber-500/40",
                    span: "col-span-2 row-span-1",
                  },
                  {
                    pab: "Pab. D",
                    color: "bg-purple-600/30 border-purple-500/40",
                  },
                  { pab: "Pab. E", color: "bg-rose-600/30 border-rose-500/40" },
                  {
                    pab: "Pab. F · B2B",
                    color: "bg-cyan-600/30 border-cyan-500/40",
                    span: "col-span-2",
                  },
                  {
                    pab: "Estac.",
                    color: "bg-slate-600/30 border-slate-500/40",
                  },
                ].map((cell) => (
                  <div
                    key={cell.pab}
                    className={`${cell.color} border rounded-lg flex items-center justify-center text-white text-[11px] font-medium text-center p-2 ${cell.span || ""}`}
                  >
                    {cell.pab}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-teal-500" /> Entrada
                principal · Av. Independencia 820
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWS ===== */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-3">
              Prensa & Novedades
            </p>
            <h2 className="font-display text-4xl text-navy-900">
              Últimas Noticias
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <article
                key={item.title}
                className="card-hover border border-slate-200 rounded-xl overflow-hidden"
              >
                <div className="h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${item.img}?w=600&h=300&fit=crop&auto=format`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded ${item.tagColor}`}
                    >
                      {item.tag}
                    </span>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 leading-snug mb-2 text-[15px]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                  <button className="text-xs font-semibold text-teal-600 hover:text-teal-500 transition-colors">
                    Leer más →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPONSORS ===== */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-center font-display text-3xl text-navy-900 mb-12">
            Organizadores & Patrocinadores
          </h2>

          {/* Organizing */}
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 text-center mb-6">
              Organiza
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {/* Main Organizer */}
              <div className="bg-white border-2 border-teal-500 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 shadow-sm max-w-md">
                <div className="bg-white p-2 rounded-xl flex items-center justify-center">
                  <img
                    src={camcomextLogo}
                    alt="Cámara de Comercio Exterior de Jujuy"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-[11px] font-bold text-teal-600 tracking-wider uppercase block">
                    Entidad Organizadora
                  </span>
                  <span className="font-semibold text-slate-800 text-sm sm:text-base">
                    Cámara de Comercio Exterior de Jujuy
                  </span>
                </div>
              </div>

              {/* Institutional Partners */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: "Gobierno de Jujuy", role: "Auspicio Oficial" },
                  {
                    name: "Ministerio de Producción",
                    role: "Apoyo Institucional",
                  },
                  { name: "CAME", role: "Adhesión Gremial" },
                ].map((inst) => (
                  <div
                    key={inst.name}
                    className="bg-navy-900 text-white rounded-xl px-5 py-3.5 flex flex-col justify-center min-w-[170px]"
                  >
                    <span className="text-[10px] text-teal-400 uppercase font-semibold tracking-wider">
                      {inst.role}
                    </span>
                    <span className="font-semibold text-sm">{inst.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Platinum */}
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 text-center mb-4">
              Platino
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {sponsors.platinum.map((s) => (
                <div
                  key={s.name}
                  className="bg-white border-2 border-slate-200 rounded-xl px-7 py-3.5 flex items-center gap-3 min-w-[180px] justify-center hover:border-teal-400 transition-colors"
                >
                  <div className="w-7 h-7 rounded bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                    {s.abbr}
                  </div>
                  <span className="font-semibold text-sm text-slate-700">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gold */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 text-center mb-4">
              Oro
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {sponsors.gold.map((s) => (
                <div
                  key={s.name}
                  className="bg-white border border-slate-200 rounded-lg px-5 py-3 flex items-center gap-2 hover:border-teal-400 transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-amber-100 flex items-center justify-center text-[10px] font-bold text-amber-700">
                    {s.abbr}
                  </div>
                  <span className="text-sm text-slate-600 font-medium">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-4">
                FAQ
              </p>
              <h2 className="font-display text-4xl text-navy-900 mb-5">
                Preguntas frecuentes
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                ¿Tenés dudas sobre el evento? Aquí respondemos las consultas más
                habituales de visitantes y expositores.
              </p>
              <button
                onClick={() => setPage("tickets")}
                className="text-sm font-semibold text-teal-600 hover:text-teal-500 transition-colors"
              >
                Comprar entradas →
              </button>
            </div>
            <div className="lg:col-span-2">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRE-FOOTER CTA ===== */}
      <section className="bg-teal-600 py-16">
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <h2 className="font-display text-4xl text-white mb-4">
            No te quedes afuera de ExpoJuy 2026
          </h2>
          <p className="text-teal-100 mb-8 max-w-xl mx-auto">
            Más de 30.000 visitantes, 200 empresas y 4 días de networking,
            conferencias y negocios en el norte argentino.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setPage("tickets")}
              className="bg-white text-teal-700 font-bold px-8 py-3.5 rounded-md hover:bg-teal-50 transition-colors text-sm"
            >
              Obtener Entradas
            </button>
            <button
              onClick={() => setPage("agenda")}
              className="border-2 border-white/60 text-white font-semibold px-8 py-3.5 rounded-md hover:border-white transition-colors text-sm"
            >
              Ver Agenda
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
