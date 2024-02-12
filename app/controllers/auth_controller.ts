import { UserService } from '#services/user_service'
import { registerValidation } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
  constructor(protected userService: UserService) {}

  async register({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await registerValidation.validate(data)

    const user = this.userService.createUser(payload)
    return response.redirect().toRoute('show.login')
  }

  async showRegister({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async showLogin({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
