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

  const [dateRange, setDateRange] = useState(defaultValue || [null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      getValue: (ref: any) => {
        return {
          from: ref.props.startDate, 
          to: ref.props.endDate};
      },
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <label htmlFor={fieldName}>{label}</label>
      <ReactDatepicker
        id={fieldName}
        ref={datepickerRef}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        maxDate={new Date()}
        onChange={(update) => {setDateRange(update)}}
        locale={ptBR}
        dateFormat="dd/MM/yyyy"
        placeholderText="Selecione o período"
        isClearable
        fixedHeight
        withPortal
        {...rest}
      />
    </div>
  );
}