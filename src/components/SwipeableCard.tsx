
import React, { useState, useRef, useEffect } from 'react';
import { Exercise } from '../types/exercise';
import ExerciseCard from './ExerciseCard';

interface SwipeableCardProps {
  exercise: Exercise;
  onAction: (action: 'completed' | 'skipped') => void;
  isActive: boolean;
  zIndex: number;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ 
  exercise, 
  onAction, 
  isActive,
  zIndex 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleStart = (clientX: number) => {
    if (!isActive) return;
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !isActive) return;
    const newOffset = clientX - startX;
    setDragOffset(newOffset);
  };

  const handleEnd = () => {
    if (!isDragging || !isActive) return;
    
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        onAction('completed');
      } else {
        onAction('skipped');
      }
    }
    
    setDragOffset(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startX]);

  const cardStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex,
    transform: isActive ? 'scale(1)' : 'scale(0.95)',
    opacity: isActive ? 1 : 0.7,
    transition: isDragging ? 'none' : 'all 0.3s ease-out',
    cursor: isActive ? (isDragging ? 'grabbing' : 'grab') : 'default',
  };

  return (
    <div
      ref={cardRef}
      style={cardStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <ExerciseCard
        exercise={exercise}
        onAction={onAction}
        isDragging={isDragging}
        dragOffset={dragOffset}
      />
    </div>
  );
};

export default SwipeableCard;
