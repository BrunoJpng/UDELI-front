import { useMemo } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { 
  MdKeyboardArrowLeft, 
  MdKeyboardArrowRight,
  MdArrowDropDown,
  MdArrowDropUp,
} from 'react-icons/md';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Button,
  ButtonGroup,
  chakra,
} from '@chakra-ui/react';

type Data = {
  name: string;
  value: number;
}

type TableProps = {
  data: Data[];
  title: string;
  headerName: string;
  headerValue: string;
  pageSize: number;
}

export function Table(props: TableProps) {
  const columns = useMemo(() => [
    { Header: props.headerName, accessor: 'name' },
    { Header: props.headerValue, accessor: 'value', isNumeric: true },
  ], [props.headerName, props.headerValue]);

  const data = useMemo(() => props.data, [props])

  const { 
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable({ 
    columns, 
    data,
    initialState: { pageSize: props.pageSize }
  }, useSortBy, usePagination);

  return (
    <Box width={{ sm: "100%", md: "auto" }}>
      <ChakraTable variant='simple' {...getTableProps()}>
        <TableCaption>{props.title}</TableCaption>

        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  key={column.id}
                  isNumeric={column.isNumeric}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted && (
                      column.isSortedDesc 
                      ? <MdArrowDropDown size={24} aria-label="Ordem decrescente" />
                      : <MdArrowDropUp size={24} aria-label="Ordem crescente" />
                    )}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <Tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td
                      key={cell.row}
                      isNumeric={cell.column.isNumeric}
                      maxWidth="250px"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>

      <ButtonGroup>
        <Button
          onClick={previousPage}
          disabled={!canPreviousPage}
          _focus={{ outline: "none" }}
        >
          <MdKeyboardArrowLeft size={24} />
        </Button>
        <Button
          onClick={nextPage}
          disabled={!canNextPage}
          _focus={{ outline: "none" }}
        >
          <MdKeyboardArrowRight size={24} />
        </Button>
      </ButtonGroup>
    </Box>
  )
}