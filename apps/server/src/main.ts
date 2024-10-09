import { createServer } from 'http';
import { createVerifyAccess } from './utils/verifyAccess';
import { apiSchema } from '@shop/shared';
import { createHandlers } from './handlers/instance';
import { bindActions } from 'ts-api-generator';

const jwtSecret = 'secret';
const accessTokenExpInSec = 60 * 15;
const refreshTokenExpInSec = 60 * 60 * 24 * 60;
const port = 3000;
const clientHostname = 'http://localhost:5173';

const verifyAccess = createVerifyAccess({
    jwtSecret,
    accessTokenExpInSec,
});

const handlers = createHandlers({
    jwtSecret,
    accessTokenExpInSec,
    refreshTokenExpInSec,
});

const requestHandler = bindActions(apiSchema)
    .bindHandlers(handlers)
    .createDefaultHttpRequestHandler(verifyAccess, clientHostname);

const server = createServer(requestHandler);
server.listen(port);
