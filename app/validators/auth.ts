import vine from '@vinejs/vine'

export const registerValidation = vine.compile(
  vine.object({
    firstname: vine.string().trim().minLength(2),
    lastname: vine.string().trim().minLength(2),
    email: vine
      .string()
      .email()
      .unique(async (db, value, field) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(6),
  })
)

export const loginValidation = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
