import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError } from "react-icons/md";

import { useFiles } from '../../hooks/useFiles';

import { Container, FileInfo } from './styles';

export function FileList() {
  const { uploadedFiles: files, deleteFile } = useFiles();

  return (
    <Container>
      {files.map(file => (
        <li key={file.id}>
          <FileInfo>
            <div>
              <strong>{file.name}</strong>
              <span>
                {file.readableSize}
                <button type="button" onClick={() => deleteFile(file.id)}>Excluir</button>
              </span>
            </div>
          </FileInfo>

          <div>
            {!file.uploaded && !file.error && (
              <CircularProgressbar 
                styles={{
                  root: { width: 24 },
                  path: { stroke: "#7159c1"}
                }}
                strokeWidth={10}
                text={String(file.progress)}
                value={file.progress || 0}
              />
            )}

            {file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
            {file.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </Container>
  );
}