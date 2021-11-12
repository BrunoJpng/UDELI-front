import { useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField } from '@unform/core';

import { useFiles } from '../../../hooks/useFiles';

import { Container, DropContainer, UploadMessage } from './styles';

type DropzoneProps = {
  name: string;
}

type DropzoneRefProps = HTMLInputElement & {
  acceptedFiles: any;
}

export function Dropzone({ name }: DropzoneProps) {
  const dropzoneRef = useRef<DropzoneRefProps>(null);
  const { fieldName, registerField, defaultValue = [] } = useField(name);
  const { uploadedFiles, handleUpload } = useFiles();

  useEffect(() => {
    if (dropzoneRef.current) {
      dropzoneRef.current.acceptedFiles = uploadedFiles;
    }
  }, [uploadedFiles]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: dropzoneRef.current,
      getValue: (ref: DropzoneRefProps) => {
        return ref.acceptedFiles || [];
      },
      clearValue: (ref: DropzoneRefProps) => {
        ref.acceptedFiles = [];
      },
      setValue: (ref: DropzoneRefProps, value) => {
        ref.acceptedFiles = value;
      }
    });
  }, [fieldName, registerField]);

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
      return <UploadMessage>Arraste arquivos aqui ...</UploadMessage>
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
  };


  return(
    <Container>
      <DropContainer {...getRootProps()} onClick={() => dropzoneRef.current?.click()}>
        <input {...getInputProps()} ref={dropzoneRef} />
        {renderDragMessage()}
      </DropContainer>
    </Container>
  );
}