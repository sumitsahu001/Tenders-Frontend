/**
 * react-select styles tuned to sit next to Bootstrap form-control inputs.
 * Tweak border colors here if you change validation styling.
 * - Sumit Sahu
 */

export function getLocationSelectStyles({ invalid, valid }) {
  return {
    control: (base, state) => {
      let borderColor = '#ced4da';
      if (invalid) borderColor = '#dc3545';
      else if (valid) borderColor = '#198754';
      else if (state.isFocused) borderColor = '#86b7fe';

      return {
        ...base,
        minHeight: 38,
        borderColor,
        boxShadow:
          state.isFocused && !invalid && !valid
            ? '0 0 0 0.25rem rgba(13, 110, 253, 0.25)'
            : 'none',
        '&:hover': { borderColor },
      };
    },
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (base) => ({ ...base, zIndex: 9999 }),
  };
}
