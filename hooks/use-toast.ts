"use client";

import * as React from "react";

export type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 4000;

type Action =
  | { type: "ADD_TOAST"; toast: ToastProps }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

interface State {
  toasts: ToastProps[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case "DISMISS_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
}

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

export function toast({
  title,
  description,
  variant = "default",
}: Omit<ToastProps, "id">) {
  const id = genId();
  dispatch({ type: "ADD_TOAST", toast: { id, title, description, variant } });

  if (toastTimeouts.has(id)) clearTimeout(toastTimeouts.get(id));

  toastTimeouts.set(
    id,
    setTimeout(() => {
      dispatch({ type: "DISMISS_TOAST", toastId: id });
      toastTimeouts.delete(id);
    }, TOAST_REMOVE_DELAY)
  );

  return { id, dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }) };
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return { toasts: state.toasts, toast, dismiss: (id: string) => dispatch({ type: "DISMISS_TOAST", toastId: id }) };
}
