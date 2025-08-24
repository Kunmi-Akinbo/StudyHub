import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { StudySessionModel } from '../models/StudySession';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();
router.use(authMiddleware);
router.post('/', [
  body('session_type').isIn(['work', 'break']).withMessage('Session type must be work or break'),
  body('duration_minutes').isInt({ min: 1, max: 120 }).withMessage('Duration must be between 1 and 120 minutes')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { session_type, duration_minutes, notes } = req.body;
    const userId = (req as any).user.userId;
    const session = await StudySessionModel.create({
      user_id: userId,
      session_type,
      duration_minutes,
      completed: false,
      notes: notes || null
    });

    res.status(201).json({
      message: 'Study session created successfully',
      session
    });
  } 
  catch (error) {
    console.error('Session creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const sessions = await StudySessionModel.findByUserId(userId);
    
    res.json({
      sessions,
      total: sessions.length
    });
  } 
  catch (error) {
    console.error('Sessions fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', [
  body('actual_duration_seconds').optional().isInt({ min: 0 }),
  body('completed').optional().isBoolean(),
  body('notes').optional().isString()
], async (req: Request, res: Response) => {
  try {
    const sessionId = parseInt(req.params.id);
    const updates = req.body;
    
    const session = await StudySessionModel.updateById(sessionId, updates);
    
    res.json({
      message: 'Session updated successfully',
      session
    });
  } 
  catch (error) {
    console.error('Session update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;