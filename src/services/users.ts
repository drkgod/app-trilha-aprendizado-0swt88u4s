import pb from '@/lib/pocketbase/client'

export const getUsers = () => pb.collection('users').getFullList({ sort: 'name' })

export const createUser = (email: string, password: string, name: string) =>
  pb.collection('users').create({
    email,
    password,
    passwordConfirm: password,
    name,
    role: 'consultant',
    emailVisibility: true,
    verified: true,
  })

export const deleteUser = (id: string) => pb.collection('users').delete(id)
