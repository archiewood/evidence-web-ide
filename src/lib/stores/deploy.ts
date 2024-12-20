import { writable } from 'svelte/store';

export const isDeployed = writable(false);
export const deployUrl = writable('https://example.evidence.app');