/**
 * @file GlobalPopup.jsx
 * @description Animated modal shell for global alerts (Framer Motion).
 * - Sumit Sahu
 */
import React, { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import './GlobalPopup.css';

function GlobalPopup({ open, title, message, variant, onClose }) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const duration = reduceMotion ? 0 : 0.22;

  const content = (
    <AnimatePresence>
      {open && (
        <div className="global-popup-root is-open" role="presentation">
          <motion.button
            type="button"
            className="global-popup-backdrop"
            aria-label="Close dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-label={title ? undefined : 'Notice'}
            aria-describedby={descId}
            tabIndex={-1}
            className={`global-popup-panel variant-${variant}`}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 8 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 420, damping: 32 }
            }
          >
            {title ? (
              <div id={titleId} className="global-popup-title">
                {title}
              </div>
            ) : null}
            <div id={descId} className="global-popup-message">
              {message}
            </div>
            <div className="global-popup-actions">
              <button
                type="button"
                className="btn btn-primary btn-sm px-3"
                onClick={onClose}
              >
                OK
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

export default GlobalPopup;
