import { ref, get, set, push, remove, update } from 'firebase/database';
import { database } from '../../../firebase';

export const userService = {
  async getUsers() {
    const usersRef = ref(database, 'users');
    const snapshot = await get(usersRef);
    
    if (!snapshot.exists()) {
      return [];
    }
    
    const data = snapshot.val();
    return Object.entries(data).map(([id, value]) => ({
      id,
      ...value
    }));
  },

  async addUser(userData) {
    const usersRef = ref(database, 'users');
    const newUserRef = push(usersRef);
    const userId = newUserRef.key;
    
    await set(newUserRef, {
      ...userData,
      id: userId,
      createdAt: Date.now()
    });
    
    return userId;
  },

  async updateUser(userId, userData) {
    const userRef = ref(database, `users/${userId}`);
    await update(userRef, {
      ...userData,
      updatedAt: Date.now()
    });
  },

  async deleteUser(userId) {
    const userRef = ref(database, `users/${userId}`);
    await remove(userRef);
  }
};
