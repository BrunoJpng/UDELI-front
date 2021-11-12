import { InputHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
}

export function Input({ label, name, ...rest }: InputProps) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked'
    })
  }, [fieldName, registerField]);

  return (
    <Container>
      <input
        type="checkbox"
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      <label htmlFor={fieldName}>{label}</label>

      { error && <span style={{ color: '#f00' }}>{error}</span> }
    </Container>
  );
}