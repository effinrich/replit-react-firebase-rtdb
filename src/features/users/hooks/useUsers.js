import { useQuery } from "@tanstack/react-query";
import { ref, set, update, remove, onValue } from "firebase/database";

import { getUsers } from "../services/userService";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}
