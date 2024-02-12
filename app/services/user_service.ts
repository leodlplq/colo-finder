import User from '#models/user'
import { CreateUserPayload } from '../types/user_type.js'

export class UserService {
  async createUser(payload: CreateUserPayload) {
    return await User.create(payload)
  }
}
