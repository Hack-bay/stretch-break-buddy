import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CardStack from '../components/CardStack';
import ProgressDashboard from '../components/ProgressDashboard';
import RecentActivity from '../components/RecentActivity';
import RewardsScreen from '../components/RewardsScreen';
import { useUserProgress } from '../hooks/useUserProgress';
import { Exercise } from '../types/exercise';
import { Voucher } from '../types/voucher';
import { storageManager } from '../utils/storage';
import { notificationManager } from '../utils/notifications';
import { Activity, Home, Settings, Bell, BellOff, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { userProgress, updateProgress, claimVoucher, loading } = useUserProgress();
  const [activeTab, setActiveTab] = useState('exercise');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize PWA features
    initializePWA();
  }, []);

  const initializePWA = async () => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }

    // Request persistent storage
    const isPersistent = await storageManager.requestPersistentStorage();
    console.log('Persistent storage:', isPersistent);

    // Initialize storage
    await storageManager.initDB();

    // Check notification permission
    setNotificationsEnabled(Notification.permission === 'granted');
  };

  const handleExerciseAction = async (exercise: Exercise, action: 'completed' | 'skipped') => {
    await updateProgress(exercise.id, action, exercise.points);
    
    if (action === 'completed') {
      toast({
        title: "Exercise Complete! 🎉",
        description: `Great job! You earned ${exercise.points} points.`,
      });
      
      // Schedule next reminder
      if (notificationsEnabled) {
        notificationManager.scheduleReminder(30);
      }
    }
  };

  const handleClaimVoucher = async (voucher: Voucher) => {
    try {
      const claimedVoucher = await claimVoucher(voucher);
      toast({
        title: "Gutschein eingelöst! 🎉",
        description: `Du hast "${voucher.title}" erfolgreich eingelöst. Code: ${claimedVoucher.code}`,
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Gutschein konnte nicht eingelöst werden",
        variant: "destructive"
      });
    }
  };

  const toggleNotifications = async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      toast({
        title: "Notifications Disabled",
        description: "You won't receive exercise reminders anymore.",
      });
    } else {
      const hasPermission = await notificationManager.requestPermission();
      if (hasPermission) {
        setNotificationsEnabled(true);
        toast({
          title: "Notifications Enabled! 🔔",
          description: "You'll receive helpful exercise reminders.",
        });
        // Show a demo notification
        setTimeout(() => {
          notificationManager.showExerciseReminder();
        }, 3000);
      } else {
        toast({
          title: "Permission Denied",
          description: "Please enable notifications in your browser settings.",
          variant: "destructive"
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading MotivMove...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">MotivMove</h1>
              <p className="text-sm text-gray-600">Your office exercise companion</p>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleNotifications}
              className="flex items-center gap-2"
            >
              {notificationsEnabled ? (
                <>
                  <Bell className="w-4 h-4" />
                  Notifications On
                </>
              ) : (
                <>
                  <BellOff className="w-4 h-4" />
                  Enable Reminders
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="exercise" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Exercise
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="exercise" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Ready for your next exercise?
              </h2>
              <p className="text-gray-600">
                Swipe right to complete, left to skip, or use the buttons below
              </p>
            </div>
            
            <CardStack 
              userProgress={userProgress}
              onExerciseAction={handleExerciseAction}
            />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <ProgressDashboard userProgress={userProgress} />
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <RewardsScreen 
              userProgress={userProgress}
              onClaimVoucher={handleClaimVoucher}
            />
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <RecentActivity userProgress={userProgress} />
          </TabsContent>
        </Tabs>
      </main>

      {/* PWA Install Banner */}
      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">
                Install MotivMove
              </p>
              <p className="text-xs text-gray-600">
                Add to your home screen for quick access
              </p>
            </div>
            <Button size="sm" className="text-xs">
              Install
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
