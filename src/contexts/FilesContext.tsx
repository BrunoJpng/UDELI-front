import { createContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import filesize from "filesize";

type FileProps = {
  id: string;
  name: string;
  readableSize: string;
  file: File | null;
}

type FileContextData = {
  uploadedFiles: FileProps[];
  deleteFile: (id: string) => void;
  handleUpload: (files: File[]) => void;
}

type FileContextProviderProps = {
  children: ReactNode;
}

export const FileContext = createContext({} as FileContextData);

export function FileContextProvider({children}: FileContextProviderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);

  const handleUpload = (files: File[]) => {
    const newUploadedFiles = files.map(file => ({
      file,
      id: uuidv4(),
      name: file.name,
      readableSize: filesize(file.size),
      progress: 0,
      uploaded: false,
      error: false,
    }));

    setUploadedFiles(uploadedFiles.concat(newUploadedFiles));
  };

  const deleteFile = (id: string) => {
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