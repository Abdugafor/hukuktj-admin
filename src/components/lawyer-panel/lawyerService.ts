export const API = "http://localhost:8080/lawyers";

export interface Lawyer {
  id: number;
  name: string;
  email: string;
  phone: string;
  description?: string;
  photo?: string; 
  photo_url?: string;
  year_experience?: number;
}

export const listLawyers = () => fetch(API).then(r => r.json());

export const createLawyer = (lawyer: string) =>
  fetch(API, { method: "POST", body: lawyer }).then(r => r.json());

export const updateLawyer = (lawyer: Lawyer) =>
  fetch(`${API}/${lawyer.id}`, { method: "PATCH", body: JSON.stringify(lawyer) }).then(r => r.json());

export const deleteLawyer = (id: number) =>
  fetch(`${API}/${id}`, { method: "DELETE" }).then(r => r.json());