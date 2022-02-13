import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100'
      }
    }
  },
  fonts: {
    body: 'Poppins, system-ui, sans-serif',
    heading: 'Archivo, system-ui, sans-serif',
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  },
  radii: {
    sm: '5px',
    md: '8px',
  },
})