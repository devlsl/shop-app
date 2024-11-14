import { Either, right } from '@sweet-monads/either';
import { User } from '../db/schemas';
import { db } from '../db';
import { generateId } from '../utils/generateId';

export const createUserByEmailAndPassword = async (
    email: string,
    passwordHashSalt: string,
    passwordHash: string,
    role: string,
): Promise<Either<'ServiceError', User>> => {
    let users = await db.users.get();
    const user: User = {
        id: generateId(),
        email,
        passwordHash,
        passwordHashSalt,
        role,
    };
    users.push(user);
    await db.users.set(users);
    return right(user);
};
