import { Box, Flex, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import { Indicator } from './Indicator'

function format(value, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    currency,
  }).format(value)
}

export function PriceCard(props) {
  const { label, currency, value, change } = props.data
  const isNegative = change < 0
  return (
    <Flex
      direction="column"
      align="center"
      p="1"
      px={20}
      bg={mode('white', 'gray.700')}
      rounded="8px"
      shadow="base"
      color={mode('gray.500', 'gray.400')}
      textAlign="center"
    >
      <Box>
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
          {label}
        </Text>
        <Stack direction="row" align="flex-start" my="1">
          <Text fontWeight="bold" fontSize="sm">
            {currency}
          </Text>
          <Text
            as="span"
            color={mode('gray.800', 'white')}
            fontSize="xl"
            fontWeight="bold"
            lineHeight="1"
          >
            {format(value, 'USD')}
          </Text>
        </Stack>
        <Indicator type={isNegative ? 'down' : 'up'} value={`${change}%`} />
      </Box>
    </Flex>
  )
}
