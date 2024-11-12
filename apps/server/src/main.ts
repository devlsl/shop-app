import { createServer } from 'http';
import { createVerifyAccess } from './utils/verifyAccess';
import { apiSchema } from '@shop/shared';
import { createHandlers } from './handlers';
import { bindActions } from 'ts-api-generator';

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

const handlers = createHandlers({
    jwtSecret,
    accessTokenExpInSec,
    refreshTokenExpInSec,
    staticServerHostname,
});

const requestHandler = bindActions(apiSchema)
    .bindHandlers(handlers)
    .createDefaultHttpRequestHandler(verifyAccess, clientHostname);

const server = createServer(requestHandler);
server.listen(port);
