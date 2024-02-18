import vine from '@vinejs/vine'

export const storeBookValidation = vine.compile(
  vine.object({
    name: vine.string().trim(),
    release_date: vine.date(),
  })
)

export const storeBookCoverValidation = vine.compile(
  vine.object({
    cover: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png'],
    }),
  })
)

export const updateBookValidation = vine.compile(
  vine.object({
    name: vine.string().trim(),
    release_date: vine.date(),
  })
)

export const updateBookCoverValidation = vine.compile(
  vine.object({
    cover: vine
      .file({
        size: '2mb',
        extnames: ['jpg', 'png'],
      })
      .optional(),
  })
)
