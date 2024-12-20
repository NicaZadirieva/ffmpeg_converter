import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../executor/command.executor';
import { FileService } from '../../files/file.service';
import { IStreamLogger } from '../../handlers/stream-logger.interface';
import { StreamHandler } from '../../handlers/stream.handler';
import { PromptService } from '../../prompt/prompt.service';
import FfmpegBuilder from './ffmpeg.builder';
import { ICommandExecFfmpeg, IFfmpgInput } from './ffmpeg.types';

export class FfmpegCommandExecutor extends CommandExecutor<IFfmpgInput>{
    private fileService = new FileService();
    private promptService = new PromptService();

    constructor(logger: IStreamLogger) {
        super(logger);
    }
    protected async prompt(): Promise<IFfmpgInput> {
        const path = await this.promptService.input<string>('Имя файла', 'input');
        const width = await this.promptService.input<number>('Ширина видео', 'number');

        const height = await this.promptService.input<number>('Высота видео', 'number');
        const name = await this.promptService.input<string>('Путь к выходному видео', 'input');

        return { width, height, path, name };
    }
    protected build(input: IFfmpgInput): ICommandExecFfmpeg {
        const output = this.fileService.getFilePath(input.path, input.name, 'mp4');
        const args = (new FfmpegBuilder())
        .input(input.path)
        .setVideoSize(input.width, input.height)
        .output(output);

        return { command: 'ffmpeg', args, output };
    }
    protected spawn({ command , args, output }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExists(output);
        return spawn(command, args);

    }
    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }

}
