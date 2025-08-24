import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import db from './config/database';
import sessionRoutes from './routes/sessions';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

db.raw('SELECT 1')
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.log('Database connection unsuccessful:', error.message);
  });

// middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'StudyHub API is running',
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;