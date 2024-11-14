import { Either, left, right } from "@sweet-monads/either";
import { db } from "../db";
import { Session } from "../db/schemas";

export const getSession = async (
    id: string,
): Promise<Either<'NoSession' | 'ServiceError', Session>> => {
    let sessions = await db.sessions.get();
    const session = sessions.find((session) => session.id === id);
    return session === undefined ? left('NoSession') : right(session);
};
