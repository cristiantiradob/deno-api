import { Application } from 'https://deno.land/x/oak@14.2.0/mod.ts';

export default class Server {
	port: number;
	app: Application<Record<string, number>>;

	constructor() {
		this.port = parseInt(Deno.env.get('PORT') || '8000');

		this.app = new Application();

		this.middlewares();
	}

	middlewares() {
		this.app.use((ctx) => {
			ctx.response.body = 'Hello CFW!';
		});
	}

	async listen() {
		this.app.addEventListener('listen', ({ hostname, port, secure }) => {
			console.log(
				`Listening on: ${secure ? 'https://' : 'http://'}${
					hostname ?? 'localhost'
				}:${port}`,
			);
		});

		await this.app.listen({
			port: this.port,
		});
	}
}
