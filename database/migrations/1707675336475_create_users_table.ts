import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles from '../../app/enums/roles.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('firstname').nullable()
      table.string('lastname').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.integer('role_id').unsigned().references('roles.id').defaultTo(Roles.USER)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
