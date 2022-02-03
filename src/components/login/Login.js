import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const [Email, setEmail] = useState();
  const [EmailReset, setEmailReset] = useState();
  const [Password, setPassword] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = useRef();

  const handleSignIn = () => {
    !!Email && !!Password
      ? toast({
          title: 'Data Completed.',
          position: 'top',
          description: `Mail: ${Email} - Password: ${Password}`,
          status: 'success',
          duration: 6000,
          isClosable: true,
        })
      : toast({
          title: 'Missing Login information!',
          position: 'top',
          description: 'Please complete both fields and try again.',
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };

  useEffect(() => {
    setEmailReset(Email);
  }, [Email]);

  const handleForgotPassword = () => {
    !!EmailReset
      ? toast({
          title: 'Data Completed for Password Reset.',
          position: 'top',
          description: `Mail: ${EmailReset}`,
          status: 'success',
          duration: 6000,
          isClosable: true,
        })
      : toast({
          title: 'Missing Reset Password information!',
          position: 'top',
          description: 'Please complete the email field next time :)',
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
    onClose();
  };

  return (
    <>
      <Box
        marginY={'3vh'}
        justify={'center'}
        bg={useColorModeValue('white', 'gray.800')}
        pb={"2%"}
        mt={"2.5%"}
      >
        <Stack spacing={2} mx={'auto'} maxW={'lg'} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Ortex Login</Heading>
            <Text textAlign={'center'} fontSize={'sm'} color={'gray.600'}>
              This form isnt connected with anything and will not store any of
              your data!
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('gray.50', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  value={Email}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  value={Password}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember Me</Checkbox>
                  <Link color={'blue.400'} onClick={onOpen}>
                    Forgot Password?
                  </Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  isLoading={loading}
                  color={'white'}
                  _hover={{
                    bg: 'blue.600',
                  }}
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset your Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email address:</FormLabel>
              <Input ref={initialRef} type={'email'} value={EmailReset} onChange={e => setEmailReset(e.target.value)}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleForgotPassword}>
              Send Email
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
