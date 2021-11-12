import { useFiles } from '../../hooks/useFiles';

import { Container, FileInfo } from './styles';

export function FileList() {
  const { uploadedFiles, deleteFile } = useFiles();

  return (
    <Container>
      {uploadedFiles.map(file => (
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
        </li>
      ))}
    </Container>
  );
}