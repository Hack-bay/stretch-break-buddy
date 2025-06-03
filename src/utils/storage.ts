
import { UserProgress, ExerciseSession } from '../types/exercise';

const DB_NAME = 'MotivMoveDB';
const DB_VERSION = 1;
const PROGRESS_STORE = 'userProgress';
const SESSIONS_STORE = 'exerciseSessions';

class StorageManager {
  private db: IDBDatabase | null = null;

  async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(PROGRESS_STORE)) {
          db.createObjectStore(PROGRESS_STORE, { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains(SESSIONS_STORE)) {
          const sessionStore = db.createObjectStore(SESSIONS_STORE, { keyPath: 'id', autoIncrement: true });
          sessionStore.createIndex('timestamp', 'timestamp');
        }
      };
    });
  }

  async getUserProgress(): Promise<UserProgress> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PROGRESS_STORE], 'readonly');
      const store = transaction.objectStore(PROGRESS_STORE);
      const request = store.get('user-progress');

      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result.data);
        } else {
          // Return default progress
          const defaultProgress: UserProgress = {
            totalPoints: 0,
            level: 1,
            completedExercises: [],
            skippedExercises: [],
            exercisePreferences: {},
            badges: [],
            streak: 0,
            lastExerciseDate: ''
          };
          resolve(defaultProgress);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  async saveUserProgress(progress: UserProgress): Promise<void> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PROGRESS_STORE], 'readwrite');
      const store = transaction.objectStore(PROGRESS_STORE);
      const request = store.put({ id: 'user-progress', data: progress });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async saveExerciseSession(session: ExerciseSession): Promise<void> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([SESSIONS_STORE], 'readwrite');
      const store = transaction.objectStore(SESSIONS_STORE);
      const request = store.add(session);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async requestPersistentStorage(): Promise<boolean> {
    if ('storage' in navigator && 'persist' in navigator.storage) {
      return await navigator.storage.persist();
    }
    return false;
  }
}

export const storageManager = new StorageManager();
