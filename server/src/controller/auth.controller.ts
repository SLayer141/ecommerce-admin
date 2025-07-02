import {Request, Response} from 'express';
import { AppDataSource } from "../db/dataSource";
import { User } from '../entity/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({where: {email: email}});
    if (!user) {
        return res.status(401).json({message: 'User not found'});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
    const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  res.status(200).json({ token });
};

export const signup = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({where: {email: email}});
    if (existingUser) {
        return res.status(400).json({message: 'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    await userRepository.save(user);
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );
    res.status(201).json({ token });
}