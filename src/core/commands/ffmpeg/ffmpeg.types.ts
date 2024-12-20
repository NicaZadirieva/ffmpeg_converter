import { ICommandExec } from '../../executor/command.types';

export interface IFfmpgInput {
    width: number;
    height: number;
    path: string;
    name: string;
}

export interface ICommandExecFfmpeg extends ICommandExec {
    output: string;
}