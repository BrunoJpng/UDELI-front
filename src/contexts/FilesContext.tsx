import { createContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import filesize from "filesize";

import { api } from "../services/api";

type FileProps = {
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

type FileContextData = {
  uploadedFiles: FileProps[];
  dataAnalysis: any;
  deleteFile: (id: string) => void;
  handleUpload: (files: File[]) => void;
}

type FileContextProviderProps = {
  children: ReactNode;
}

export const FileContext = createContext({} as FileContextData);

export function FileContextProvider({children}: FileContextProviderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [dataAnalysis, setDataAnalysis] = useState([]);

  const updateFile = (id, data) => {
    setUploadedFiles((state) =>
      state.map((file) => (file.id === id ? { ...file, ...data } : file))
    );
  }

  const processUpload = (uploadedFile: FileProps) => {
    const formData = new FormData();

    if (uploadedFile.file) {
      formData.append("file", uploadedFile.file, uploadedFile.name);
    }

    api.post("/upload", formData, {
      onUploadProgress: (progressEvent) => {
        let progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        updateFile(uploadedFile.id, { progress });
      }
    }).then(response => {
      updateFile(uploadedFile.id, { uploaded: true });
      setDataAnalysis(state => state.concat(response.data));
    }).catch(() => {
      updateFile(uploadedFile.id, { error: true });
    });
  }

  const handleUpload = (files: File[]) => {
    const newUploadedFiles: FileProps[] = files.map(file => ({
      file,
      id: uuidv4(),
      name: file.name,
      readableSize: filesize(file.size),
      // preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      // url: "",
    }));

    setUploadedFiles(state => state.concat(newUploadedFiles));
    // newUploadedFiles.forEach(processUpload);
  };

  const deleteFile = (id: string) => {
    // api.delete(`upload/${id}`);
    setUploadedFiles(state => state.filter(file => file.id !== id));
  };
  
  return (
    <FileContext.Provider value={{
      uploadedFiles,
      dataAnalysis,
      deleteFile,
      handleUpload
    }}>
      {children}
    </FileContext.Provider>
  );
}