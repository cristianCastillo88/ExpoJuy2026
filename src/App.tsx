import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Agenda from "./pages/Agenda"
import Tickets from "./pages/Tickets"
import type { Page } from "./types"

export default function App() {
  const [page, setPage] = useState<Page>("home")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  return (
    <div className="min-h-full flex flex-col">
      <Navbar currentPage={page} setPage={setPage} />
      <main className="flex-1">
        {page === "home" && <Home setPage={setPage} />}
        {page === "agenda" && <Agenda setPage={setPage} />}
        {page === "tickets" && <Tickets setPage={setPage} />}
      </main>
      <Footer setPage={setPage} />
    </div>
  )
}
