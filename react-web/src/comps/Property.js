import React from 'react';
import { Box, Text, ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import logo from '../assets/app-icon-07.png';
import { NavLink } from 'react-router-dom';

export const Property = props => {

  return (
    <ChakraProvider theme={theme}>
        <Box 
            h={'15rem'}
            w={'15rem'}
            borderRadius={'20'}
            justifyContent={'center'}
            alignContent={'center'}
            alignItems={'center'}
            textAlign={'center'}
            display={'flex'}
            bgImage={props.logo}
            bgSize={'cover'}
            bgPosition={'center'}
            bgClip={'border-box'}
            _hover={{ transform: 'scale(1.05)', transition: 'all 0.2s ease-in-out', cursor: 'pointer' }}
        >
            <NavLink to={`/property/${props.id}/overview`}>
                <Box 
                    backgroundColor={'rgba(0, 0, 0, 0.5)'}
                    backdropFilter={'blur(5px)'}
                    boxShadow={'rgba(28, 28, 28, 0.2) 0px 0px 10px'}
                    h={'15rem'}
                    w={'15rem'}
                    borderRadius={'20'}
                    justifyContent={'center'}
                    alignContent={'center'}
                    alignItems={'center'}
                    textAlign={'center'}
                    display={'flex'}
                    flexDir={'column'}
                >
                    <Text
                        fontSize={'3xl'}
                        fontWeight={'bold'}

                    >
                        {props.name || 'Property Name'}
                    </Text>
                    <Text
                        mt={5}
                        fontSize={'xs'}

                    >
                        {props.id || 'Property ID'}
                    </Text>
                </Box>
            </NavLink>
        </Box>
    </ChakraProvider>
  );
};
