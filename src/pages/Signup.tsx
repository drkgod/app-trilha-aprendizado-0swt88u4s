import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Zap, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { extractFieldErrors, getErrorMessage, type FieldErrors } from '@/lib/pocketbase/errors'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [generalError, setGeneralError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = (): boolean => {
    const errors: FieldErrors = {}
    if (!name.trim()) errors.name = 'Nome é obrigatório.'
    if (!email.trim()) errors.email = 'E-mail é obrigatório.'
    else if (!email.toLowerCase().endsWith('@adapta.org'))
      errors.email = 'Apenas e-mails @adapta.org são permitidos.'
    if (!password) errors.password = 'Senha é obrigatória.'
    else if (password.length < 8) errors.password = 'A senha deve ter no mínimo 8 caracteres.'
    if (!confirmPassword) errors.confirmPassword = 'Confirme sua senha.'
    else if (password !== confirmPassword) errors.confirmPassword = 'As senhas não coincidem.'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError('')
    setFieldErrors({})
    if (!validate()) return
    setLoading(true)
    const { error } = await signUp(name, email, password)
    if (error) {
      const fe = extractFieldErrors(error)
      if (Object.keys(fe).length > 0) setFieldErrors(fe)
      else setGeneralError(getErrorMessage(error))
      setLoading(false)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4">
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <div className="animate-fade-up relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="btn-glow mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <Zap className="h-8 w-8 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
            Criar sua <span className="text-primary text-glow">conta</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Acesso exclusivo para membros do time Adapta.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="glass space-y-4 p-6 sm:p-8">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Nome
            </Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl bg-secondary/60"
              placeholder="Seu nome"
            />
            {fieldErrors.name && <p className="text-sm text-destructive">{fieldErrors.name}</p>}
          </div>
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
            {fieldErrors.email && <p className="text-sm text-destructive">{fieldErrors.email}</p>}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl bg-secondary/60"
              placeholder="••••••••"
            />
            {fieldErrors.password && (
              <p className="text-sm text-destructive">{fieldErrors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Confirmar senha
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 rounded-xl bg-secondary/60"
              placeholder="••••••••"
            />
            {fieldErrors.confirmPassword && (
              <p className="text-sm text-destructive">{fieldErrors.confirmPassword}</p>
            )}
          </div>
          {generalError && (
            <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {generalError}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="btn-glow h-12 w-full text-base font-bold"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Criar conta'}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Já tem conta?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
