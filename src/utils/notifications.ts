
export class NotificationManager {
  private registration: ServiceWorkerRegistration | null = null;

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  async scheduleReminder(delayMinutes: number = 30): Promise<void> {
    const hasPermission = await this.requestPermission();
    if (!hasPermission) return;

    // For demo purposes, we'll show a notification after a short delay
    // In production, you'd use a more sophisticated scheduling system
    setTimeout(() => {
      new Notification('MotivMove Reminder', {
        body: 'Time for a healthy stretch break!',
        icon: '/icon-192.png',
        tag: 'exercise-reminder'
      });
    }, delayMinutes * 60 * 1000);
  }

  async showExerciseReminder(): Promise<void> {
    const hasPermission = await this.requestPermission();
    if (!hasPermission) return;

    new Notification('MotivMove', {
      body: 'Ready for your next exercise? Let\'s keep moving!',
      icon: '/icon-192.png',
      tag: 'exercise-prompt'
    });
  }
}

export const notificationManager = new NotificationManager();
