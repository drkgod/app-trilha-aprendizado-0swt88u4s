import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getUsers, createUser, deleteUser } from '@/services/users'
import { Loader2, Plus, Trash2, Shield, User, Mail, Lock } from 'lucide-react'
import { Navigate } from 'react-router-dom'

export default function Admin() {
  const { isAdmin, user } = useAuth()
  const [usersList, setUsersList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!isAdmin) return <Navigate to="/" replace />

  const loadUsers = async () => {
    setLoading(true)
    try {
      const list = await getUsers()
      setUsersList(list)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setCreating(true)
    try {
      await createUser(email, password, name)
      setSuccess(`Consultor ${name} criado com sucesso!`)
      setName('')
      setEmail('')
      setPassword('')
      loadUsers()
    } catch (err: any) {
      setError(err.message || 'Erro ao criar consultor')
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteUser = async (id: string, userName: string) => {
    if (id === user.id) {
      alert('Você não pode excluir seu próprio usuário admin.')
      return
    }
    if (!confirm(`Deseja mesmo excluir o consultor ${userName}?`)) return
    try {
      await deleteUser(id)
      loadUsers()
    } catch (err: any) {
      alert(err.message || 'Erro ao excluir consultor')
    }
  }

  return (
    <div className="space-y-8 animate-fade-in-up pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
          <Shield className="text-amber-400" /> Painel do Administrador
        </h1>
        <p className="text-muted-foreground mt-1">Crie contas de consultores e gerencie acessos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Consultant Form */}
        <div className="glass-card p-6 h-fit lg:col-span-1">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Plus size={18} className="text-primary" />
            Adicionar Consultor
          </h2>

          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground uppercase tracking-wider">
                Nome do Consultor
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome Completo"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground uppercase tracking-wider">
                E-mail
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="consultor@empresa.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground uppercase tracking-wider">
                Senha Provisória
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 caracteres"
                  required
                  minLength={8}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 text-xs rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 text-xs rounded-lg bg-primary/10 border border-primary/20 text-primary">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={creating}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/95 flex items-center justify-center gap-2"
            >
              {creating ? <Loader2 size={16} className="animate-spin" /> : null}
              {creating ? 'Adicionando...' : 'Adicionar'}
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className="glass-card p-6 lg:col-span-2">
          <h2 className="text-lg font-bold mb-4">Consultores Cadastrados</h2>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-primary w-6 h-6" />
            </div>
          ) : usersList.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhum consultor cadastrado
            </p>
          ) : (
            <div className="divide-y divide-border/50">
              {usersList.map((u) => (
                <div
                  key={u.id}
                  className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{u.name || 'Sem nome'}</span>
                      {u.role === 'admin' && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                          Admin
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{u.email}</span>
                  </div>

                  <button
                    onClick={() => handleDeleteUser(u.id, u.name)}
                    disabled={u.id === user.id}
                    className="p-2 rounded-xl text-muted-foreground hover:text-red-400 hover:bg-red-500/5 transition-all disabled:opacity-40 disabled:hover:bg-transparent"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
