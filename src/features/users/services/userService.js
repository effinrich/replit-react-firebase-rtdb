import { useState, useEffect } from "react";
import { ref, set, update, remove, onValue } from "firebase/database";

import { getLocationData } from "./weatherService";

import { database } from "../../../firebase";

export const getUsers = async () => {
  useEffect(() => {
    const usersRef = ref(database, "users");
    onValue(usersRef, (snapshot) => {
      ref(snapshot.val() || {});
    });
  }, []);

  return data;
  // return Object.entries(data).map(([id, value]) => ({
  //   id,
  //   ...value
  // }));
};

export const handleCreate = async (formData) => {
  const weatherData = await getLocationData(formData.zipCode);

  const userData = {
    ...formData,
    latitude: weatherData.coord.lat,
    longitude: weatherData.coord.lon,
    timezone: weatherData.timezone,
  };

  set(ref(database, "users", userData));
};

// export const addUser = async (userData) => {
//   const [name, setName] = useState("");
//   const usersRef = ref(database, "users");
//   const newUserRef = push(usersRef);
//   const userId = newUserRef.key;

//   await set(newUserRef, {
//     ...userData,
//     id: userId,
//     createdAt: Date.now(),
//   });

//   return userId;
// };

export const updateUser = (userId, userData) => {
  update(ref(database, `users/${id}`), { userId, userData });
};

// export const updateUser = async (userId, userData) => {
//   const userRef = ref(database, `users/${userId}`);
//   await update(userRef, {
//     ...userData,
//     updatedAt: Date.now(),
//   });
// };

// export const deleteUser = async (userId) => {
//   const userRef = ref(database, `users/${userId}`);
//   await remove(userRef);
// };

export const deleteUser = (id) => {
  remove(ref(database, `users/${id}`));
};
