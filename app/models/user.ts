import { withAuthFinder } from '@adonisjs/auth'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, belongsTo, column, computed, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Roles from '../enums/roles.js'
import Coloring from './coloring.js'
import Role from './role.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstname: string | null

  @column()
  declare lastname: string | null

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare roleId: number

  @computed()
  get isAdmin() {
    return this.roleId === Roles.ADMIN
  }

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Coloring)
  declare submitted_colorings: HasMany<typeof Coloring>
}
