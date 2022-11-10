import { Box, Button, ChakraProvider, Divider, Heading, Image, Text } from "@chakra-ui/react";
import Header from "../comps/Header";
import theme from "../theme";

import Wave1 from  '../assets/wave-2.png'
import Footer from "../comps/Footer";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header />
        <Box>

          <Box h={'70%'} w={'100vw'} p={'50'}>

            <Heading 
              textAlign={'center'}
              bgGradient='linear(to-r, #E20D8B, #6459F4,)'
              bgClip='text'
              size={["2xl", "4xl"]}
              pr={['0','15']}
              pl={['0','15']}
              w={'50vw'}
              margin={'auto'}
              lineHeight={'1.2'}
              fontWeight={'extrabold'}
            >
              The easiest way to track all your digital analytics.
            </Heading>

            <Text
              textAlign={'center'}
              fontSize={'xl'}
              fontWeight={'bold'}
              color={'gray.500'}
              w={'50vw'}
              margin={'auto'}
              mt={10}
            >
              Mirky allows you to get privacy first analytics on any website or app.
            </Text>

            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              mt={10}
              mb={10}
              flexDir={{ base: 'column', md: 'row' }}
            >
              <NavLink to='/signup'>
                <Button
                  mt={50}
                  colorScheme={"brandPurple"}
                  size={'lg'}
                  fontWeight={'bold'}
                  fontSize={'3xl'}
                  p={8}
                  mr={5}
                  ml={5}
                >
                  Get Started
                </Button>
              </NavLink>

              <NavLink to='/about'>
                <Button
                  mt={50}
                  colorScheme={"brandPurple"}
                  size={'lg'}
                  variant='outline'
                  fontWeight={'bold'}
                  fontSize={'3xl'}
                  ml={5}
                  mr={5}
                  p={8}
                >
                  Learn More
                </Button>
              </NavLink>

              
            </Box>
          </Box>

          <Image src={Wave1} w={'100vw'}/>

          <Box
            textAlign={'center'}
            w={'50vw'}
            margin={'auto'}
          >
            
            <Box 
              alignContent={'center'} 
              alignItems={'center'}
              justifyContent={'center'} 
              display={'flex'} 
            >
              <Heading size={'2xl'}>Why</Heading>
              <Box w={3}></Box>
              <Heading
                bgGradient='linear(to-r, brandPink.500, brandBlurple.500)' 
                bgClip='text'
                size={'2xl'}
                fontWeight={'extrabold'}
              >
                Mirky
              </Heading>
              <Box w={1}></Box>
              <Heading size={'2xl'}>?</Heading>
            </Box>

            <Text
              pt={5}
              color={'gray.400'}
              fontWeight={'bold'}
              lineHeight={'2'}
            >
              Mirky is a privacy first analytics platform that allows you to track all your digital analytics in one place. We provide code snippets, APIs, and packages for any platform, language, or framework. No cookies and fully compliant with GDPR, CCPA and PECR. With our state of the art public dashboards, you can share non-sensitive analytics with your visitors. We offer integrations with a plethora of apps, including Notion, Slack, Discord, and more. Create data alerts via webhooks, to be notified when specified events occur. Don't get trapped in vendor lock-in, ditch those big guys and come to Mirky.
            </Text>

          </Box>

          <Box h={10}></Box>

          <Box 
            alignContent={'center'} 
            alignItems={'center'}
            justifyContent={'center'} 
            display={'flex'} 
            flex={2}
            flexDir={{ base: 'column', md: 'row' }} 
            pl={50} pr={50} pb={50}
            mt={10}
            >

            <Box 
              w={'20rem'} 
              ml={5} mr={5} mb={5} 
              h={'15rem'} 
              backgroundColor={'whiteAlpha.300'} 
              borderRadius={20}
              p={8}
              textAlign={'center'}
              boxShadow={'base'}
            >
              <Heading pb={2} bgGradient='linear(to-r, brandPink.500, brandBlurple.500)' bgClip='text'>Private</Heading>
              <Divider />

              <Text pt={5}>
                Privacy is in our DNA. All our data is encrypted with per-user unique keys, meaning only you can decrypt your data.
              </Text>
            </Box>

            <Box 
              w={'20rem'} 
              ml={5} mr={5} mb={5} 
              h={'15rem'} 
              backgroundColor={'whiteAlpha.300'} 
              borderRadius={20}
              p={8}
              textAlign={'center'}
              boxShadow={'base'}
            >
              <Heading pb={2} bgGradient='linear(to-r, brandBlurple.500, brandPurple.500)' bgClip='text'>Anywhere</Heading>
              <Divider />

              <Text pt={5}>
                We provide tools to use Mirky on any website or app, no matter what framework or language you use.
              </Text>
            </Box>

            <Box 
              w={'20rem'} 
              ml={5} mr={5} mb={5} 
              h={'15rem'} 
              backgroundColor={'whiteAlpha.300'} 
              borderRadius={20}
              p={8}
              textAlign={'center'}
              boxShadow={'base'}
            >
              <Heading pb={2} bgGradient='linear(to-r, brandPurple.500, brandBlue.500)' bgClip='text'>Easy</Heading>
              <Divider />

              <Text pt={5}>
                Our systems are easy to impliment, with as little as one line of code. Data starts being collected immediately.
              </Text>
            </Box>

          </Box>
          <Box h={10}></Box>

        </Box>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default HomePage;
