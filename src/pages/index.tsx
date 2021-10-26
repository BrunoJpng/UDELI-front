import { useRouter } from 'next/router';

import { Upload } from '../components/Upload';
import { FileList } from '../components/FileList';

import { Container } from '../styles/pages/Home';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/charts');
  }

  return (
    <Container>
      <div>
        <Upload />
        <FileList />
      </div>

      <button onClick={handleClick}>Analisar</button>
    </Container>
  )
}
