import { createContext, useState, useCallback, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import filesize from "filesize";

import { api } from "../services/api";

type IFile = {
  id: string;
  name: string;
  readableSize: string;
  uploaded?: boolean;
  // preview: string;
  file: File | null;
  progress?: number;
  error?: boolean;
  // url: string;
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

export function FileContextProvider({ children }: IFileContextProvider) {
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);

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

    api.post("/upload", data, {
      onUploadProgress: (progressEvent) => {
        let progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

        console.log(`O arquivo ${uploadedFile.name} está ${progress}% carregado...`);

        updateFile(uploadedFile.id, { progress });
      }
    }).then((response) => {
      console.log(`O arquivo ${uploadedFile.name} já foi enviado para o servidor!`);
      console.log(response.headers)
      updateFile(uploadedFile.id, { uploaded: true });
    }).catch(() => {
      updateFile(uploadedFile.id, { error: true })
    })
  }, [updateFile]);

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
    api.delete(`upload/${id}`)
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