import { Either, left, right } from '@sweet-monads/either';
import { User } from '../db/schemas';
import { db } from '../db';

export const getUserByEmail = async (
    email: string,
): Promise<Either<'NotFound' | 'ServiceError', User>> => {
    let users = await db.users.get();
    const user = users.find((user) => user.email === email);
    return user === undefined ? left('NotFound') : right(user);
};
