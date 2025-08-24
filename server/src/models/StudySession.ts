import db from '../config/database';

export interface StudySession {
  id?: number;
  user_id: number;
  session_type: 'work' | 'break';
  duration_minutes: number;
  actual_duration_seconds?: number;
  completed: boolean;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class StudySessionModel {
  static async create(sessionData: Omit<StudySession, 'id' | 'created_at' | 'updated_at'>): Promise<StudySession> {
    const [session] = await db('study_sessions').insert(sessionData).returning('*');
    return session;
  }

  static async findByUserId(userId: number): Promise<StudySession[]> {
    return db('study_sessions').where({ user_id: userId }).orderBy('created_at', 'desc');
  }

  static async updateById(id: number, updates: Partial<StudySession>): Promise<StudySession> {
    const [session] = await db('study_sessions').where({ id }).update(updates).returning('*');
    return session;
  }
}