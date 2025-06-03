
import { ClaimedVoucher } from './voucher';

export interface Exercise {
  id: string;
  name: string;
  shortDescription: string;
  fullInstructions: string;
  safetyTips: string;
  seniorModifications: string;
  category: 'neck' | 'shoulder' | 'back' | 'wrist' | 'leg' | 'full-body';
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in seconds
  points: number;
}

export interface UserProgress {
  totalPoints: number;
  level: number;
  completedExercises: string[];
  skippedExercises: string[];
  exercisePreferences: Record<string, number>; // exercise ID -> preference score
  badges: Badge[];
  streak: number;
  lastExerciseDate: string;
  claimedVouchers: ClaimedVoucher[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface ExerciseSession {
  exerciseId: string;
  action: 'completed' | 'skipped';
  timestamp: string;
  points: number;
}
