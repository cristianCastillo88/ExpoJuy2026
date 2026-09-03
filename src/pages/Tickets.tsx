import { useState } from "react"
import expoJuyLogo from "@/imports/expojuy26_horizontal.png"
import expoJuyIsotipo from "@/imports/expojuy26_isologotipo.png"
import type { Page } from "@/types"

interface TicketsProps {
  setPage: (page: Page) => void
}

type TicketType = "general" | "student" | "business" | null

const ticketOptions = [
  {
    id: "general" as TicketType,
    name: "Pase General",
    price: 5000,
    badge: null,
    color: "border-slate-200",
    activeColor: "border-teal-500 ring-2 ring-teal-200",
    features: [
      "Acceso a todos los pabellones",
      "Entrada a conferencias abiertas",
      "Mapa digital del predio",
      "Programa oficial impreso",
    ],
    note: null,
  },
  {
    id: "student" as TicketType,
    name: "Pase Estudiante",
    price: 2500,
    badge: "50% OFF",
    color: "border-slate-200",
    activeColor: "border-amber-500 ring-2 ring-amber-200",
    features: [
      "Acceso a todos los pabellones",
      "Entrada a conferencias abiertas",
      "Mapa digital del predio",
      "Requiere credencial estudiantil vigente",
    ],
    note: "Válido con DNI + credencial universitaria o terciaria vigente. Se verifica en el ingreso.",
  },
  {
    id: "business" as TicketType,
    name: "Pase Business B2B",
    price: 12000,
    badge: "Recomendado",
    color: "border-navy-700",
    activeColor: "border-navy-900 ring-2 ring-navy-200",
    features: [
      "Todo lo incluido en Pase General",
      "Salón Ejecutivo privado",
      "Agenda B2B pre-agendada (4 días)",
      "Directorio digital de contactos",
      "Kit ejecutivo + bolsa de bienvenida",
      "Acceso preferencial a todos los auditorios",
    ],
    note: null,
  },
]

interface FormData {
  name: string
  email: string
  dni: string
  company: string
  phone: string
}

