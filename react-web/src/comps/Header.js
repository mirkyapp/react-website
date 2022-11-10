import * as React from 'react';
import { ChakraProvider, Text, Link, Badge, Button, Box, Image, ColorModeScript, Show, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Hide, IconButton, Tag, useToast, Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverHeader, PopoverCloseButton, PopoverArrow } from '@chakra-ui/react';
import { NavLink, useLocation } from "react-router-dom";
import Logo from  '../assets/logo-09.png'
import theme from '../theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { GiHamburger, GiHamburgerMenu } from 'react-icons/gi';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Buffer } from 'buffer';


function Header() {
    const cookies = new Cookies();
    const [size, setSize] = React.useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ isLoggedIn, setIsLoggedIn ] = React.useState(false)
    const toast = useToast()

    const handleClick = () => {
        onOpen()
    }

    const location = useLocation();

    const [isHome, setIsHome] = React.useState(false)
    const [isAbout, setisAbout] = React.useState(false)
    const [isDocs, setIsDocs] = React.useState(false)

    const [userName, setUserName] = React.useState('')
    const [userEmail, setUserEmail] = React.useState('')
    const [userUid, setUserUid] = React.useState('')
    const [userFirstName, setUserFirstName] = React.useState('')
    const [userLastName, setUserLastName] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')

    React.useEffect(() => {
        if (location.pathname === '/') {
            setIsHome(true)
            setIsDocs(false)
            setisAbout(false)
        } else if (location.pathname === '/about') {
            setIsHome(false)
            setIsDocs(false)
            setisAbout(true)
        } else if (location.pathname === '/docs') {
            setIsHome(false)
            setIsDocs(true)
            setisAbout(false)
        } else if (location.pathname === '/home') {
            setIsHome(true)
            setIsDocs(false)
            setisAbout(false)
        }
    }, [location])

    React.useEffect(() => {
        const session = cookies.get('mirky-session')
        if (session === undefined) {
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true)

            if (userUid === '') {

                axios.get(`https://api.mirky.app/v1/user/${session.id}`, {
                    headers: {
                        "Authorization": "Basic " + Buffer.from(session.id + ":" + session.password).toString('base64'),
                    }
                }).then(res => {

                    setUserName(`${res.data.user.firstName} ${res.data.user.lastName}`)
                    setUserEmail(res.data.user.email)
                    setUserAvatar(res.data.user.avatar || 'https://www.aasciences.africa/themes/custom/aas/Images/The%20Secretariat/Default.jpg')
                    setUserUid(res.data.user.uid)
                    setUserFirstName(res.data.user.firstName)
                    setUserLastName(res.data.user.lastName)

                    var sessionData = cookies.get('mirky-session')
                    sessionData.name = `${res.data.user.firstName} ${res.data.user.lastName}`
                    sessionData.email = res.data.user.email
                    sessionData.username = res.data.user.username
                    sessionData.avatar = res.data.user.avatar || 'https://www.aasciences.africa/themes/custom/aas/Images/The%20Secretariat/Default.jpg'
                    sessionData.uid = res.data.user.uid
                    sessionData.firstName = res.data.user.firstName
                    sessionData.lastName = res.data.user.lastName
                    cookies.set('mirky-session', sessionData, { path: '/' })
                }).catch(err => {
                    console.log(err)
                    toast({
                        title: "An error occurred.",
                        description: "We were unable to fetch your account information. Please try again later.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    })
                })
            } else {
                
            }

        }
    }, [cookies, toast, userUid])

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
                        
                        <Box p={3} pr={7} >
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

                            {isLoggedIn ? (
                                <Box textAlign={'left'}>
                                    <Popover trigger='click'>
                                        <PopoverTrigger>
                                            <Image src={userAvatar} w={'10'} h={'10'} borderRadius={50} pos={'absolute'} top={1} right={0} ml={5} />
                                        </PopoverTrigger> 
                                        <PopoverContent width={'fit-content'} p={2} fontSize={'2xl'} >
                                            <PopoverArrow />
                                            <PopoverHeader fontWeight={'extrabold'} >{userName}</PopoverHeader>
                                            <PopoverBody>
                                                <Link href={'/properties'}>Dashboard</Link>
                                                <Box w={6} h={3} />
                                                <Link href={'/account'}>Account</Link>
                                                <Box w={6} h={10} />
                                                <Link href={'/account/logout'} backgroundColor={'red.300'} color={'red.900'} p={2} borderRadius={5}>Logout</Link>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Box>
                            ) : (
                                <NavLink to={'/login'}>
                                    <Link p={3} color={'white'} mr={2} borderRadius={10} bgColor={'brandBlurple.500'} fontWeight={800} _hover={{backgroundColor: "brandBlurple.700"}}>
                                        Login
                                    </Link>
                                </NavLink>
                            )}

                        </Box>

                    ) : isDocs ? (
                        <Box p={3} pr={7}>
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

                            {isLoggedIn ? (
                                <Box textAlign={'left'}>
                                    <Popover trigger='click'>
                                        <PopoverTrigger>
                                            <Image src={userAvatar} w={'10'} h={'10'} borderRadius={50} pos={'absolute'} top={1} right={0} ml={5} />
                                        </PopoverTrigger> 
                                        <PopoverContent width={'fit-content'} p={2} fontSize={'2xl'} >
                                            <PopoverArrow />
                                            <PopoverHeader fontWeight={'extrabold'} >{userName}</PopoverHeader>
                                            <PopoverBody>
                                                <Link href={'/properties'}>Dashboard</Link>
                                                <Box w={6} h={3} />
                                                <Link href={'/account'}>Account</Link>
                                                <Box w={6} h={10} />
                                                <Link href={'/account/logout'} backgroundColor={'red.300'} color={'red.900'} p={2} borderRadius={5}>Logout</Link>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Box>
                            ) : (
                                <NavLink to={'/login'}>
                                    <Link p={3} color={'white'} mr={2} borderRadius={10} bgColor={'brandBlurple.500'} fontWeight={800} _hover={{backgroundColor: "brandBlurple.700"}}>
                                        Login
                                    </Link>
                                </NavLink>
                            )}

                        </Box>

                    ) : isAbout ? (

                        <Box p={3} pr={7}>
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

                            {isLoggedIn ? (
                                <Box textAlign={'left'}>
                                    <Popover trigger='click'>
                                        <PopoverTrigger>
                                            <Image src={userAvatar} w={'10'} h={'10'} borderRadius={50} pos={'absolute'} top={1} right={0} ml={5} />
                                        </PopoverTrigger> 
                                        <PopoverContent width={'fit-content'} p={2} fontSize={'2xl'} >
                                            <PopoverArrow />
                                            <PopoverHeader fontWeight={'extrabold'} >{userName}</PopoverHeader>
                                            <PopoverBody>
                                                <Link href={'/properties'}>Dashboard</Link>
                                                <Box w={6} h={3} />
                                                <Link href={'/account'}>Account</Link>
                                                <Box w={6} h={10} />
                                                <Link href={'/account/logout'} backgroundColor={'red.300'} color={'red.900'} p={2} borderRadius={5}>Logout</Link>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Box>
                            ) : (
                                <NavLink to={'/login'}>
                                    <Link p={3} color={'white'} mr={2} borderRadius={10} bgColor={'brandBlurple.500'} fontWeight={800} _hover={{backgroundColor: "brandBlurple.700"}}>
                                        Login
                                    </Link>
                                </NavLink>
                            )}


                        </Box>

                    ) : (

                        <Box p={3} pr={7}>
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

                            {isLoggedIn ? (
                                <Box textAlign={'left'}>
                                    <Popover trigger='click'>
                                        <PopoverTrigger>
                                            <Image src={userAvatar} w={'10'} h={'10'} borderRadius={50} pos={'absolute'} top={1} right={0} ml={5} />
                                        </PopoverTrigger> 
                                        <PopoverContent width={'fit-content'} p={2} fontSize={'2xl'} >
                                            <PopoverArrow />
                                            <PopoverHeader fontWeight={'extrabold'} >{userName}</PopoverHeader>
                                            <PopoverBody>
                                                <Link href={'/properties'}>Dashboard</Link>
                                                <Box w={6} h={3} />
                                                <Link href={'/account'}>Account</Link>
                                                <Box w={6} h={10} />
                                                <Link href={'/account/logout'} backgroundColor={'red.300'} color={'red.900'} p={2} borderRadius={5}>Logout</Link>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Box>
                            ) : (
                                <NavLink to={'/login'}>
                                    <Link p={3} color={'white'} mr={2} borderRadius={10} bgColor={'brandBlurple.500'} fontWeight={800} _hover={{backgroundColor: "brandBlurple.700"}}>
                                        Login
                                    </Link>
                                </NavLink>
                            )}


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