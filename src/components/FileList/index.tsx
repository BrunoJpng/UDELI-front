import { MdCheckCircle, MdError, MdMoodBad } from "react-icons/md";
import {
  List,
  ListItem,
  Flex,
  chakra,
  Progress,
  Text,
  Box
} from '@chakra-ui/react';

import { useFiles } from '../../hooks/useFiles';

export function FileList() {
  const { uploadedFiles: files, deleteFile } = useFiles();

  if (!files.length) {
    return (
      <chakra.span color='gray.300'>
        <MdMoodBad size={24} style={{ margin: '0 auto' }} />
      </chakra.span>
    )
  }

  return (
    <List marginTop={5}>
      {files.map(file => (
        <ListItem 
          key={file.id} 
          color="gray.700"
          _notFirst={{ marginTop: 4 }}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Flex flexDirection="column">
              <Text fontWeight="semibold">{file.name}</Text>
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

            <Box>
              {file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
              {file.error && <MdError size={24} color="#e57878" />}
            </Box>
          </Flex>

          {!file.uploaded && !file.error && (
            <Progress size='xs' value={file.progress} />
          )}
        </ListItem>
      ))}
    </List>
  );
}