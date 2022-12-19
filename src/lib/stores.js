import { writable } from "svelte/store";

export const screen = writable("start");
export const screenHeader = writable("Meower Pro");
export const postList = writable([]);
export const postHistoryLoaded = writable(false);
export const lastPageLoaded = writable(0);
export const ulist = writable([]);
export const username = writable("");
export const APIToken = writable("");
export const userpage = writable("");
export const homeLoaded = writable(false);
export const devmode = writable(false);