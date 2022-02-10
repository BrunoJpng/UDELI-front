import { useState } from "react";
import { 
  Box, 
  chakra, 
  Flex, 
  Text, 
  useMultiStyleConfig,
} from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';

type DatePickerProps = {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const ChakraDatePicker = chakra(ReactDatePicker);

export function DatePicker({ startDate, endDate, setStartDate, setEndDate }: DatePickerProps) {
  const [minDate,] = useState(startDate);
  const [maxDate,] = useState(endDate);

  const styles = useMultiStyleConfig('Input', {});

  return (
    <Flex
      alignItems="center" 
      justifyContent="space-evenly"
    >
      <Box textAlign="initial">
        <Text>De:</Text>
        <ChakraDatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          minDate={minDate}
          maxDate={maxDate}
          startDate={startDate}
          endDate={endDate}
          dateFormat="MM/yyyy"
          locale={ptBR}
          showMonthYearPicker
          __css={styles.field}
        />
      </Box>

      <Box textAlign="initial">
        <Text>Até:</Text>
        <ChakraDatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          minDate={minDate}
          maxDate={maxDate}
          startDate={startDate}
          endDate={endDate}
          dateFormat="MM/yyyy"
          locale={ptBR}
          showMonthYearPicker
          __css={styles.field}
        />
      </Box>
    </Flex>
  );
}