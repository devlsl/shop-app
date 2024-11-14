import { Either, right } from '@sweet-monads/either';
import { Session } from '../db/schemas';
import { db } from '../db';
import { generateId } from '../utils/generateId';

export const createSession = async (
    userId: string,
    expirationDate: string,
): Promise<Either<'NotCreated' | 'ServiceError', Session>> => {
    let sessions = await db.sessions.get();
    const session: Session = {
        id: generateId(),
        expirationDate,
        userId,
    };
    sessions.push(session);
    await db.sessions.set(sessions);
    return right(session);
};
