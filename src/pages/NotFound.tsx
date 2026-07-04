import { Link } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-sm">
        <span className="text-8xl block mb-6 animate-bounce">🧭</span>
        <h1
          className="text-4xl font-extrabold tracking-tight mb-2"
          style={{ fontFamily: 'Space Grotesk' }}
        >
          404
        </h1>
        <h2 className="text-xl font-bold mb-4">Rota perdida!</h2>
        <p className="text-muted-foreground text-sm mb-8">
          Você se desviou do mapa da trilha de aprendizado. Vamos guiar você de volta.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all glow-green-sm"
        >
          <MoveLeft size={16} />
          Voltar ao Dashboard
        </Link>
      </div>
    </div>
  )
}
