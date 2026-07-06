import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Zap, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: signInError } = await signIn(email, password)
      if (signInError) {
        setError('E-mail ou senha inválidos. Verifique suas credenciais.')
        return
      }
      navigate('/')
    } catch {
      setError('Não foi possível entrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4">
      <div className="grid-fade pointer-events-none absolute inset-0" />

      <div className="animate-fade-up relative w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="btn-glow mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <Zap className="h-8 w-8 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="kicker justify-center">Programa exclusivo de consultores</span>
          <h1 className="font-display mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Domine a era dos <span className="text-primary text-glow">agentes de IA</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            7 trilhas, 143 etapas, bosses para derrotar. Claude Code, Codex, GitHub, Supabase e
            projetos reais de consultoria.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass space-y-5 p-6 sm:p-8">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="voce@consultoria.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl bg-secondary/60"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl bg-secondary/60"
            />
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Esqueci a senha
              </Link>
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="btn-glow h-12 w-full text-base font-bold"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Entrar na trilha'}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Não tem conta?{' '}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              Criar conta
            </Link>
          </p>
          <p className="text-center text-xs text-muted-foreground">
            Acesso restrito. Fale com o administrador para receber suas credenciais.
          </p>
        </form>
      </div>
    </div>
  )
}
