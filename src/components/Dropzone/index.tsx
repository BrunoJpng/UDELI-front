import { Box, Text } from '@chakra-ui/react';
import { ReactNode, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

import { useFiles } from '../../hooks/useFiles';

type DropzoneProps = {
  name: string;
}

type DropzoneRefProps = HTMLInputElement & {
  acceptedFiles: any;
}

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

export function Dropzone({ name }: DropzoneProps) {
  const dropzoneRef = useRef<DropzoneRefProps>(null);
  const { uploadedFiles, handleUpload } = useFiles();

  useEffect(() => {
    if (dropzoneRef.current) {
      dropzoneRef.current.acceptedFiles = uploadedFiles;
    }
  }, [uploadedFiles]);

  const { getInputProps, getRootProps, isDragActive,  isDragReject } = useDropzone({
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    onDrop: onDropAcceptedFiles => {
      if (dropzoneRef.current) {
        handleUpload(onDropAcceptedFiles);
      }
    },
  });
  
  const renderDragMessage = () => {
    if (!isDragActive) {
      return (
        <UploadMessage>
          Arraste arquivos aqui ...
        </UploadMessage>
      )
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error">
          Arquivo não suportado
        </UploadMessage>
      )
    }

    return (
      <UploadMessage type="success">
        Solte os arquivos aqui
      </UploadMessage>
    )
  };


  return(
    <div>
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
        onClick={() => dropzoneRef.current?.click()}
      >
        <input {...getInputProps()} ref={dropzoneRef} />
        {renderDragMessage()}
      </Box>
    </div>
  );
}