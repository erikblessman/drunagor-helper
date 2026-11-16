import { computed, reactive, readonly } from "vue";

// App-wide confirmation dialog, rendered once by <ConfirmDialog /> in App.vue.
// Usable from components and stores: `if (await confirmDialog("Sure?")) { ... }`

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

const state = reactive({
  open: false,
  title: "",
  message: "",
  confirmText: "OK",
  cancelText: "Cancel",
  danger: false,
});

let resolver: ((value: boolean) => void) | null = null;

export function confirmDialog(options: ConfirmOptions | string): Promise<boolean> {
  const o: ConfirmOptions = typeof options === "string" ? { message: options } : options;
  // A new request cancels any pending one.
  resolver?.(false);
  Object.assign(state, {
    open: true,
    title: o.title ?? "Confirm",
    message: o.message,
    confirmText: o.confirmText ?? "OK",
    cancelText: o.cancelText ?? "Cancel",
    danger: o.danger ?? false,
  });
  return new Promise<boolean>((resolve) => {
    resolver = resolve;
  });
}

export function resolveConfirmDialog(value: boolean): void {
  state.open = false;
  const resolve = resolver;
  resolver = null;
  resolve?.(value);
}

export const confirmDialogState = readonly(state);

// Other modals should hide while this is open: two sibling headlessui dialogs
// treat clicks in each other as outside clicks and close.
export const isConfirmDialogOpen = computed(() => state.open);
