import { create } from "zustand";

const store = (set) => ({ tasks: [{ title: "test", state: "PLANNED" }] });

export const useStore = create(store);
