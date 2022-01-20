import { MdCheckCircle, MdError } from "react-icons/md";
import {
  List,
  ListItem,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  chakra
} from '@chakra-ui/react';

import { useFiles } from '../../hooks/useFiles';

export function FileList() {
  const { uploadedFiles: files, deleteFile } = useFiles();

  return (
    <List marginTop="20px">
      {files.map(file => (
        <ListItem 
          key={file.id} 
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="gray.700"
          _notFirst={{ marginTop: 4 }}
        >
          <Flex alignItems="center">
            <Flex flexDirection="column">
              <strong>{file.name}</strong>
              <chakra.span
                fontSize="12px"
                color="gray.600"
                marginTop="5px"              
              >
                {file.readableSize}
                <chakra.button
                  type="button"
                  background="transparent"
                  color="red.400"
                  marginLeft="5px"
                  onClick={() => deleteFile(file.id)}
                >
                  Excluir
                </chakra.button>
              </chakra.span>
            </Flex>
          </Flex>

          <div>
            {!file.uploaded && !file.error && (
              <CircularProgress value={file.progress || 0} size="24px">
                <CircularProgressLabel>{file.progress}</CircularProgressLabel>
              </CircularProgress>
            )}

            {file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
            {file.error && <MdError size={24} color="#e57878" />}
          </div>
        </ListItem>
      ))}
    </List>
  );
}