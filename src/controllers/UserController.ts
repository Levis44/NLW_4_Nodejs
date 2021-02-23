import { Request, response, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {

    async create(req: Request, res: Response) {
        const { name, email } = req.body
        
        const userRepository = getRepository(User);

        const userAlredyExists = await userRepository.findOne({
            email,
        });

        if (userAlredyExists) {
            return res.status(400).json({
                error: "User alredy exists",
            });
        }

        const user = userRepository.create({
            name, email
        })

        await userRepository.save(user);

        res.json(user);
    }

}

export { UserController };