import { FileContextProvider } from '../contexts/FilesContext';

import { Upload } from '../components/Upload';
import { FileList } from '../components/FileList';

import { Container } from '../styles/Home';

export default function Home() {
  return (
    <FileContextProvider>
      <Container>
        <div>
          <Upload />
          <FileList />
        </div>
      </Container>
    </FileContextProvider>
  )
}
