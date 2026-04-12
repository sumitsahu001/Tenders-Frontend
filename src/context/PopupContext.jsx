/**
 * @file PopupContext.jsx
 * @description Global popup state + provider; pairs with GlobalPopup and popupApi.
 * - Sumit Sahu
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import GlobalPopup from '../Components/Shared/GlobalPopup';
import { registerShowPopup, unregisterShowPopup } from './popupApi';

const PopupContext = createContext(null);

const defaultState = {
  open: false,
  title: '',
  message: '',
  variant: 'info',
};

export function PopupProvider({ children }) {
  const [popup, setPopup] = useState(defaultState);

  const hidePopup = useCallback(() => {
    setPopup((prev) => ({ ...prev, open: false }));
  }, []);

  const showPopup = useCallback((options) => {
    const normalized =
      typeof options === 'string'
        ? { message: options }
        : { ...options, message: options?.message };

    const variant =
      normalized.variant === 'success' ||
      normalized.variant === 'error' ||
      normalized.variant === 'info'
        ? normalized.variant
        : 'info';

    setPopup({
      open: true,
      title: normalized.title ?? '',
      message: String(normalized.message ?? ''),
      variant,
    });
  }, []);

  useEffect(() => {
    registerShowPopup(showPopup);
    return () => unregisterShowPopup();
  }, [showPopup]);

  const value = useMemo(
    () => ({ showPopup, hidePopup }),
    [showPopup, hidePopup]
  );

  return (
    <PopupContext.Provider value={value}>
      {children}
      <GlobalPopup
        open={popup.open}
        title={popup.title}
        message={popup.message}
        variant={popup.variant}
        onClose={hidePopup}
      />
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const ctx = useContext(PopupContext);
  if (!ctx) {
    throw new Error('usePopup must be used inside PopupProvider');
  }
  return ctx;
}
