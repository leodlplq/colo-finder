import Book from '#models/book'
import { storeBookCoverValidation, storeBookValidation } from '#validators/book'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class BooksController {
  async index({ view }: HttpContext) {
    const books = await Book.all()
    const reversedBooks = books.toReversed()
    return view.render('pages/admin/books/index', { books: reversedBooks })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/admin/books/create')
  }

  async store({ request, response }: HttpContext) {
    const data = request.all()
    const { name, release_date: releaseDate } = await storeBookValidation.validate(data)
    const { cover } = await request.validateUsing(storeBookCoverValidation)

    if (cover) {
      await cover.move(app.makePath('uploads'), { name: `${cuid()}.${cover.extname}` })
    }

    Book.create({
      name,
      release_date: releaseDate,
      image_url: cover.fileName,
    })

    return response.redirect().toRoute('books.index')
  }

  async show({ view, params }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    return view.render('pages/admin/books/show', { book })
  }

  async edit({ view, params }: HttpContext) {
    return view.render('pages/admin/books/edit')
  }

  async update({ params, request }: HttpContext) {}

  async destroy({ params }: HttpContext) {}
}
