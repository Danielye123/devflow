"use server"

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose"
import { CreateUserParams } from "./shared.types";

export async function getUserById(params: any) {
    try {
        connectToDatabase();

        const { userId } = params;

        const user = await User.findOne({ clerkId: userId });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// New user
export async function createUser(userData: CreateUserParams) {
    try {
        connectToDatabase();

        const newUser = await User.create(userData);
        
        return newUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
