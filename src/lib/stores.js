import { writable } from "svelte/store";

export const screen = writable("login");
export const postList = writable([]);
export const postHistoryLoaded = writable(false);