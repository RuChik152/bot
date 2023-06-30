import { Request, Response } from 'express';

interface PropsUsers {
    name: string,
    age: number
}

export default function getAllUsers(req: Request, res: Response) {
    const users: PropsUsers[] = [
        {
            name: 'John',
            age: 30
        },
        {
            name: 'David',
            age: 40
        }
    ];

    res.statusCode = 200;
    res.send({ users });
}