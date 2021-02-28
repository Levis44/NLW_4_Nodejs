import { request, Request, response, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup'
import { AppError } from '../errors/AppError';
class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatório"),
            email: yup.string().email().required("Email incorreto")
        })

        // if(!(await schema.isValid(request.body))) {
        //     return response.status(400).json({error: "Validation Failed!"})
        // }

        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (err) {
            throw new AppError(err)
        }

        const userRepository = getCustomRepository(UsersRepository);

        const userAlredyExists = await userRepository.findOne({
            email,
        });

        if (userAlredyExists) {
            throw new AppError("User alredy exists")
        }

        const user = userRepository.create({
            name, email
        })

        await userRepository.save(user);

        return response.status(201).json(user);
    }

}

export { UserController };
