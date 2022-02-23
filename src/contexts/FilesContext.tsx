import { createContext, useState, useCallback, ReactNode } from "react";
import { useToast } from '@chakra-ui/react';
import { v4 as uuidv4 } from "uuid";
import filesize from "filesize";

import { api } from "../services/api";

type IFile = {
  id: string;
  name: string;
  readableSize: string;
  file: File | null;
  progress?: number;
  uploaded?: boolean;
  error?: boolean;
}

type IFileContextData = {
  uploadedFiles: IFile[];
  deleteFile: (id: string) => void;
  handleUpload: (files: File[]) => void;
}

type IFileContextProvider = {
  children: ReactNode;
}

export const FileContext = createContext({} as IFileContextData);

export function FileProvider({ children }: IFileContextProvider) {
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);
  const toast = useToast();

  const updateFile = useCallback((id, data) => {
    setUploadedFiles(state => 
      state.map(file => (file.id === id ? { ...file, ...data } : file))
    );
  }, []);

  const processUpload = useCallback((uploadedFile: IFile) => {
    const data = new FormData();

    if (uploadedFile.file) {
      data.append("file", uploadedFile.file, uploadedFile.name);
    }

    api.post("/planilhas", data, {
      onUploadProgress: (progressEvent) => {
        let progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

        console.log(`O arquivo ${uploadedFile.name} está ${progress}% carregado...`);

        updateFile(uploadedFile.id, { progress });
      }
    }).then((response) => {
      toast({
        title: 'Planilha enviada',
        description: response.data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      updateFile(uploadedFile.id, { 
        uploaded: true,
        id: response.data.id,
      });
    }).catch((error) => {
      toast({
        title: 'Erro',
        description: error.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      console.log(`Houve um problema para fazer upload do arquivo ${uploadedFile.name} no servidor.`);
      console.error(error.message);

      updateFile(uploadedFile.id, { error: true })
    });
  }, [toast, updateFile]);

  const handleUpload = useCallback((files: File[]) => {
    const newUploadedFiles: IFile[] = files.map(file => ({
      file,
      id: uuidv4(),
      name: file.name,
      readableSize: filesize(file.size),
      progress: 0,
      uploaded: false,
      error: false,
    }));

    setUploadedFiles(uploadedFiles.concat(newUploadedFiles));
    newUploadedFiles.forEach(processUpload);
  }, [processUpload, uploadedFiles]);

  const deleteFile = (id: string) => {
    api.delete(`planilhas/${id}`);
    setUploadedFiles(state => state.filter(file => file.id !== id));
  };
  
  return (
    <FileContext.Provider value={{
      uploadedFiles,
      deleteFile,
      handleUpload
    }}>
      {children}
    </FileContext.Provider>
  );
}