import { Box, Text } from '@chakra-ui/react';
import { ReactNode, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { useFiles } from '../../hooks/useFiles';

type UploadMessageProps = {
  children: ReactNode;
  type?: "default" | "error" | "success";
}

const messageColors = {
  default: 'gray.600',
  error: 'red.300',
  success: 'green.300'
}

const UploadMessage = ({ children, type }: UploadMessageProps) => (
  <Text
    display="flex"
    justifyContent="center"
    alignItems="center"
    paddingY={4}
    color={messageColors[type || 'default']}
  >
    {children}
  </Text>
);

export function Dropzone() {
  const { handleUpload } = useFiles();

  const onDrop = useCallback((files) => {
    handleUpload(files);
  }, [handleUpload])


  const { getInputProps, getRootProps, isDragActive,  isDragReject } = useDropzone({
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    onDrop,
  });
  
  const renderDragMessage = () => {
    if (!isDragActive) {
      return (
        <UploadMessage>Arraste arquivos aqui...</UploadMessage>
      );
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error">Tipo de arquivo não suportado</UploadMessage>
      );
    }

    return (
      <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
    );
  };


  return(
    <Box
      border="1px dashed"
      borderColor={
        (isDragActive && "green.300") || 
        (isDragReject && "red.300") ||
        "gray.300"
      }
      borderRadius="4px"
      cursor="pointer"
      {...getRootProps()} 
    >
      <input {...getInputProps()} />
      {renderDragMessage()}
    </Box>
  );
}