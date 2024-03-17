export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    url:
      process.env.DATABASE_URL ||
      'postgres://hsfhwnmf:QpyqNRJyffQJ_jw1GE0LgkkmpbXspoQb@rosie.db.elephantsql.com/hsfhwnmf',
  },
});
