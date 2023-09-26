module.exports = {
    type: 'oracle',
    host: 'localhost', // Endereço do seu servidor Oracle
    port: 8080, // Porta do seu servidor Oracle
    username: 'sankhya',
    password: 't363fir8',
    database: 'APEX_TEST',
    synchronize: true, // Defina como true apenas em desenvolvimento
    logging: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    subscribers: [__dirname + '/subscribers/**/*{.ts,.js}'],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations',
      subscribersDir: 'src/subscribers',
    },
  };
  