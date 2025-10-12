export interface User {
  id: string;
  name: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  timezone?: number;
  createdAt: number;
  updatedAt?: number;
}

export interface UserFormData {
  name: string;
  zipCode: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  timezone: number;
}
