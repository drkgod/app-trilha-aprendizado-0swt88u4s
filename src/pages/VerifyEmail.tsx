import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import pb from '@/lib/pocketbase/client'

export default function VerifyEmail() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Token não fornecido.')
      return
    }
    pb.collection('users')
      .confirmVerification(token)
      .then(() => {
        setStatus('success')
        setMessage('Seu e-mail foi verificado com sucesso!')
      })
      .catch(() => {
        setStatus('error')
        setMessage('Não foi possível verificar o e-mail. O token pode ter expirado.')
      })
  }, [token])

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4">
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <div className="glass animate-fade-up relative w-full max-w-md p-8 text-center">
        {status === 'loading' && (
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
        )}
        {status === 'success' && (
          <>
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h1 className="font-display text-2xl font-bold">E-mail verificado!</h1>
            <p className="mt-2 text-sm text-muted-foreground">{message}</p>
            <Button asChild className="btn-glow mt-6 h-11 w-full font-semibold">
              <Link to="/login">Ir para o login</Link>
            </Button>
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle className="mx-auto mb-4 h-16 w-16 text-destructive" />
            <h1 className="font-display text-2xl font-bold">Ops!</h1>
            <p className="mt-2 text-sm text-muted-foreground">{message}</p>
            <Button asChild className="btn-glow mt-6 h-11 w-full font-semibold">
              <Link to="/login">Voltar ao login</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
