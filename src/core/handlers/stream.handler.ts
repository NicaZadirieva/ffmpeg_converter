import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from './stream-logger.interface';
export class StreamHandler {
    constructor(private logger: IStreamLogger) {}

    processOutput(stream: ChildProcessWithoutNullStreams) {
        stream.stdout.pipe(process.stdout);
        stream.stderr.pipe(process.stderr);
        stream.stdout.on('data', (data) => this.logger.log(data.toString()));
        stream.stderr.on('error', (error) => this.logger.error(error));
        stream.on('end', () => this.logger.end());
    }
}