export default function Tickets({ setPage }: TicketsProps) {
  const [step, setStep] = useState(1)
  const [selectedTicket, setSelectedTicket] = useState<TicketType>(null)
  const [quantity, setQuantity] = useState(1)
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    dni: "",
    company: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [agreed, setAgreed] = useState(false)

  const selected = ticketOptions.find((t) => t.id === selectedTicket)
  const subtotal = selected ? selected.price * quantity : 0
  const fee = Math.round(subtotal * 0.04)
  const total = subtotal + fee

  const formatARS = (n: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(n)

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = "Nombre requerido"
    if (!form.email.includes("@")) e.email = "Email inválido"
    if (!form.dni.trim() || form.dni.length < 7) e.dni = "DNI/CUIT inválido"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === 1 && !selectedTicket) return
    if (step === 2 && !validate()) return
    setStep((s) => Math.min(s + 1, 3))
  }

  const steps = ["Elegí tu Entrada", "Datos del Asistente", "Pago"]

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#0D2458] py-12 border-b border-navy-800">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <button
              onClick={() => setPage("home")}
              className="text-slate-400 hover:text-white text-sm mb-4 flex items-center gap-2 transition-colors"
            >
              ← Volver al inicio
            </button>
            <h1 className="font-display text-4xl text-white">
              Comprá tu Entrada
            </h1>
            <p className="text-slate-300 mt-2 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              14 — 17 de Octubre 2026 · Centro de Convenciones Jujuy
            </p>
          </div>
          <div className="hidden md:flex items-center bg-navy-950/60 border border-white/10 rounded-xl px-5 py-3">
            <img
              src={expoJuyLogo}
              alt="ExpoJuy 2026"
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-20">
        <div className="max-w-[1440px] mx-auto px-8 py-4">
          <div className="flex items-center gap-0">
            {steps.map((label, i) => {
              const num = i + 1
              const done = step > num
              const active = step === num
              return (
                <div key={label} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        done
                          ? "bg-teal-600 text-white"
                          : active
                            ? "bg-navy-900 text-white"
                            : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {done ? (
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        num
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium hidden sm:block ${
                        active
                          ? "text-navy-900"
                          : done
                            ? "text-teal-600"
                            : "text-slate-400"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`h-px w-10 sm:w-16 mx-3 ${
                        done ? "bg-teal-400" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Step 1: Ticket selection */}
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl text-navy-900 mb-6">
                  Seleccioná tu tipo de acceso
                </h2>
                <div className="space-y-4">
                  {ticketOptions.map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket.id)}
                      className={`w-full text-left border-2 rounded-xl p-6 transition-all ${
                        selectedTicket === ticket.id
                          ? ticket.activeColor
                          : ticket.color + " hover:border-slate-300"
                      } bg-white`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                              selectedTicket === ticket.id
                                ? "border-teal-500"
                                : "border-slate-300"
                            }`}
                          >
                            {selectedTicket === ticket.id && (
                              <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800">
                                {ticket.name}
                              </span>
                              {ticket.badge && (
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    ticket.badge === "Recomendado"
                                      ? "bg-navy-900 text-teal-400"
                                      : "bg-amber-100 text-amber-700"
                                  }`}
                                >
                                  {ticket.badge}
                                </span>
                              )}
                            </div>
                            <div className="font-display text-2xl text-teal-600 mt-0.5">
                              {formatARS(ticket.price)}
                              <span className="text-xs font-body text-slate-400 ml-1">
                                / persona
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-1.5 ml-8">
                        {ticket.features.map((f) => (
                          <li
                            key={f}
                            className="text-xs text-slate-600 flex items-start gap-2"
                          >
                            <svg
                              className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                      {ticket.note && (
                        <p className="text-[11px] text-amber-600 bg-amber-50 rounded-lg p-2 mt-3 ml-8">
                          ⚠ {ticket.note}
                        </p>
                      )}
                    </button>
                  ))}
                </div>

                {/* Quantity */}
                {selectedTicket && (
                  <div className="mt-6 flex items-center gap-4">
                    <label className="text-sm font-medium text-slate-700">
                      Cantidad de entradas:
                    </label>
                    <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 text-sm font-semibold text-slate-800 border-x border-slate-300">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                        className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-slate-400">
                      Máximo 10 por transacción
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Attendee data */}
            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl text-navy-900 mb-6">
                  Datos del asistente principal
                </h2>
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Nombre y Apellido *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="María García López"
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 ${
                          errors.name ? "border-red-400" : "border-slate-300"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="maria@empresa.com.ar"
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 ${
                          errors.email ? "border-red-400" : "border-slate-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        DNI / CUIT *
                      </label>
                      <input
                        type="text"
                        value={form.dni}
                        onChange={(e) =>
                          setForm({ ...form, dni: e.target.value })
                        }
                        placeholder="30.456.789"
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 ${
                          errors.dni ? "border-red-400" : "border-slate-300"
                        }`}
                      />
                      {errors.dni && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.dni}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="+54 388 400-0000"
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Empresa / Institución{" "}
                      {selectedTicket === "business" && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="Empresa S.A. / Universidad Nacional de Jujuy"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <button
                      onClick={() => setAgreed(!agreed)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        agreed
                          ? "bg-teal-600 border-teal-600"
                          : "border-slate-300"
                      }`}
                    >
                      {agreed && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Acepto los{" "}
                      <span className="text-teal-600 underline cursor-pointer">
                        Términos y Condiciones
                      </span>{" "}
                      de ExpoJuy 2026 y autorizo el tratamiento de mis datos
                      personales conforme a la Ley 25.326 de Protección de Datos
                      Personales.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl text-navy-900 mb-6">
                  Confirmación de pedido
                </h2>

                {/* Summary card */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 mb-5">
                  <h3 className="font-semibold text-slate-700 text-sm mb-4">
                    Detalle del pedido
                  </h3>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <div>
                      <div className="font-semibold text-slate-800">
                        {selected?.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        ExpoJuy 2026 · {quantity}{" "}
                        {quantity === 1 ? "entrada" : "entradas"}
                      </div>
                    </div>
                    <div className="font-semibold text-slate-800">
                      {formatARS(subtotal)}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 py-2">
                    <span>Cargo por servicio (4%)</span>
                    <span>{formatARS(fee)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-navy-900 pt-2 border-t border-slate-200">
                    <span>Total</span>
                    <span className="font-display text-xl">
                      {formatARS(total)}
                    </span>
                  </div>
                </div>

                {/* Attendee data review */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-5">
                  <h3 className="font-semibold text-slate-700 text-sm mb-3">
                    Datos del asistente
                  </h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-slate-400">Nombre</span>
                    <span className="text-slate-800 font-medium">
                      {form.name}
                    </span>
                    <span className="text-slate-400">Email</span>
                    <span className="text-slate-800">{form.email}</span>
                    <span className="text-slate-400">DNI / CUIT</span>
                    <span className="text-slate-800">{form.dni}</span>
                    {form.company && (
                      <>
                        <span className="text-slate-400">Empresa</span>
                        <span className="text-slate-800">{form.company}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* MP Button */}
                <button className="w-full bg-[#009EE3] hover:bg-[#0087C2] text-white font-bold py-4 rounded-xl text-base transition-colors flex items-center justify-center gap-3">
                  <svg viewBox="0 0 48 48" className="w-6 h-6 fill-white">
                    <path d="M24 4C12.96 4 4 12.96 4 24s8.96 20 20 20 20-8.96 20-20S35.04 4 24 4zm-2 28h-4V20h4v12zm8 0h-4V20h4v12z" />
                  </svg>
                  Pagar con Mercado Pago · {formatARS(total)}
                </button>
                <p className="text-center text-xs text-slate-400 mt-3">
                  Pago seguro procesado por Mercado Pago. Aceptamos crédito,
                  débito y billeteras digitales.
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={() =>
                  step > 1 ? setStep((s) => s - 1) : setPage("home")
                }
                className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors"
              >
                ← {step > 1 ? "Paso anterior" : "Volver"}
              </button>
              {step < 3 && (
                <button
                  onClick={handleNext}
                  disabled={step === 1 && !selectedTicket}
                  className={`bg-navy-900 hover:bg-navy-700 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-colors ${
                    step === 1 && !selectedTicket
                      ? "opacity-40 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Continuar →
                </button>
              )}
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-36">
              <h3 className="font-semibold text-slate-800 mb-5">
                Resumen de Orden
              </h3>

              {/* Event info */}
              <div className="bg-[#0D2458] rounded-xl p-4 mb-5 border border-navy-800 flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-lg p-1.5 shrink-0 flex items-center justify-center border border-white/20">
                  <img
                    src={expoJuyIsotipo}
                    alt="ExpoJuy 2026"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-display text-base font-bold text-white leading-tight">
                    ExpoJuy 2026
                  </div>
                  <div className="text-[11px] text-teal-400 font-medium">
                    14 — 17 Octubre · Jujuy
                  </div>
                  <div className="text-[10px] text-slate-300">
                    Centro de Convenciones
                  </div>
                </div>
              </div>

              {selectedTicket ? (
                <>
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{selected?.name}</span>
                      <span className="font-medium text-slate-800">
                        {formatARS(selected?.price || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cantidad</span>
                      <span className="font-medium text-slate-800">
                        × {quantity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-medium text-slate-800">
                        {formatARS(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cargo de servicio</span>
                      <span className="font-medium text-slate-800">
                        {formatARS(fee)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-slate-200">
                    <span className="font-bold text-slate-800">Total</span>
                    <span className="font-display text-2xl text-navy-900">
                      {formatARS(total)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 text-slate-400 text-sm">
                  Seleccioná tu tipo de entrada para ver el resumen.
                </div>
              )}

              {/* Trust badges */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                {[
                  { icon: "🔒", text: "Pago 100% seguro con Mercado Pago" },
                  {
                    icon: "📧",
                    text: "Entradas enviadas por email en minutos",
                  },
                  {
                    icon: "↩",
                    text: "Reembolso hasta 7 días antes del evento",
                  },
                ].map((b) => (
                  <div
                    key={b.text}
                    className="flex items-start gap-2 text-xs text-slate-500"
                  >
                    <span>{b.icon}</span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
