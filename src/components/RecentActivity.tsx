
import React from 'react';
import { UserProgress } from '../types/exercise';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock, Activity } from 'lucide-react';
import { exercises } from '../data/exercises';

interface RecentActivityProps {
  userProgress: UserProgress;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ userProgress }) => {
  const getRecentActivities = () => {
    const completed = userProgress.completedExercises.slice(-5).map(id => ({
      exerciseId: id,
      action: 'completed' as const,
      timestamp: new Date().toISOString() // In real app, store actual timestamps
    }));
    
    const skipped = userProgress.skippedExercises.slice(-3).map(id => ({
      exerciseId: id,
      action: 'skipped' as const,
      timestamp: new Date().toISOString()
    }));
    
    return [...completed, ...skipped].slice(-8);
  };

  const getExerciseName = (exerciseId: string) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    return exercise?.name || 'Unknown Exercise';
  };

  const activities = getRecentActivities();

  if (activities.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Recent Activity</h3>
        <p className="text-gray-500">Complete your first exercise to see your progress here!</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5" />
        Recent Activity
      </h3>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
            {activity.action === 'completed' ? (
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            )}
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {getExerciseName(activity.exerciseId)}
              </p>
              <p className="text-xs text-gray-500">
                {activity.action === 'completed' ? 'Completed' : 'Skipped'}
              </p>
            </div>
            
            <div className="text-xs text-gray-400">
              Just now
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivity;
