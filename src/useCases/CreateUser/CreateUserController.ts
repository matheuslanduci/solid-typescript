import { Request, Response } from 'express'
import CreateUserUseCase from './CreateUserUseCase'

export default class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    try {      
      await this.createUserUseCase.execute({
        email,
        name,
        password
      })

      return response.status(201).send()
    } catch (err) {
      console.log(err);
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
