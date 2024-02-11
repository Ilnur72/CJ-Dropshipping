export interface IConfig {
  port: number;
  db: IDatabaseConfig;
  admin: IAdminConfig;
  rabbitOption: IRabbitMQConfig;
}

export interface IDatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}

export interface IAdminConfig {
  email: string;
  password: string;
}

export interface IRabbitMQConfig {
  urls: string[];
  queue: string;
  noAck: boolean;
  // prefetchCount: number;
}

export default (): IConfig => ({
  port: parseInt(process.env.PORT, 10),
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
  rabbitOption: {
    urls: [`amqp://${process.env.MQ_HOST}:${process.env.MQ_PORT}`],
    queue: 'cjdropshipping_queue',
    noAck: false,
  },
});
