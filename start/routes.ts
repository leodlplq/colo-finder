/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const SessionController = () => import('#controllers/session_controller')
const AdminController = () => import('#controllers/admin_controller')
const BooksController = () => import('#controllers/books_controller')
import { middleware } from '#start/kernel'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'

router
  .get('/', async (ctx) => {
    return ctx.view.render('pages/home')
  })
  .as('home')

router.get('/login', [AuthController, 'showLogin']).as('show.login')
router.post('/login', [SessionController, 'store']).as('do.login')
router.get('/register', [AuthController, 'showRegister']).as('show.register')
router.post('/register', [AuthController, 'register']).as('do.register')
router.post('/logout', [AuthController, 'logout']).use(middleware.auth()).as('do.logout')

router
  .group(() => {
    router.get('/', [AdminController, 'index']).as('show.admin')
    router.resource('books', BooksController).as('books')
  })
  .prefix('/admin')
  .middleware([middleware.auth(), middleware.admin()])

router.get('uploads/:filename', async ({ response, params }: HttpContext) => {
  return response.download(app.makePath('uploads', params.filename))
})
