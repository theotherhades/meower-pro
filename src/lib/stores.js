import { writable } from "svelte/store";

export const screen = writable("start");
export const screenHeader = writable("Meower Pro");
export const postList = writable([]);
export const postHistoryLoaded = writable(false);
export const ulist = writable([]);