import Book from '#models/book'
import app from '@adonisjs/core/services/app'
import * as fs from 'node:fs'

export class BookService {
  deleteBookCover(book: Book) {
    fs.unlink(process.cwd() + app.makePath(book.cover), (err) => {
      err ? console.log(err) : console.log('File is deleted')
    })
  }

  deleteBook(book: Book) {
    this.deleteBookCover(book)
    book.delete()
  }
}
