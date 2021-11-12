import { useEffect, useRef, useState } from 'react';
import ReactDatepicker, { ReactDatePickerProps } from 'react-datepicker';
import { useField } from '@unform/core';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css'

type DatepickerProps = Omit<ReactDatePickerProps, 'onChange'> & {
  name: string;
  label: string;
}

export function Datepicker({ label, name, ...rest }: DatepickerProps) {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      }
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <label htmlFor={fieldName}>{label}</label>
      <ReactDatepicker
        id={fieldName}
        ref={datepickerRef}
        selected={date}
        onChange={setDate}
        dateFormat="dd/MM/yyyy"
        locale={ptBR}
        {...rest}
      />
    </div>
  );
}