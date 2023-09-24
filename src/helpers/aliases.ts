import { Schema, Types } from 'mongoose';
import { ReadStream } from 'fs';
import { Server } from 'socket.io';

export type Identifier<T> = string;

export type ObjectIDType<T> = Schema.Types.ObjectId | Types.ObjectId | Partial<T>;

export type LocalizedString = { [lang: string]: string };

export interface IFileResponse {
    mimeType: string;
    media: ReadStream;
}

export interface IGlobal {
    io: Server;
}
