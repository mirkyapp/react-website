import React from 'react';
import { Box, Text, ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { FaHome, FaUsers } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillCloseCircle } from 'react-icons/ai'; 
import {HiDocumentReport, HiOutlineStatusOnline} from 'react-icons/hi';
import { IoSettingsSharp } from 'react-icons/io5';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

export const PropDashSidebar = props => {

    const [isCollapsed, setIsCollapsed] = React.useState(true);

  return (
    <ChakraProvider theme={theme}>
        
        {!isCollapsed ? (
            <Box
                backgroundColor={'rgba(180, 180, 180, 0.2)'}
                backdropFilter={'blur(10px)'}
                boxShadow={'rgba(28, 28, 28, 0.2) 0px 0px 10px'}
                borderRadius={'13px'}
                h={'97vh'}
                margin={'1rem'}
                pos={'fixed'}
                w={'10em'}
                p={'1'}
                zIndex={'1'}
                top={'0'}
            >
                <Box h="88%">
                    <Box display={'flex'}flexDir={'row'} p="1" onClick={() => { setIsCollapsed(true) }} cursor="pointer" justifyContent={'right'} alignItems="end">
                        <AiFillCloseCircle size={'2em'} />
                    </Box>

                    <Box h={10} />

                    <Box display={'flex'}flexDir={'row'} p="3" cursor="pointer" _hover={{ backgroundColor: "whiteAlpha.300", borderRadius:'13' }}>
                        <FaHome size={'1.7em'} />
                        <Text fontSize={'xl'} fontWeight={'bold'} ml={'0.5rem'}>Home</Text>
                    </Box>

                    <Box h={2} />

                    <Box display={'flex'}flexDir={'row'} p="3" cursor="pointer" _hover={{ backgroundColor: "whiteAlpha.300", borderRadius:'13' }}>
                        <HiDocumentReport size={'1.7em'} />
                        <Text fontSize={'xl'} fontWeight={'bold'} ml={'0.5rem'}>Reports</Text>
                    </Box>

                    <Box h={2} />

                    <Box display={'flex'}flexDir={'row'} p="3" cursor="pointer" _hover={{ backgroundColor: "whiteAlpha.300", borderRadius:'13' }}>
                        <FaUsers size={'1.7em'} />
                        <Text fontSize={'xl'} fontWeight={'bold'} ml={'0.5rem'}>Members</Text>
                    </Box>

                    <Box h={2} />

                    <Box display={'flex'}flexDir={'row'} p="3" cursor="pointer" _hover={{ backgroundColor: "whiteAlpha.300", borderRadius:'13' }}>
                        <HiOutlineStatusOnline size={'1.7em'} />
                        <Text fontSize={'xl'} fontWeight={'bold'} ml={'0.5rem'}>Uptime</Text>
                    </Box>
                </Box>

                <Box >
                    <Box display={'flex'}flexDir={'row'} p="3" verticalAlign={'bottom'} cursor="pointer" _hover={{ backgroundColor: "whiteAlpha.300", borderRadius:'13' }}>
                        <IoSettingsSharp size={'1.7em'} />
                        <Text fontSize={'xl'} fontWeight={'bold'} ml={'0.5rem'}>Admin</Text>
                    </Box>
                    <NavLink to="/properties">
                        <Box display={'flex'}flexDir={'row'} p="3" verticalAlign={'bottom'} cursor="pointer" _hover={{ backgroundColor: "whiteAlpha.300", borderRadius:'13' }}>
                            <IoMdArrowRoundBack size={'1.7em'} />
                            <Text fontSize={'xl'} fontWeight={'bold'} ml={'0.5rem'}>Back</Text>
                        </Box>
                    </NavLink>
                </Box>
            </Box>
        ) : (
            <Box 
                backgroundColor={'rgba(180, 180, 180, 0.2)'}
                backdropFilter={'blur(10px)'}
                boxShadow={'rgba(28, 28, 28, 0.2) 0px 0px 10px'}
                h={'100vh'}
                margin={'0'}
                pos={'fixed'}
                w={'3em'}
                p={'2.5'}
                zIndex={'1'}
                top={'0'}
            >   <Box h="90%">
                    <Box h={5} />
                    <GiHamburgerMenu size={'1.7em'} onClick={() => { setIsCollapsed(false) }} cursor="pointer" _hover={{ backgroundColor: "whiteAlpha.300", borderRadius:'13' }} />
                    <Box h={10} />
                    <FaHome size={'1.7em'} cursor="pointer" _hover={{ backgroundColor: "whiteAlpha.300", borderRadius:'13' }} />
                    <Box h={10} />
                    <HiDocumentReport size={'1.7em'} cursor="pointer" _hover={{ backgroundColor: "whiteAlpha.300", borderRadius:'13' }} />
                    <Box h={10} />
                    <FaUsers size={'1.7em'} cursor="pointer" _hover={{ backgroundColor: "whiteAlpha.300", borderRadius:'13' }} />
                    <Box h={10} />
                    <HiOutlineStatusOnline size={'1.7em'} cursor="pointer" _hover={{ backgroundColor: "whiteAlpha.300", borderRadius:'13' }} />
                </Box>
                <Box >
                    <IoSettingsSharp size={'1.7em'} cursor="pointer" _hover={{ backgroundColor: "whiteAlpha.300", borderRadius:'13' }} />
                    <Box h={4} />
                    <NavLink to="/properties">
                        <IoMdArrowRoundBack size={'1.7em'} cursor="pointer" _hover={{ backgroundColor: "whiteAlpha.300", borderRadius:'13' }} />
                    </NavLink>
                </Box>
            </Box>
        )}
        

    </ChakraProvider>
  );
};
