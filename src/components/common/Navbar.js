import {
  Box,
  Image,
  Button,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/ortex-logo.png';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { Link as ReachLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Navbar = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Box
      top="0"
      boxShadow="2xl"
      h={'82px'}
      bg={useColorModeValue('gray.100', 'gray.800')}
      pt={1}
    >
      <Flex
        as="nav"
        px={3}
        h={16}
        alignItems={'center'}
        wrap="wrap"
        justifyContent={'space-between'}
      >
        <IconButton
          size={'md'}
          icon={
            isOpen ? (
              <center>
                <FaTimes></FaTimes>
              </center>
            ) : (
              <center>
                <FaBars></FaBars>
              </center>
            )
          }
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
            <Box bg={"gray.800"} rounded={10} paddingX={10} onClick={() => navigate("/")}>
              <Image w={'120px'} src={logo} />
            </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.900'),
              }}
              as={ReachLink}
              to={'/'}
            >
              Home
            </Link>
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <ColorModeSwitcher justifySelf="flex-end" mr="3px" />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box
          pt={3}
          mt={3}
          pb={3}
          display={{ md: 'none' }}
          minW={'100%'}
          bg={'gray.900'}
          style={{ borderRadius: '0px 0px 15px 15px', position: 'absolute' }}
          zIndex={0}
        >
          <Stack as={'nav'} spacing={4} mx={5}>
            <Button
              key={'Home'}
              onClick={() => {
                navigate('/');
                onClose();
              }}
            >
              Home
            </Button>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
