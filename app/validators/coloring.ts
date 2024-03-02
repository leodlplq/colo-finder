import vine from '@vinejs/vine'

export const storeColoringValidation = vine.compile(
  vine.object({
    number: vine.number(),
    book_id: vine.string().exists(async (db, value, field) => {
      const book = await db.from('books').where('id', value).first()
      return !!book
    }),
  })
)

export const coloringImageValidation = vine.compile(
  vine.object({
    image: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png'],
    }),
  })
)
