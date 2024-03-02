import { BaseModel, belongsTo, column, computed, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Book from './book.js'
import Tag from './tag.js'
import User from './user.js'

export default class Coloring extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare number: number

  @column()
  declare image_url: string

  @column()
  declare validated: boolean

  @computed()
  get image() {
    return '/uploads/colorings' + this.image_url
  }

  @belongsTo(() => Book, { localKey: 'bookId' })
  declare book: BelongsTo<typeof Book>

  @column()
  declare bookId: number

  @belongsTo(() => User, { localKey: 'submittedBy' })
  declare user: BelongsTo<typeof User>

  @column()
  declare submittedBy: number

  @manyToMany(() => Tag, {
    pivotTable: 'coloring_tag',
  })
  declare tags: ManyToMany<typeof Tag>
}
