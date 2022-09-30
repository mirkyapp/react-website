import * as React from 'react';
import { ChakraProvider, Text, Link, Badge, Button, Box, Image, ColorModeScript, Show, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Hide, IconButton, Tag } from '@chakra-ui/react';
import { NavLink, useLocation } from "react-router-dom";
import Logo from  '../assets/logo-09.png'
import theme from '../theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { GiHamburger, GiHamburgerMenu } from 'react-icons/gi';
import Cookies from 'universal-cookie';


function Header() {
    const cookies = new Cookies();
    const [size, setSize] = React.useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ isLoggedIn, setIsLoggedIn ] = React.useState(false)
    

    const handleClick = () => {
        onOpen()
    }

    const location = useLocation();

    const [isHome, setIsHome] = React.useState(false)
    const [isDocs, setIsDocs] = React.useState(false)
    const [isApp, setIsApp] = React.useState(false)

    React.useEffect(() => {
        if (location.pathname === '/') {
            setIsHome(true)
            setIsDocs(false)
            setIsApp(false)
        } else if (location.pathname === '/about') {
            setIsHome(false)
            setIsDocs(true)
            setIsApp(false)
        } else if (location.pathname === '/app') {
            setIsHome(false)
            setIsDocs(false)
            setIsApp(true)
        }
    }, [location])

    React.useEffect(() => {
        const anon = cookies.get('mirky-anon-session-id')
        if (anon === undefined) {
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true)
        }
    }, [])

  return (
    <ChakraProvider backgroundColor={'#1A202C'} justifyContent={'center'} theme={theme}>
        
      <Box 
        w={'90vw'} 
        p={'1.5rem'}
        pb={'3rem'}
        position={"sticky"}
        top={'0'}
        height={'fit-content'}
        backgroundColor={'rgba(180, 180, 180, 0.2)'}
        backdropFilter={'blur(10px)'}
        boxShadow={'rgba(28, 28, 28, 0.2) 0px 0px 10px'}
        borderRadius={'13px'}
        margin={'1rem auto'}
        >
            <Box
                width={'100%'}
                justifyContent={'right'}
                right={'30px'}
                position={'absolute'}
                alignItems={'flex-end'}
                mt={-3}
                alignSelf={'center'}
                textAlign={'right'}
            >   

                <Show breakpoint='(max-width: 750px)'>
                <IconButton
                    onClick={() => handleClick(size)}
                    key={size}
                    color={'white'}
                    backgroundColor={'rgba(180, 180, 180, 0.2)'}
                    icon={<GiHamburgerMenu />} 
                    mt={1}
                    ></IconButton>

                <Drawer bgColor={'#010715'} onClose={onClose} isOpen={isOpen} size={'xs'}>
                    <DrawerOverlay  />
                    <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader  bgColor={'#010715'} fontSize={50} fontWeight={700}>Menu</DrawerHeader>
                    <DrawerBody bgColor={'#010715'}>
                        <NavLink to={'/'}>
                            <Link fontSize={30} fontWeight={700}>
                                Home
                            </Link>
                        </NavLink>

                        <Box w={10} />

                        {/* <NavLink to={'/about'}>
                            <Link fontSize={30} fontWeight={700}>
                                About
                            </Link>
                        </NavLink>

                        <Box w={10} />

                        <NavLink to={'/app'}>
                            <Link fontSize={30} fontWeight={700}>
                                App
                            </Link>
                        </NavLink> */}
                    </DrawerBody>
                    </DrawerContent>
                </Drawer>
                </Show>
                
                <Hide breakpoint='(max-width: 750px)'>
                    {isHome ? (
                        
                        <Box p={3} >
                            <NavLink to={'/'}>
                                <Link p={3} color={'white'} mr={4} borderRadius={10} bgGradient={'linear(to-r, brandBlue.500, brandPink.500)'} fontWeight={800} _hover={{textDecoration:"none"}}>
                                    Home
                                </Link>
                            </NavLink>

                            <NavLink to={'/docs'}>
                                <Link mr={4} p={3} color={'white'} _hover={{ color: "brandBlurple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                    Docs
                                </Link>
                            </NavLink>

                            <NavLink to={'/about'}>
                                <Link mr={4} p={3} color={'white'} _hover={{ color: "brandBlurple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                    Why mirky?
                                </Link>
                            </NavLink>

                            <NavLink to={'/signup'}>
                                <Link p={3} color={'white'} mr={2} borderRadius={10} bgColor={'brandBlurple.500'} fontWeight={800} _hover={{backgroundColor: "brandBlurple.700"}}>
                                    {isLoggedIn ? (
                                        'Get Started'
                                    ) : (
                                        'Dashboard'
                                    )}
                                </Link>
                            </NavLink>

                        </Box>

                    ) : isDocs ? (
                        <Box p={3} >
                            <NavLink to={'/home'}>
                                <Link mr={4} p={3} color={'white'} _hover={{ color: "brandBlurple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                    Home
                                </Link>
                            </NavLink>

                            <NavLink to={'/docs'}>
                                <Link p={3} color={'white'} mr={4} borderRadius={10} bgGradient={'linear(to-r, brandBlue.500, brandPink.500)'} fontWeight={800} _hover={{textDecoration:"none"}}>
                                    Docs
                                </Link>
                            </NavLink>

                            <NavLink to={'/about'}>
                                <Link mr={4} p={3} color={'white'} _hover={{ color: "brandBlurple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                    Why mirky?
                                </Link>
                            </NavLink>

                            <NavLink to={'/signup'}>
                                <Link p={3} color={'white'} mr={2} borderRadius={10} bgColor={'brandBlurple.500'} fontWeight={800} _hover={{backgroundColor: "brandBlurple.700"}}>
                                    {isLoggedIn ? (
                                        'Get Started'
                                    ) : (
                                        'Dashboard'
                                    )}
                                </Link>
                            </NavLink>

                        </Box>

                    ) : isApp ? (

                        <Box p={3} >
                            <NavLink to={'/'}>
                                <Link mr={4} p={3} color={'white'} _hover={{ color: "brandBlurple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                    Home
                                </Link>
                            </NavLink>

                            <NavLink to={'/docs'}>
                                <Link mr={4} p={3} color={'white'} _hover={{ color: "brandBlurple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                    Docs
                                </Link>
                            </NavLink>

                            <NavLink to={'/about'}>
                                <Link p={3} color={'white'} mr={4} borderRadius={10} bgGradient={'linear(to-r, brandBlue.500, brandPink.500)'} fontWeight={800} _hover={{textDecoration:"none"}}>
                                    Why Mirky?
                                </Link>
                            </NavLink>

                            <NavLink to={'/signup'}>
                                <Link p={3} color={'white'} mr={2} borderRadius={10} bgColor={'brandBlurple.500'} fontWeight={800} _hover={{backgroundColor: "brandBlurple.700"}}>
                                    {isLoggedIn ? (
                                        'Get Started'
                                    ) : (
                                        'Dashboard'
                                    )}
                                </Link>
                            </NavLink>

                        </Box>

                    ) : (

                        <Box p={3} >
                            <NavLink to={'/'}>
                                <Link mr={4} p={3} color={'white'} _hover={{ color: "brandBlurple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                    Home
                                </Link>
                            </NavLink>

                            <NavLink to={'/docs'}>
                                <Link mr={4} p={3} color={'white'} _hover={{ color: "brandBlurple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                    Docs
                                </Link>
                            </NavLink>

                            <NavLink to={'/about'}>
                                <Link mr={4} p={3} color={'white'} _hover={{ color: "brandBlurple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                    Why mirky?
                                </Link>
                            </NavLink>

                            <NavLink to={'/signup'}>
                                <Link p={3} color={'white'} mr={2} borderRadius={10} bgColor={'brandBlurple.500'} fontWeight={800} _hover={{backgroundColor: "brandBlurple.700"}}>
                                    {isLoggedIn ? (
                                        'Get Started'
                                    ) : (
                                        'Dashboard'
                                    )}
                                </Link>
                            </NavLink>

                        </Box>
                    )}
                </Hide>
                
            </Box>

            <Box
                width={'20%'}
                justifyContent={'left'}
                left={'10px'}
                position={'absolute'}
                alignItems={'center'}
                display={'flex'}
                flexDirection={'row'}
            >

                <Show breakpoint='(max-width: 330px)'>
                    <NavLink to={'/'}>
                        <Link>
                            <a>
                                <Image w={'60px'} mt={'-7px'} justifyContent={'left'} pos={'absolute'} left={'10px'} alignItems={'center'} src={Logo} alt='logo' />
                            </a>
                        </Link>
                    </NavLink>
                </Show>

                <Hide breakpoint='(max-width: 330px)'>

                <NavLink to={'/'}>
                    <Link>
                        <a>
                            <Image w={'60px'} mt={'-22px'} justifyContent={'left'} pos={'absolute'} left={'20px'} alignItems={'center'} src={Logo} alt='logo' />
                        </a>
                    </Link>
                </NavLink>

                <Text fontSize={25} ml={"90px"} mr={2} fontWeight={800} mt={'-2'}>mirky</Text>
                <Badge variant='solid' colorScheme='brandBlue' mt={-1}>
                    Beta
                </Badge>
                </Hide>
            </Box>
      </Box>

    </ChakraProvider>
  );
}

export default Header;