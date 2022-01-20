import { InputHTMLAttributes, useRef, useEffect } from 'react';
import { Box, Checkbox as ChakraCheckbox } from '@chakra-ui/react';
import { useField } from '@unform/core';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
}

export function Checkbox({ label, name, ...rest }: CheckboxProps) {
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
    <Box>
      <ChakraCheckbox
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        size="lg"
        colorScheme="green"
        // {...rest}
      >
        {label}
      </ChakraCheckbox>
      {/* <label htmlFor={fieldName}>{label}</label> */}

      { error && <span style={{ color: '#f00' }}>{error}</span> }
    </Box>
  );
}