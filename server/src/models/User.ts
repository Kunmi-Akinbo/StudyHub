import db from '../config/database';

export interface User {
  id?: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  created_at?: Date;
  updated_at?: Date;
}

export class UserModel {
  static async findByEmail(email: string): Promise<User | undefined> {
    return db('users').where({ email }).first();
  }

  static async create(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const [user] = await db('users').insert(userData).returning('*');
    return user;
  }

  static async findById(id: number): Promise<User | undefined> {
    return db('users').where({ id }).first();
  }
}