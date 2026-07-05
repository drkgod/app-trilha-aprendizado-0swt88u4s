import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <span className="kicker">Erro 404</span>
      <h1 className="font-display mt-4 text-5xl font-bold">
        Etapa <span className="text-primary text-glow">não encontrada</span>
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Esse caminho não existe no mapa. Volte para a trilha e continue a jornada.
      </p>
      <Button asChild className="btn-glow mt-8 h-12 px-8 font-bold">
        <Link to="/">Voltar ao início</Link>
      </Button>
    </div>
  )
}
