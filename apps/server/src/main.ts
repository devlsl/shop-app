import { createServer } from 'http';
import { createVerifyAccess } from './utils/verifyAccess';
import { apiSchema } from '@shop/shared';
import { bindActions } from 'ts-api-generator';
import path from 'path';
import { createDb } from './utils/createDb';
import { dbSchema } from './dbSchema';
import { createHandlers } from './utils/createHandlers';

const jwtSecret = 'secret';
const accessTokenExpInSec = 60 * 15;
const refreshTokenExpInSec = 60 * 60 * 24 * 60;
const port = process.env.SERVER_PORT;
const clientHostname = process.env.CLIENT_HOSTNAME || '';
const staticServerHostname = process.env.STATIC_SERVER_HOSTNAME || '';

const verifyAccess = createVerifyAccess({
    jwtSecret,
    accessTokenExpInSec,
});

export const db = createDb(path.join(path.resolve(), 'db'), dbSchema);

const requestHandler = bindActions(apiSchema)
    .bindHandlers(
        createHandlers(
            {
                accessTokenExpInSec,
                jwtSecret,
                refreshTokenExpInSec,
                staticServerHostname,
            },
            {
                db,
            },
        ),
    )
    .createDefaultHttpRequestHandler(verifyAccess, clientHostname);

const server = createServer(requestHandler);
server.listen(port);
