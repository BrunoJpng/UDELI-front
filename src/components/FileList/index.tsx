import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink, MdMoodBad } from 'react-icons/md';

import { useFiles } from '../../hooks/useFiles';

import { Container, FileInfo, Preview } from './styles';

export function FileList() {
  const { uploadedFiles, deleteFile } = useFiles();

  if (!uploadedFiles) {
    return (
      <span>
        <MdMoodBad size={24} color="#d5d2d2" />
      </span>
    )
  }

  return (
    <Container>
      {uploadedFiles.map(uploadedFile => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize} 
                {!!uploadedFile && (
                  <button onClick={e => deleteFile(uploadedFile.id)}>Excluir</button>
                )}
              </span>
            </div>
          </FileInfo>

          <div>
            {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgressbar 
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#7159c1' }
                }}
                strokeWidth={10}
                value={uploadedFile.progress || 0}
              />
            )}

            {uploadedFile.url && (
              <a href="#" target="_blank" rel="noopener noreferrer">
                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
              </a>
            )}
            {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
            {uploadedFile.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </Container>
  );
}