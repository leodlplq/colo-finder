import Book from '#models/book'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'

interface StoreColoringPayload {
  number: number
  bookId: string
  userId: number
  image: MultipartFile
}

export class ColoringService {
  async createColoring(payload: StoreColoringPayload) {
    const { number, bookId, image, userId } = payload
    const book = await Book.findOrFail(bookId)

    if (image) {
      await image.move(app.makePath('uploads/colorings'), { name: `${cuid()}.${image.extname}` })
    }

    await book?.related('colorings').create({
      number,
      image_url: image.fileName,
      validated: false,
      submittedBy: userId,
    })
  }
}
