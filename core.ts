import { Client, Collection, GatewayIntents, serve } from "./deps.ts";
import { Command, Event } from "./types/mod.ts";
import GetCommands from "./commands/mod.ts";
import GetEvents from "./events/mod.ts";
import env from "./utils/config.ts";
import server from "./utils/server.ts";

class ExtendedClient extends Client {
	public commands: Collection<string, Command> = new Collection();
	public events: Collection<string, Event> = new Collection();
	public env = env;

	public async init() {
		this.connect(this.env.BOT_TOKEN, [
			GatewayIntents.DIRECT_MESSAGES,
			GatewayIntents.GUILDS,
			GatewayIntents.GUILD_MESSAGES,
		]);

		GetCommands(this);
		GetEvents(this);

		await serve(server, { port: Number(env.SERVER_PORT) });
	}
}

export default ExtendedClient;
