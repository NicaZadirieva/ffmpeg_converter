import { IStreamLogger } from './core/handlers/stream-logger.interface';
import { PromptService } from './core/prompt/prompt.service';
import ConsoleLogger from './out/console-logger/console-logger';

export class App {
    async run() {
        const res = await (new PromptService().input<number>('Число', 'number'));
        const streamLogger : IStreamLogger = ConsoleLogger.getInstance();
        streamLogger.log(`Введенное число: ${res}`);
        console.log(res);
    }
}

const app = new App();
app.run();