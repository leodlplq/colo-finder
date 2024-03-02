import { BaseModel, column, computed, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Coloring from './coloring.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare image_url: string | null

  @computed()
  get cover() {
    return this.image_url ? '/uploads/' + this.image_url : 'none'
  }

  @hasMany(() => Coloring)
  declare colorings: HasMany<typeof Coloring>

  @column.date()
  declare release_date: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
