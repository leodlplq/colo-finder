import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
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

  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>

  @belongsTo(() => User)
  declare submitted_by: BelongsTo<typeof User>

  @manyToMany(() => Tag, {
    pivotTable: 'coloring_tag',
  })
  declare tags: ManyToMany<typeof Tag>
}
