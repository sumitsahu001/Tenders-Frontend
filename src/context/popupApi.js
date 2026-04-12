/**
 * Imperative popup API — wired when PopupProvider mounts.
 * Use showPopup() from any module; no hook required.
 * - Sumit Sahu
 */

let showImpl = () => {};

export function registerShowPopup(fn) {
  showImpl = fn;
}

export function unregisterShowPopup() {
  showImpl = () => {};
}

/**
 * @param {string | { message: string, title?: string, variant?: 'info'|'success'|'error' }} options
 */
export function showPopup(options) {
  showImpl(options);
}
