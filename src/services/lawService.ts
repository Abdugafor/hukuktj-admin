import type { LawNode } from '../components/law-panel/types';

const API_BASE = "https://hukuktj.run.place/api";

async function jsonRequest(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...opts,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export async function listLaws(): Promise<LawNode[]> {
  return (await jsonRequest('/laws')) || [];
}

export async function getLaw(id: number): Promise<LawNode> {
  return await jsonRequest(`/laws/${id}`);
}

export async function createLaw(payload: Partial<LawNode>): Promise<LawNode> {
  return await jsonRequest('/laws', { method: 'POST', body: JSON.stringify(payload) });
}

export async function updateLaw(payload: LawNode): Promise<LawNode> {
  if (!payload.id) throw new Error('Missing id');
  return await jsonRequest(`/laws/${payload.id}`, { method: 'PATCH', body: JSON.stringify(payload) });
}

export async function deleteLaw(id: number): Promise<void> {
  await jsonRequest(`/laws/${id}`, { method: 'DELETE' });
}

export default { listLaws, getLaw, createLaw, updateLaw, deleteLaw };
