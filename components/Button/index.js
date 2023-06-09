import React from "react";

export default function Button({ action, children, variant, onKeyDown, disabled, name }) {
  return (
    <button type="button" name={name} className={variant} onKeyDown={onKeyDown} onClick={action} disabled={disabled}>
      { disabled ? 'Loading...' : children}
    </button>
  );
}
