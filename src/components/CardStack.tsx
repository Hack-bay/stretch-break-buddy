
import React, { useState, useEffect } from 'react';
import { Exercise } from '../types/exercise';
import SwipeableCard from './SwipeableCard';
import { exercises } from '../data/exercises';
import { recommendationEngine } from '../utils/recommendations';
import { UserProgress } from '../types/exercise';

interface CardStackProps {
  userProgress: UserProgress;
  onExerciseAction: (exercise: Exercise, action: 'completed' | 'skipped') => void;
}

const CardStack: React.FC<CardStackProps> = ({ userProgress, onExerciseAction }) => {
  const [cardStack, setCardStack] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Initialize with 3 cards
    const newStack: Exercise[] = [];
    for (let i = 0; i < 3; i++) {
      const nextExercise = recommendationEngine.getNextExercise(exercises, userProgress);
      newStack.push(nextExercise);
    }
    setCardStack(newStack);
    setCurrentIndex(0);
  }, []);

  const handleCardAction = (action: 'completed' | 'skipped') => {
    const currentExercise = cardStack[currentIndex];
    if (!currentExercise) return;

    // Call the parent handler
    onExerciseAction(currentExercise, action);

    // Move to next card
    const nextIndex = currentIndex + 1;
    
    if (nextIndex >= cardStack.length) {
      // Need more cards
      const newExercise = recommendationEngine.getNextExercise(exercises, userProgress);
      setCardStack(prev => [...prev, newExercise]);
    }
    
    setCurrentIndex(nextIndex);
  };

  const visibleCards = cardStack.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative w-full max-w-md mx-auto h-96">
      {visibleCards.map((exercise, index) => (
        <SwipeableCard
          key={`${exercise.id}-${currentIndex + index}`}
          exercise={exercise}
          onAction={handleCardAction}
          isActive={index === 0}
          zIndex={visibleCards.length - index}
        />
      ))}
      
      {visibleCards.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">Loading exercises...</p>
        </div>
      )}
    </div>
  );
};

export default CardStack;
