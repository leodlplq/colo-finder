import Book from '#models/book'
import { ColoringService } from '#services/coloring_service'
import { coloringImageValidation, storeColoringValidation } from '#validators/coloring'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ColoringsController {
  constructor(protected coloringService: ColoringService) {}
  async add({ view }: HttpContext) {
    const books = await Book.all()
    const formattedBooks = books.reverse().map((book) => ({
      title: book.name,
      value: book.id,
      disabled: false,
    }))
    return view.render('pages/submit-coloring', {
      books: [
        { title: 'Pas de livre', value: null, disabled: true, selected: true },
        ...formattedBooks,
      ],
    })
  }

  async submit({ request, response, auth }: HttpContext) {
    const data = request.all()
    const user = auth?.user

    if (!user) {
      return response.abort('No user')
    }

    const { number, book_id: bookId } = await storeColoringValidation.validate(data)
    const { image } = await request.validateUsing(coloringImageValidation)

    this.coloringService.createColoring({ number, bookId, image, userId: user.id })

    return response.redirect().toRoute('home')
  }
}
