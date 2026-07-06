import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { Loader2, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ConfirmEmailChange() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const navigate = useNavigate()
  const { confirmEmailChange } = useAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!password) {
      setError('Senha é obrigatória.')
      return
    }
    setLoading(true)
    const { error } = await confirmEmailChange(token, password)
    setLoading(false)
    if (error) {
      setError('Não foi possível confirmar a troca. Verifique sua senha.')
    } else {
      navigate('/login')
    }
  }

  if (!token) {
    return (
      <div className="relative flex min-h-dvh items-center justify-center px-4">
        <div className="glass w-full max-w-md p-8 text-center">
          <p className="text-sm text-muted-foreground">Token não fornecido.</p>
          <Button asChild className="mt-4 h-11 w-full font-semibold">
            <Link to="/login">Voltar ao login</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4">
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <div className="glass animate-fade-up relative w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <div className="btn-glow mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <ShieldCheck className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold">Confirmar novo e-mail</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Digite sua senha atual para confirmar a troca de e-mail.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Senha atual
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl bg-secondary/60"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" disabled={loading} className="btn-glow h-12 w-full font-bold">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Confirmar troca'}
          </Button>
        </form>
      </div>
    </div>
  )
}
