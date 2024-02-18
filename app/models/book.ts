import { BaseModel, column, computed } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

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

  @column.date()
  declare release_date: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
