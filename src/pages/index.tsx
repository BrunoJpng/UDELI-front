import { ChangeEvent, FormEvent, useState } from 'react'

import { api } from '../services/api';

import styles from '../styles/Home.module.css'

export default function Home() {
  const [file, setFile] = useState<File>();
  const [column, setColumn] = useState("");
  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("file", file);
    formData.append("column", column);

    const { data } = await api.post("/upload", formData);
    console.log(data);
  }

  function handleSelectFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    setFile(event.target.files[0])
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          onChange={handleSelectFile}
        />

        <input
          type="text"
          name="column"
          value={column}
          onChange={e => setColumn(e.target.value)}
        />
        
        <button type="submit">Enviar arquivo</button>
      </form>
    </div>
  )
}
