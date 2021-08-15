import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { useFiles } from '../../hooks/useFiles';

import { DropContainer, UploadMessage } from './styles';

export function Upload() {
  const { handleUpload } = useFiles();

  const onDrop = useCallback((files) => {
    handleUpload(files);
  }, [handleUpload]);

  const {
    getInputProps,
    getRootProps,
    isDragActive, 
    isDragReject
  } = useDropzone({
    accept: ["image/*"],
    onDrop
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
    <DropContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {renderDragMessage()}
    </DropContainer>
  );
}