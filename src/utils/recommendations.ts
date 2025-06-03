
import { Exercise } from '../types/exercise';
import { UserProgress } from '../types/exercise';

export class RecommendationEngine {
  private epsilon: number = 0.1; // 10% exploration rate

  getNextExercise(exercises: Exercise[], userProgress: UserProgress): Exercise {
    // ε-greedy algorithm for exercise recommendations
    const shouldExplore = Math.random() < this.epsilon;

    if (shouldExplore || Object.keys(userProgress.exercisePreferences).length === 0) {
      // Exploration: pick a random exercise
      return this.getRandomExercise(exercises, userProgress);
    } else {
      // Exploitation: pick exercise with highest preference score
      return this.getBestExercise(exercises, userProgress);
    }
  }

  private getRandomExercise(exercises: Exercise[], userProgress: UserProgress): Exercise {
    // Filter out recently completed exercises to avoid repetition
    const recentlyCompleted = userProgress.completedExercises.slice(-5);
    const availableExercises = exercises.filter(ex => !recentlyCompleted.includes(ex.id));
    
    if (availableExercises.length === 0) {
      return exercises[Math.floor(Math.random() * exercises.length)];
    }
    
    return availableExercises[Math.floor(Math.random() * availableExercises.length)];
  }

  private getBestExercise(exercises: Exercise[], userProgress: UserProgress): Exercise {
    // Sort exercises by preference score (higher is better)
    const scoredExercises = exercises.map(exercise => ({
      exercise,
      score: userProgress.exercisePreferences[exercise.id] || 0
    }));

    scoredExercises.sort((a, b) => b.score - a.score);

    // Pick from top 3 to add some variety
    const topExercises = scoredExercises.slice(0, 3);
    const randomFromTop = topExercises[Math.floor(Math.random() * topExercises.length)];
    
    return randomFromTop.exercise;
  }

  updatePreference(exerciseId: string, userProgress: UserProgress, action: 'completed' | 'skipped'): void {
    const currentScore = userProgress.exercisePreferences[exerciseId] || 0;
    
    if (action === 'completed') {
      // Increase preference score
      userProgress.exercisePreferences[exerciseId] = Math.min(currentScore + 1, 10);
    } else if (action === 'skipped') {
      // Decrease preference score
      userProgress.exercisePreferences[exerciseId] = Math.max(currentScore - 0.5, -5);
    }
  }
}

export const recommendationEngine = new RecommendationEngine();
