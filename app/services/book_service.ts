import Book from '#models/book'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import { DateTime } from 'luxon'
import * as fs from 'node:fs'

interface UpdateBookPayload {
  name: string
  releaseDate: Date
  cover: MultipartFile | null | undefined
}

export class BookService {
  deleteBookCover(book: Book) {
    fs.unlink(process.cwd() + app.makePath(book.cover), (err) => {
      err ? console.log(err) : console.log('File is deleted')
    })
  }

  async updateBook(payload: UpdateBookPayload, book: Book) {
    const { name, releaseDate, cover } = payload
    book.name = name
    book.release_date = DateTime.fromJSDate(releaseDate)

    if (cover) {
      this.deleteBookCover(book)
      await cover.move(app.makePath('uploads'), { name: `${cuid()}.${cover.extname}` })
      book.image_url = cover?.fileName || book.image_url
    }

    book.save()
  }

  deleteBook(book: Book) {
    this.deleteBookCover(book)
    book.delete()
  }
}
