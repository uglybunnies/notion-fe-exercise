import { writable } from 'svelte/store';

export const searchTerm = writable('');
export const searchResults = writable([]);
export const setSearchResults = searchResults.set;
