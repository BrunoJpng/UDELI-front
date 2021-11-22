import { useEffect, useRef } from "react";
import ReactSelect, { Props } from 'react-select';
import { useField } from '@unform/core';

type OptionProps = {
  value: string;
  label: string;
}

type SelectProps = Props<OptionProps> & {
  name: string;
  label: string;
}

export function Select({label, name, options, ...rest}: SelectProps) {
  const selectRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.props.value) {
            return [];
          }
          return ref.props.value.map((option: OptionProps) => option.value);
        }
        if (!ref.props.value) {
          return '';
        }
        return ref.props.value.value;
      }
    })
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <div>
      <label htmlFor={fieldName}>{label}</label>
      <ReactSelect
        id={fieldName}
        ref={selectRef}
        defaultValue={defaultValue}
        options={options}
        classNamePrefix="react-select"
        placeholder="Selecione a frequência"
        {...rest}
      />

      { error && <span style={{ color: '#f00' }}>{error}</span> }
    </div>
  );
}