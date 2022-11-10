import React from 'react';
import { Box, Text, ChakraProvider, Heading, Icon } from '@chakra-ui/react';
import theme from '../theme';

export const ProductFeature = props => {

  return (
    <ChakraProvider theme={theme}>
        
        <Box 
          bgColor={'whiteAlpha.300'} 
          borderRadius='13' 
          p={8} 
          textAlign={'left'}
        >
          <Box display={'flex'} flexDir={'row'}>
            {/* <Icon as={props.icon} w={6} h={6} color={'brandPink.500'} mr={3} mt={2} /> */}
            {props.icon}
            <Heading
              fontSize={'2xl'}
              fontWeight={'bold'}
              mb={4}
            >
              {props.title}
            </Heading>
          </Box>

          <Text
            lineHeight={'1.5'}
            color={'gray.300'}
          >
            {props.text}
          </Text>

        </Box>
        
    </ChakraProvider>
  );
};
