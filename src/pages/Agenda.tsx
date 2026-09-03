import { useState } from "react"
import expoJuyLogo from "@/imports/expojuy26_horizontal.png"
import type { Page } from "@/types"

interface AgendaProps {
  setPage: (page: Page) => void
}

const days = [
  { label: "Día 1", date: "Mié 14 Oct" },
  { label: "Día 2", date: "Jue 15 Oct" },
  { label: "Día 3", date: "Vie 16 Oct" },
  { label: "Día 4", date: "Sáb 17 Oct" },
]

type CategoryKey = "Tecnología" | "Minería" | "Agro-Industria" | "Economía" | "Energía" | "B2B"

const categoryColors: Record<CategoryKey, string> = {
  Tecnología: "bg-blue-100 text-blue-700",
  Minería: "bg-slate-100 text-slate-700",
  "Agro-Industria": "bg-emerald-100 text-emerald-700",
  Economía: "bg-amber-100 text-amber-700",
  Energía: "bg-orange-100 text-orange-700",
  B2B: "bg-purple-100 text-purple-700",
}

interface Session {
  time: string
  end: string
  auditorium: string
  speaker: string
  role: string
  topic: string
  cat: CategoryKey
  bio: string
}

const schedule: Record<number, Session[]> = {
  0: [
    {
      time: "09:00",
      end: "09:30",
      auditorium: "Auditorio Principal",
      speaker: "Ceremonia de Apertura",
      role: "Gobernación de Jujuy + Cámara de Comercio Exterior",
      topic: "Apertura Oficial ExpoJuy 2026",
      cat: "Economía",
      bio: "Apertura institucional con autoridades provinciales, nacionales y representantes del sector privado.",
    },
    {
      time: "10:00",
      end: "11:30",
      auditorium: "Auditorio Principal",
      speaker: "Dra. Valentina Ríos",
      role: "Directora de Innovación · Ministerio de Producción de Jujuy",
      topic: "Jujuy como hub de la Economía del Conocimiento",
      cat: "Economía",
      bio: "Doctora en Ciencias Económicas por la UBA. Especialista en política industrial y economías regionales. Asesora del BID para proyectos de innovación en el NOA.",
    },
    {
      time: "12:00",
      end: "13:00",
      auditorium: "Sala Minería · Pab. B",
      speaker: "Ing. Carlos Mamani",
      role: "Gerente General · Litio Norandino S.A.",
      topic: "El triángulo del litio y la industrialización argentina",
      cat: "Minería",
      bio: "Ingeniero en Recursos Naturales, 20 años de trayectoria en minería de litio y sal. Referente internacional en procesos de extracción directa (DLE).",
    },
    {
      time: "15:00",
      end: "16:30",
      auditorium: "Sala Agro · Pab. C",
      speaker: "Lic. Florencia Zerda",
      role: "Investigadora Titular · INTA Jujuy",
      topic: "Agro-Industria sustentable: el caso del tabaco orgánico jujeño",
      cat: "Agro-Industria",
      bio: "Licenciada en Agronomía y doctoranda en Agroecología. Lidera proyectos de reconversión productiva en la Quebrada de Humahuaca con impacto en 400 familias.",
    },
    {
      time: "17:00",
      end: "18:30",
      auditorium: "Sala B2B · Pab. F",
      speaker: "Mesa de Inversores",
      role: "Moderado por la Cámara de Comercio Exterior",
      topic: "Ronda B2B Internacional: Sesión de Apertura",
      cat: "B2B",
      bio: "Primera ronda de negocios del evento. Conexión entre exportadores jujeños e importadores de Brasil, Chile y Uruguay. Requiere acreditación Business Pass.",
    },
  ],
  1: [
    {
      time: "09:30",
      end: "11:00",
      auditorium: "Auditorio Principal",
      speaker: "Dr. Ernesto Villalobos",
      role: "CEO · DataNOA Systems",
      topic: "Inteligencia Artificial aplicada a la minería y el agro",
      cat: "Tecnología",
      bio: "Doctor en Inteligencia Artificial por el ITBA. Fundador de DataNOA, empresa jujeña de IA con clientes en 6 países latinoamericanos.",
    },
    {
      time: "11:30",
      end: "13:00",
      auditorium: "Sala Energía · Pab. E",
      speaker: "Ing. Sebastián Chocobar",
      role: "Director de Proyectos · Jujuy Solar S.A.",
      topic: "Energías renovables: el potencial solar del NOA",
      cat: "Energía",
      bio: "Ingeniero eléctrico. Lideró el diseño y construcción del Parque Solar Cauchari, uno de los más grandes de Latinoamérica.",
    },
    {
      time: "14:00",
      end: "15:00",
      auditorium: "Sala Minería · Pab. B",
      speaker: "Dra. Mariana Pizarro",
      role: "Investigadora CONICET · UNJU",
      topic: "Nuevas regulaciones ambientales para la minería de litio",
      cat: "Minería",
      bio: "Especialista en derecho ambiental minero. Asesora de organismos internacionales en estándares ESG para la industria extractiva en América Latina.",
    },
    {
      time: "16:00",
      end: "17:30",
      auditorium: "Auditorio Principal",
      speaker: "Panel: Fintech & Exportaciones",
      role: "Mercado Pago · Banco Provincia Jujuy · AFIP",
      topic: "Herramientas financieras para exportadores NOA",
      cat: "Economía",
      bio: "Panel con representantes de los principales actores del ecosistema financiero y regulatorio argentino. Casos de uso reales y nuevas herramientas 2026.",
    },
  ],
  2: [
    {
      time: "09:00",
      end: "10:30",
      auditorium: "Sala Agro · Pab. C",
      speaker: "Ing. Lucía Coria",
      role: "Presidenta · AgroNoroeste Cooperativa",
      topic:
        "Cooperativismo agrario: modelo de escala para pequeños productores",
      cat: "Agro-Industria",
      bio: "Ingeniera agrónoma y cooperativista. Al frente de una de las cooperativas agropecuarias más exitosas del NOA con más de 1.200 socios.",
    },
    {
      time: "11:00",
      end: "12:30",
      auditorium: "Auditorio Principal",
      speaker: "Dr. Pablo Alderete",
      role: "Subsecretario de Comercio Exterior · Nación",
      topic:
        "Argentina y el MERCOSUR: nuevas oportunidades de exportación 2027",
      cat: "Economía",
      bio: "Economista y diplomático comercial. 15 años de trayectoria en negociaciones de libre comercio a nivel bilateral y multilateral.",
    },
    {
      time: "14:30",
      end: "16:00",
      auditorium: "Sala Tecnología · Pab. A",
      speaker: "Lic. Camila Burgos",
      role: "Fundadora · TechNOA Hub",
      topic: "Ecosistema startup en el norte argentino: casos y oportunidades",
      cat: "Tecnología",
      bio: "Emprendedora serial y mentora. Fundó el primer hub tecnológico del NOA, que ya aceleró 80 startups regionales y atrajo USD 12M en inversión.",
    },
    {
      time: "17:00",
      end: "18:30",
      auditorium: "Sala B2B · Pab. F",
      speaker: "Ronda B2B — Sesión 3",
      role: "Agro-Exportadores · Importadores Europeos",
      topic: "Match B2B: productores jujeños y compradores UE",
      cat: "B2B",
      bio: "Ronda especializada en agro-alimentos y productos regionales. Participan compradores de España, Italia y Alemania. Requiere Business Pass.",
    },
  ],
  3: [
    {
      time: "10:00",
      end: "11:30",
      auditorium: "Auditorio Principal",
      speaker: "Dr. Maximiliano Flores",
      role: "Rector · Universidad Nacional de Jujuy",
      topic: "Universidad, industria y territorio: la triple hélice del NOA",
      cat: "Economía",
      bio: "Doctor en Ciencias Sociales. Rector de la UNJU desde 2022, impulsor de la vinculación tecnológica entre academia y sector productivo regional.",
    },
    {
      time: "12:00",
      end: "13:00",
      auditorium: "Sala Energía · Pab. E",
      speaker: "Ing. Rodrigo Condori",
      role: "Gerente de Proyectos · YPF Energía Eléctrica",
      topic: "Hidrógeno verde en Jujuy: hoja de ruta 2026-2030",
      cat: "Energía",
      bio: "Ingeniero petroquímico especializado en energías limpias. Lidera los proyectos de hidrógeno verde de YPF en el norte argentino.",
    },
    {
      time: "15:00",
      end: "17:00",
      auditorium: "Auditorio Principal",
      speaker: "Ceremonia de Cierre",
      role: "Autoridades · Cámara de Comercio · Expositores",
      topic: "Clausura ExpoJuy 2026 & Lanzamiento ExpoJuy 2027",
      cat: "Economía",
      bio: "Entrega de premios a los mejores stands, reconocimientos institucionales y anuncio de novedades para la próxima edición.",
    },
  ],
}

