import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useState } from 'react';
import { PriceCard } from './../extra/priceCard';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      target={'_blank'}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const socket = new WebSocket(
  'wss://stream.tradingeconomics.com/?client=guest:guest'
);
const apiCall = { topic: 'subscribe', to: 'EURUSD:CUR' };

socket.onopen = () => {
  socket.send(JSON.stringify(apiCall));
};

export default function Footer() {
  const [socketData, setSocketData] = useState();

  socket.onmessage = _.throttle(
    event => {
      const json = JSON.parse(event.data);

      try {
        if ((json.event = 'data')) {
          console.log('Data: ', JSON.parse(event.data));
          setSocketData(JSON.parse(event.data));
        }
      } catch (err) {
        console.log(err);
      }
    },
    6000,
    { leading: false }
  );

  const diffPercent = (a, b) => {
    const numberPercent = 100 * Math.abs((a - b) / ((a + b) / 2));
    return numberPercent.toPrecision(3);
  };

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={2}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <PriceCard
          data={{
            label: socketData?.topic,
            value: socketData?.price,
            change: diffPercent(socketData?.price, socketData?.prev),
            currency: '$',
          }}
        />
        <Text>© {new Date().getFullYear()} - Developed by Benjamin Oliva.</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'GitHub'} href={'https://github.com/BenjaOliva'}>
            <FaGithub />
          </SocialButton>
          <SocialButton
            label={'LinkedIn'}
            href={
              'https://www.linkedin.com/in/benjamin-oliva-clari%C3%A1-953454181/'
            }
          >
            <FaLinkedin />
          </SocialButton>
          <SocialButton
            label={'Mail'}
            href={'mailto:benjaminoliva14@gmail.com'}
          >
            <FaEnvelope />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
