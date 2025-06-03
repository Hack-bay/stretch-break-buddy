
import { useState, useEffect } from 'react';
import { UserProgress, ExerciseSession, Badge } from '../types/exercise';
import { storageManager } from '../utils/storage';
import { recommendationEngine } from '../utils/recommendations';

export const useUserProgress = () => {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalPoints: 0,
    level: 1,
    completedExercises: [],
    skippedExercises: [],
    exercisePreferences: {},
    badges: [],
    streak: 0,
    lastExerciseDate: ''
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProgress();
  }, []);

  const loadUserProgress = async () => {
    try {
      const progress = await storageManager.getUserProgress();
      setUserProgress(progress);
    } catch (error) {
      console.error('Failed to load user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (exerciseId: string, action: 'completed' | 'skipped', points: number) => {
    const newProgress = { ...userProgress };
    const today = new Date().toISOString().split('T')[0];

    // Update exercise lists
    if (action === 'completed') {
      newProgress.completedExercises = [...newProgress.completedExercises, exerciseId];
      newProgress.totalPoints += points;
      
      // Check for streak
      if (newProgress.lastExerciseDate === today) {
        // Same day, don't increment streak
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (newProgress.lastExerciseDate === yesterdayStr) {
          newProgress.streak += 1;
        } else if (newProgress.lastExerciseDate !== today) {
          newProgress.streak = 1; // Reset streak
        }
      }
      
      newProgress.lastExerciseDate = today;
    } else {
      newProgress.skippedExercises = [...newProgress.skippedExercises, exerciseId];
    }

    // Update preferences
    recommendationEngine.updatePreference(exerciseId, newProgress, action);

    // Calculate new level
    const newLevel = Math.floor(newProgress.totalPoints / 100) + 1;
    if (newLevel > newProgress.level) {
      newProgress.level = newLevel;
      // Award level-up badge
      const levelBadge: Badge = {
        id: `level-${newLevel}`,
        name: `Level ${newLevel}`,
        description: `Reached level ${newLevel}!`,
        icon: '⭐',
        earnedAt: new Date().toISOString()
      };
      newProgress.badges = [...newProgress.badges, levelBadge];
    }

    // Check for other badges
    checkForNewBadges(newProgress);

    setUserProgress(newProgress);
    
    // Save to storage
    await storageManager.saveUserProgress(newProgress);
    
    // Save exercise session
    const session: ExerciseSession = {
      exerciseId,
      action,
      timestamp: new Date().toISOString(),
      points: action === 'completed' ? points : 0
    };
    
    await storageManager.saveExerciseSession(session);
  };

  const checkForNewBadges = (progress: UserProgress) => {
    const badges = [...progress.badges];
    
    // First exercise badge
    if (progress.completedExercises.length === 1 && !badges.find(b => b.id === 'first-exercise')) {
      badges.push({
        id: 'first-exercise',
        name: 'Getting Started',
        description: 'Completed your first exercise!',
        icon: '🌟',
        earnedAt: new Date().toISOString()
      });
    }

    // Streak badges
    if (progress.streak === 3 && !badges.find(b => b.id === 'streak-3')) {
      badges.push({
        id: 'streak-3',
        name: 'On a Roll',
        description: '3-day exercise streak!',
        icon: '🔥',
        earnedAt: new Date().toISOString()
      });
    }

    if (progress.streak === 7 && !badges.find(b => b.id === 'streak-7')) {
      badges.push({
        id: 'streak-7',
        name: 'Week Warrior',
        description: '7-day exercise streak!',
        icon: '💪',
        earnedAt: new Date().toISOString()
      });
    }

    // Milestone badges
    if (progress.completedExercises.length === 25 && !badges.find(b => b.id === 'milestone-25')) {
      badges.push({
        id: 'milestone-25',
        name: 'Quarter Century',
        description: 'Completed 25 exercises!',
        icon: '🏆',
        earnedAt: new Date().toISOString()
      });
    }

    progress.badges = badges;
  };

  return {
    userProgress,
    updateProgress,
    loading,
    refreshProgress: loadUserProgress
  };
};
