import { Either, left, right } from '@sweet-monads/either';
import { db } from '../db';
import { User } from '../db/schemas';

export const getUserById = async (
    id: string,
): Promise<Either<'NotFound' | 'ServiceError', User>> => {
    let users = await db.users.get();
    const user = users.find((user) => user.id === id);
    return user === undefined ? left('NotFound') : right(user);
};
