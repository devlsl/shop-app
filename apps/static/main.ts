import { createServer, ServerResponse } from 'http';
import { z } from 'zod';
import { access, constants, readdir } from 'fs/promises';
import { join, resolve } from 'path';
import { createReadStream } from 'fs';

const mapErrorTypeToMessage = {
    invalid_url: 'Invalid url. Url (filename) should be /uuid',
    file_not_found: 'File not found',
};

export const writeErrorToResponse = (
    response: ServerResponse,
    error: keyof typeof mapErrorTypeToMessage,
) =>
    response
        .writeHead(404, undefined, { 'content-type': 'text/plain' })
        .end(mapErrorTypeToMessage[error]);

const findFileNames = async (path: string, startsWith: string) =>
    (await readdir(path)).filter((file) => file.startsWith(startsWith));

const server = createServer(async (req, res) => {
    const url = req.url ?? '';
    const maybeFilename = z.string().uuid().safeParse(url.slice(1));
    if (!maybeFilename.success) return writeErrorToResponse(res, 'invalid_url');
    const folderPath = resolve(__dirname, '..', 'files');
    const files = await findFileNames(folderPath, maybeFilename.data);
    if (files[0] === undefined)
        return writeErrorToResponse(res, 'file_not_found');
    try {
        const filepath = join(folderPath, files[0]);
        await access(filepath, constants.F_OK);
        const stream = createReadStream(filepath);
        return stream.pipe(res);
    } catch {
        return writeErrorToResponse(res, 'file_not_found');
    }
});

server.listen(process.env.STATIC_SERVER_PORT);
