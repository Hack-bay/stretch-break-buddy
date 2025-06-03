
import React from 'react';
import { UserProgress } from '../types/exercise';
import { Card } from '@/components/ui/card';
import { Award, Activity, Zap, Award as BadgeIcon } from 'lucide-react';

interface ProgressDashboardProps {
  userProgress: UserProgress;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ userProgress }) => {
  const getXPForNextLevel = (level: number) => level * 100;
  const currentLevelXP = (userProgress.level - 1) * 100;
  const nextLevelXP = getXPForNextLevel(userProgress.level);
  const progressToNextLevel = ((userProgress.totalPoints - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  const getMotivationalMessage = () => {
    if (userProgress.streak >= 7) return "Amazing streak! You're on fire! 🔥";
    if (userProgress.streak >= 3) return "Great consistency! Keep it up! 💪";
    if (userProgress.totalPoints >= 100) return "You're making excellent progress! ⭐";
    return "Every exercise counts! Let's keep moving! 🌟";
  };

  return (
    <div className="space-y-4">
      {/* Motivational Header */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {getMotivationalMessage()}
          </h2>
          <p className="text-gray-600">
            Level {userProgress.level} • {userProgress.totalPoints} total points
          </p>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-bold text-gray-800">
                {userProgress.completedExercises.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Streak</p>
              <p className="text-xl font-bold text-gray-800">
                {userProgress.streak} days
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Level {userProgress.level}
          </span>
          <span className="text-sm text-gray-500">
            {userProgress.totalPoints - currentLevelXP} / {nextLevelXP - currentLevelXP} XP
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
          />
        </div>
      </Card>

      {/* Badges */}
      {userProgress.badges.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <BadgeIcon className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold text-gray-800">Achievements</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {userProgress.badges.map((badge) => (
              <div
                key={badge.id}
                className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-sm"
              >
                <span className="mr-1">{badge.icon}</span>
                {badge.name}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProgressDashboard;
