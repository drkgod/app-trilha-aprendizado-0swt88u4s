import { useState } from 'react'
import { Mail, Loader2, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AccountEmail() {
  const { requestEmailChange } = useAuth()
  const [newEmail, setNewEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!newEmail.trim()) {
      setError('E-mail é obrigatório.')
      return
    }
    if (!newEmail.toLowerCase().endsWith('@adapta.org')) {
      setError('Apenas e-mails @adapta.org são permitidos.')
      return
    }
    setLoading(true)
    const { error } = await requestEmailChange(newEmail)
    setLoading(false)
    if (error) {
      setError('Não foi possível solicitar a troca de e-mail.')
    } else {
      setSent(true)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <span className="kicker">Conta</span>
        <h1 className="font-display mt-2 text-2xl font-bold sm:text-3xl">Trocar e-mail</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Digite seu novo e-mail corporativo. Enviaremos um link de confirmação.
        </p>
      </div>
      {sent ? (
        <div className="glass p-6 text-center">
          <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-500" />
          <h2 className="font-display text-xl font-bold">Confirmação enviada!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enviamos um link de confirmação para <strong>{newEmail}</strong>. Você precisará
            confirmar com sua senha atual.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass space-y-4 p-6">
          <div className="space-y-2">
            <Label
              htmlFor="newEmail"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Novo e-mail
            </Label>
            <Input
              id="newEmail"
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="h-12 rounded-xl bg-secondary/60"
              placeholder="novo@adapta.org"
            />
          </div>
          {error && (
            <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" disabled={loading} className="btn-glow h-12 w-full font-bold">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Enviar confirmação'}
          </Button>
        </form>
      )}
    </div>
  )
}
