import { SequelizeOptions } from 'sequelize-typescript'

export default {
  dialect: 'sqlite',
  storage: './__tests__/database.sqlite',
  dialectOptions: {
    charset: 'utf8',
    multipleStatements: true
  },
  define: {
    timestamps: true,
    underscored: true, // table name snake case
    underscoredAll: true // table camps name snake case
  },
  logging: false
} as SequelizeOptions
