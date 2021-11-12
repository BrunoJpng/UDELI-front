import { useEffect, useRef } from "react";
import ReactSelect, { Props as ReactSelectProps } from 'react-select';
import { useField } from '@unform/core';

type OptionProps = {
  value: string;
  label: string;
}

type SelectProps = ReactSelectProps & {
  name: string;
  label: string;
  options: Array<OptionProps>
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
          if (ref.state.selectValue.length === 0) {
            return [];
          }

          return ref.state.selectValue.map((option: OptionProps) => {
            return option.value
          });
        }

        if (ref.state.selectValue.length === 0) {
          return '';
        }

        return ref.state.selectValue[0].value;
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
        {...rest}
      />

      { error && <span style={{ color: '#f00' }}>{error}</span> }
    </div>
  );
}