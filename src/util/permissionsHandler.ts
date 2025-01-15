import { type Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }): boolean => {
  if (!user) {
    return false
  }

  return Boolean(user.permissions === 'admin')
}
