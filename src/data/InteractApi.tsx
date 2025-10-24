import type { User, UsersResponse } from "../model/Users";


const BASE = 'https://dummyjson.com';


async function http<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  
  if (!res.ok) {
    throw new Error(`Erreur HTTP: ${res.status} ${res.statusText}`);
  }
  
  return res.json() as Promise<T>;
}

export function getUsers(limit = 0, skip = 0) {
  return http<UsersResponse>(`${BASE}/users?limit=${limit}&skip=${skip}`);
}


export function getUser(id: number) {
  return http<User>(`${BASE}/users/${id}`);
}

