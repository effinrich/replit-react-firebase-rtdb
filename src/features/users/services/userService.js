import { ref, get, set, push, remove, update } from "firebase/database";
import { database } from "../../../firebase";

const getUsers = async () => {
  const usersRef = ref(database, "users");
  const snapshot = await get(usersRef);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();

  return data;
  // return Object.entries(data).map(([id, value]) => ({
  //   id,
  //   ...value
  // }));
};

const addUser = async (userData) => {
  const usersRef = ref(database, "users");
  const newUserRef = push(usersRef);
  const userId = newUserRef.key;

  await set(newUserRef, {
    ...userData,
    id: userId,
    createdAt: Date.now(),
  });

  return userId;
};

const updateUser = async (userId, userData) => {
  const userRef = ref(database, `users/${userId}`);
  await update(userRef, {
    ...userData,
    updatedAt: Date.now(),
  });
};

const deleteUser = async (userId) => {
  const userRef = ref(database, `users/${userId}`);
  await remove(userRef);
};

export const userService = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
