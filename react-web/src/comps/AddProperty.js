import React from 'react';
import { useColorMode, useColorModeValue, Box, Text, ChakraProvider, transition, Tooltip } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import theme from '../theme';
import { NavLink } from 'react-router-dom';

export const AddProperty = props => {

  return (
    <ChakraProvider theme={theme}>
        <Tooltip hasArrow openDelay={500} label="Add a new property" aria-label='A tooltip'>
          <NavLink to={'/add-property'}>
            
         
            <Box 
                h={'15rem'}
                w={'15rem'}
                borderRadius={'20'}
                justifyContent={'center'}
                alignContent={'center'}
                alignItems={'center'}
                textAlign={'center'}
                display={'flex'}
                bgSize={'cover'}
                bgPosition={'center'}
                bgColor={'gray.700'}
                bgClip={'border-box'}
                _hover={{ transform: 'scale(1.05)', transition: 'all 0.2s ease-in-out' }}
            >
                <AddIcon boxSize={'50%'} />
                
            </Box>
          </NavLink>
        </Tooltip>
    </ChakraProvider>
  );
};
