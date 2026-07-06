import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Loader2, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await requestPasswordReset(email)
    setLoading(false)
    if (error) {
      setError('Não foi possível enviar o e-mail. Tente novamente.')
    } else {
      setSent(true)
    }
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4">
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <div className="glass animate-fade-up relative w-full max-w-md p-8">
        {sent ? (
          <div className="text-center">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h1 className="font-display text-2xl font-bold">Verifique seu e-mail</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enviamos um link para redefinir sua senha para <strong>{email}</strong>.
            </p>
            <Button asChild className="btn-glow mt-6 h-11 w-full font-semibold">
              <Link to="/login">Voltar ao login</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <div className="btn-glow mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
                <Mail className="h-7 w-7 text-primary-foreground" />
              </div>
              <h1 className="font-display text-2xl font-bold">Esqueceu a senha?</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Digite seu e-mail e enviaremos um link para redefinir sua senha.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl bg-secondary/60"
                  placeholder="voce@adapta.org"
                />
              </div>
              {error && (
                <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </p>
              )}
              <Button type="submit" disabled={loading} className="btn-glow h-12 w-full font-bold">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Enviar link'}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Voltar ao login
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
