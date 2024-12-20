import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from '../handlers/stream-logger.interface';
import { ICommandExec } from './command.types';

export abstract class CommandExecutor<Input>{
    constructor(private logger: IStreamLogger) {} 
    public async execute() {
        const input = await this.prompt();
        const commandArgs = this.build(input);
        const childProcess = this.spawn(commandArgs);
        this.processStream(childProcess, this.logger);
    }
    protected abstract prompt(): Promise<Input>;

    protected abstract build(input: Input): ICommandExec;
    protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams;
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;
    
}