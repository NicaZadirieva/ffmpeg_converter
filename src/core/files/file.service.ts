import { promises } from 'fs';
import { dirname, isAbsolute, join } from 'path';

export class FileService {
    private async isExist(path: string) {
        try {
            await promises.stat(path);
            return true;
        } catch (err) {
            return false;
        }
    }
    public getFilePath(path: string, name: string, ext: string) {
        if (!isAbsolute(path)) {
            path = join(__dirname + '/' + path);  // Make it absolute if it's relative
        }
        return join(dirname(path) + '/' + name + "." + ext);
    }

    async deleteFileIfExists(path: string) {
        if (await this.isExist(path)) {
            promises.unlink(path);
        }
    }
}