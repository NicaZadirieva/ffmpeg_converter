import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from './stream-logger.interface';

export class StreamHandler {
    constructor(private logger: IStreamLogger) {}

    processOutput(stream: ChildProcessWithoutNullStreams) {

    }
}