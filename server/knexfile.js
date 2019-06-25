// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite",
    connection: {
      filename: ".tmp/data.db"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
