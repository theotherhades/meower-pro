import { writable } from "svelte/store";

export const screen = writable("start");
export const postList = writable([]);
export const postHistoryLoaded = writable(false);