export default function Agenda({ setPage }: AgendaProps) {
  const [activeDay, setActiveDay] = useState(0)
  const [activeCategory, setActiveCategory] = useState("Todas")
  const [search, setSearch] = useState("")
  const [expandedBio, setExpandedBio] = useState<number | null>(null)

  const allCategories = [
    "Todas",
    "Economía",
    "Minería",
    "Tecnología",
    "Agro-Industria",
    "Energía",
    "B2B",
  ]

  const filtered = (schedule[activeDay] || []).filter((s) => {
    const matchCat = activeCategory === "Todas" || s.cat === activeCategory
    const matchSearch =
      s.speaker.toLowerCase().includes(search.toLowerCase()) ||
      s.topic.toLowerCase().includes(search.toLowerCase()) ||
      s.auditorium.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const generateICS = (s: Session) => {
    const dateStr = ["20261014", "20261015", "20261016", "20261017"][activeDay]
    const startTime = s.time.replace(":", "") + "00"
    const endTime = s.end.replace(":", "") + "00"
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${dateStr}T${startTime}`,
      `DTEND:${dateStr}T${endTime}`,
      `SUMMARY:${s.topic}`,
      `DESCRIPTION:${s.speaker} — ${s.role}`,
      `LOCATION:${s.auditorium} · Centro de Convenciones Jujuy`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")
    const blob = new Blob([ics], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `expojuy2026-${s.speaker.replace(/\s+/g, "-")}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="bg-[#0D2458] py-14 border-b border-navy-800">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <button
              onClick={() => setPage("home")}
              className="text-slate-400 hover:text-white text-sm mb-4 flex items-center gap-2 transition-colors"
            >
              ← Volver al inicio
            </button>
            <p className="text-xs font-semibold tracking-widest uppercase text-teal-400 mb-3">
              14 — 17 de Octubre 2026 · San Salvador de Jujuy
            </p>
            <h1 className="font-display text-4xl sm:text-5xl text-white">
              Programa Oficial
            </h1>
            <p className="text-slate-300 mt-3 max-w-2xl text-sm sm:text-base">
              4 días · 6 pabellones · +50 conferencias, paneles, rondas B2B y
              presentaciones. Explorá la agenda completa de ExpoJuy 2026.
            </p>
          </div>
          <div className="hidden md:flex items-center bg-navy-950/60 border border-white/10 rounded-xl px-5 py-3 shrink-0">
            <img
              src={expoJuyLogo}
              alt="ExpoJuy 2026"
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Control bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="max-w-[1440px] mx-auto px-8">
          {/* Day tabs */}
          <div className="flex border-b border-slate-100">
            {days.map((d, i) => (
              <button
                key={d.label}
                onClick={() => {
                  setActiveDay(i)
                  setExpandedBio(null)
                }}
                className={`flex flex-col items-center px-6 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                  activeDay === i
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span className="font-semibold">{d.label}</span>
                <span className="text-[11px] text-slate-400">{d.date}</span>
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
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
                placeholder="Buscar disertante o tema..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-teal-500 w-56"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    activeCategory === cat
                      ? "bg-navy-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-[1440px] mx-auto px-8 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <div className="text-4xl mb-3">📅</div>
            <p>No hay sesiones para los filtros seleccionados.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-slate-200 hidden md:block" />

            <div className="space-y-4">
              {filtered.map((session, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  {/* Time column */}
                  <div
                    className="shrink-0 text-right hidden md:block"
                    style={{ width: "72px" }}
                  >
                    <div className="text-sm font-bold text-navy-800 mt-4">
                      {session.time}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {session.end}
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="hidden md:flex shrink-0 flex-col items-center mt-5">
                    <div className="w-3 h-3 rounded-full bg-teal-500 ring-4 ring-teal-100 relative z-10" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white border border-slate-200 rounded-xl p-5 card-hover">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[11px] font-semibold px-3 py-1 rounded-full ${categoryColors[session.cat] || "bg-slate-100 text-slate-600"}`}
                        >
                          {session.cat}
                        </span>
                        <span className="text-xs text-slate-400 md:hidden">
                          {session.time} — {session.end}
                        </span>
                      </div>
                      <span className="text-xs text-teal-600 font-medium shrink-0">
                        {session.auditorium}
                      </span>
                    </div>

                    <h3 className="font-semibold text-slate-800 text-[15px] leading-snug mb-1">
                      {session.topic}
                    </h3>
                    <p className="text-sm font-medium text-navy-800">
                      {session.speaker}
                    </p>
                    <p className="text-xs text-slate-500 mb-3">
                      {session.role}
                    </p>

                    {/* Expandable bio */}
                    {expandedBio === idx && (
                      <div className="bg-slate-50 rounded-lg p-3 mb-3 text-xs text-slate-600 leading-relaxed border border-slate-100">
                        {session.bio}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 pt-1">
                      <button
                        onClick={() =>
                          setExpandedBio(expandedBio === idx ? null : idx)
                        }
                        className="text-xs font-medium text-slate-500 hover:text-navy-700 transition-colors"
                      >
                        {expandedBio === idx
                          ? "Ocultar bio ↑"
                          : "Ver bio del disertante ↓"}
                      </button>
                      <button
                        onClick={() => generateICS(session)}
                        className="text-xs font-semibold text-teal-600 hover:text-teal-500 flex items-center gap-1 transition-colors"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Agregar al Calendario (.ics)
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA block */}
        <div className="mt-14 bg-navy-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl text-white mb-1">
              Accedé a todas las sesiones en vivo
            </h3>
            <p className="text-slate-400 text-sm">
              Con el Pase Business B2B tenés acceso a todos los auditorios +
              rondas de negocios privadas.
            </p>
          </div>
          <button
            onClick={() => setPage("tickets")}
            className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-7 py-3 rounded-md text-sm transition-colors shrink-0"
          >
            Comprar Entradas →
          </button>
        </div>
      </div>
    </div>
  )
}
