import { Flex, Button } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import imageSrc from '../../../public/minesweeper-sprites.png';
import useCreateField from '../../hooks/useCreateField';

function Field() {
  const field = useCreateField(16);

  return (
    <Flex flexWrap="wrap" maxW="272px" border="5px solid #939393">
      {field.map((item) => (
        <Button
          cursor="pointer"
          key={uuidv4()}
          backgroundImage={imageSrc}
          backgroundRepeat="no-repeat"
          backgroundPosition="0px -50px"
          outline="none"
          border="none"
          height="17px"
          width="17px"
        >
          {item}
        </Button>
      ))}
    </Flex>
  );
}

export default Field;
