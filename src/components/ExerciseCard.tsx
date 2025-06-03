
import React, { useState } from 'react';
import { Exercise } from '../types/exercise';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, ChevronDown, ChevronUp, Clock, Award } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onAction: (action: 'completed' | 'skipped') => void;
  style?: React.CSSProperties;
  isDragging?: boolean;
  dragOffset?: number;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  onAction, 
  style,
  isDragging,
  dragOffset = 0
}) => {
  const [expanded, setExpanded] = useState(false);

  const getCardTint = () => {
    if (!isDragging) return '';
    if (dragOffset > 50) return 'bg-green-50 border-green-200';
    if (dragOffset < -50) return 'bg-red-50 border-red-200';
    return '';
  };

  const getCardRotation = () => {
    if (!isDragging) return 0;
    return Math.max(-15, Math.min(15, dragOffset * 0.1));
  };

  return (
    <Card 
      className={`w-full max-w-md mx-auto bg-white shadow-lg border-2 transition-all duration-200 ${getCardTint()}`}
      style={{
        ...style,
        transform: `rotate(${getCardRotation()}deg) translateX(${dragOffset}px)`,
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{exercise.name}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{exercise.duration}s</span>
            <Award className="w-4 h-4 text-yellow-500" />
            <span>{exercise.points} pts</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
          {exercise.shortDescription}
        </p>

        {/* Expand/Collapse Button */}
        <Button
          variant="outline"
          onClick={() => setExpanded(!expanded)}
          className="w-full mb-4 flex items-center justify-center gap-2"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show Full Instructions
            </>
          )}
        </Button>

        {/* Expanded Content */}
        {expanded && (
          <div className="space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Full Instructions:</h3>
              <p className="text-gray-700 leading-relaxed">{exercise.fullInstructions}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Safety Tips:</h3>
              <p className="text-gray-700 leading-relaxed">{exercise.safetyTips}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Senior Modifications:</h3>
              <p className="text-gray-700 leading-relaxed">{exercise.seniorModifications}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={() => onAction('skipped')}
            variant="outline"
            className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
          >
            <X className="w-5 h-5 mr-2" />
            Skip
          </Button>
          
          <Button
            onClick={() => onAction('completed')}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
          >
            <Check className="w-5 h-5 mr-2" />
            Complete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ExerciseCard;
