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
} from '@chakra-ui/react';
import { useState } from 'react';

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const toast = useToast();

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
  };

  return (
    <Box
      marginY={'3vh'}
      justify={'center'}
      bg={useColorModeValue('white', 'gray.800')}
      h={"69vh"}
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
                <Link
                  color={'blue.400'}
                  onClick={() => toast({
                    title: "This isn't developed... yet ;)",
                    position: 'top',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                  })}
                >
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
  );
}
