import { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Checkbox({ name, defaultChecked, label, ...rest }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  //const defaultChecked = defaultValue === value;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.checked;
      },
      clearValue: (ref) => {
        ref.current.checked = defaultChecked;
      },
      setValue: (ref, value) => {
        ref.current.checked = value;
      },
    });
  }, [defaultValue, fieldName, registerField, defaultChecked]);

  return (
    <div>
      <label htmlFor={fieldName} key={fieldName}>
        <input
          defaultChecked={defaultChecked}
          ref={inputRef}
          type="checkbox"
          id={fieldName}
          {...rest}
        />
        {label}
      </label>

      {error && <p>{error}</p>}
    </div>
  );
}
