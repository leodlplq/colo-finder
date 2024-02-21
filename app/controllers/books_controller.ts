import Book from '#models/book'
import { BookService } from '#services/book_service'
import {
  storeBookCoverValidation,
  storeBookValidation,
  updateBookCoverValidation,
  updateBookValidation,
} from '#validators/book'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { DateTime } from 'luxon'

@inject()
export default class BooksController {
  constructor(protected bookService: BookService) {}

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
      release_date: DateTime.fromJSDate(releaseDate),
      image_url: cover.fileName,
    })

    return response.redirect().toRoute('books.index')
  }

  async show({ view, params }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    return view.render('pages/admin/books/show', { book })
  }

  async edit({ view, params }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    return view.render('pages/admin/books/edit', { book })
  }

  async update({ params, request, response }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    const data = request.all()
    const { name, release_date: releaseDate } = await updateBookValidation.validate(data)
    const { cover } = await request.validateUsing(updateBookCoverValidation)

    book.name = name
    book.release_date = DateTime.fromJSDate(releaseDate)

    if (cover) {
      await cover.move(app.makePath('uploads'), { name: `${cuid()}.${cover.extname}` })
      book.image_url = cover?.fileName || book.image_url
    }

    book.save()

    return response.redirect().toRoute('books.index')
  }

  async destroy({ params, response }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    this.bookService.deleteBook(book)

    return response.redirect().toRoute('books.index')
  }
}
