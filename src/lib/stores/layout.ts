import { writable } from 'svelte/store';

export const isEditorVisible = writable(true);
export const activeView = writable<'editor' | 'preview'>('editor');
export const currentView = writable<'files' | 'data'>('files');