import { type AppSliceCreator } from '../store';

export interface UiSlice {
  ui: {
    toast: {
      type: 'Success' | 'Error';
      message: string;
    } | null;
  };
  setUiToast: (toast: UiSlice['ui']['toast']) => void;
  clearUiToast: () => void;
}

export const createUiSlice: AppSliceCreator<UiSlice> = (set, get) => {
  return {
    ui: {
      toast: null,
    },
    setUiToast: (toast) => {
      set((state) => {
        state.ui.toast = toast;
      });

      setTimeout(() => {
        get().clearUiToast();
      }, 3_000);
    },
    clearUiToast: () => {
      set((state) => {
        state.ui.toast = null;
      });
    },
  };
};
