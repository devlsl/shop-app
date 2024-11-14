import { Either, left, right } from '@sweet-monads/either';
import { Session } from '../db/schemas';
import { db } from '../db';

export const deleteSession = async (
    id: string,
    userId: string,
): Promise<Either<'NotFound' | 'ServiceError', Session>> => {
    let sessions = await db.sessions.get();
    const needToDelete = (session: Session) =>
        session.id === id && session.userId === userId;
    const deletingSession = sessions.find(needToDelete);
    if (deletingSession === undefined) return left('NotFound');
    sessions = sessions.filter((session) => !needToDelete(session));
    await db.sessions.set(sessions);
    return right(deletingSession);
};
