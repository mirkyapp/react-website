import { Box, Button, ChakraProvider, Grid, Heading, Text } from "@chakra-ui/react"
import Header from "../comps/Header"
import Footer from "../comps/Footer";
import theme from "../theme"
import { ProductFeature } from "../comps/ProductFeature"
import { FaInfoCircle, FaBullseye, FaTools, FaLock, FaCode, FaBalanceScale, FaDollarSign, FaUsers, FaPalette } from 'react-icons/fa';
import { MdPublic } from 'react-icons/md';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { NavLink } from "react-router-dom";

function AboutPage() {
    return (
        <ChakraProvider theme={theme}>
            <Box>
                <Header />

                <Box textAlign={'center'} mt={20} pr={'5vw'} pl={'5vw'} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>

                    
                    <Heading fontSize={'7xl'}>A developer first all-in-one</Heading>
                    <Heading fontSize={'7xl'}>analytics platform</Heading>

                    <Box h={3}></Box>

                    <Box w={'40vw'} margin={'auto'}>
                        <Text
                            pt={5}
                            color={'gray.400'}
                            fontWeight={'bold'}
                            lineHeight={'2'}
                            fontSize={'xl'}
                        >
                            Mirky is a fast, easy to use, reiable, and secure analytics platform for developers. Fully integrated into any website, app, or game. Create custom event trackers, public dashboards, real-time views, monitor uptime, and more. All in one sleek and simple platform.
                        </Text>
                    </Box>
                    <Box dis={'flex'} justifyContent={'center'} alignItems={'center'} margin={'auto'} pr='10' pl='10' w={'70vw'}>
                        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', sm:'repeat(1,1fr)' }} gap={4} mt={20}>
                            <ProductFeature
                                title={"Custom Events"}
                                text={"Create unique events, and define when they should be triggered to track less convential data such as game wins, or email changes. Integrate webhooks to notify your team when critical events occur."}
                                icon={<FaInfoCircle size={'1.5em'} color={'#E20D8B'} style={{ marginTop:'2', marginRight:'9' }} />}
                            />
                            <ProductFeature
                                title={"Public Dashboards"}
                                text={"Create public dashboards with brandable URLs to share your non-sensitive data with your team, or the world. We allow extensive customization to fit right in with your brand."}
                                icon={<MdPublic size={'1.7em'} color={'#E20D8B'} style={{ marginTop:'2', marginRight:'9' }} />}
                            />
                            <ProductFeature
                                title={"Real-Time Data"}
                                text={"View your data in real-time with our live updating graphs and tables. See your data as it happens, and make decisions based on the most up-to-date information."}
                                icon={<FaBullseye size={'1.5em'} color={'#E20D8B'} style={{ marginTop:'2', marginRight:'9' }} />}
                            />
                            <ProductFeature
                                title={"Universal"}
                                text={"We provide tools to track analytics from any website, game, app, or service you can imagine. If we don't support it nativly, we have a powerful API to create custome solutions."}
                                icon={<FaTools size={'1.5em'} color={'#E20D8B'} style={{ marginTop:'2', marginRight:'9' }} />}
                            />
                            <ProductFeature
                                title={"Secure"}
                                text={"Security is threaded into the fabric of our product. We use the latest security and encryption standards to keep you and your data safe. Every peice of data is encrypted using per-user / per-project encryption keys."}
                                icon={<FaLock size={'1.5em'} color={'#E20D8B'} style={{ marginTop:'2', marginRight:'9' }} />}
                            />
                            <ProductFeature
                                title={"Monitor Uptime"}
                                text={"Monitor the uptime of your website, game, or app. We provide a simple and easy to use uptime monitors to keep track of your services. They also work on the public dashboards."}
                                icon={<HiOutlineStatusOnline size={'2em'} color={'#E20D8B'} style={{ marginTop:'0', marginRight:'9' }} />}
                            />
                            <ProductFeature
                                title={"Developer First"}
                                text={"Mirky is for developers by developers. We know the challenges that come with some other analytics providers, and we strive to make it easy to use and integrate into your projects."}
                                icon={<FaCode size={'1.5em'} color={'#E20D8B'} style={{ marginTop:'2', marginRight:'9' }} />}
                            />
                            <ProductFeature
                                title={"Globally Compliant"}
                                text={"We are fully compliant with the GDPR, CCPA, and other global privacy laws. We also strive to make the the blurry area of privacy laws as clear as possible so you can focus on creating amazing services."}
                                icon={<FaBalanceScale size={'1.5em'} color={'#E20D8B'} style={{ marginTop:'2', marginRight:'9' }} />}
                            />
                            <ProductFeature
                                title={"Community"}
                                text={"We have a welcoming and active community of developers in our Discord server. Whenever you need help, wheter it be with our product, or your project, someone is always there to help."}
                                icon={<BsFillPeopleFill size={'1.5em'} color={'#E20D8B'} style={{ marginTop:'2', marginRight:'9' }} />}
                            />
                            <ProductFeature
                                title={"Free"}
                                text={"The core of our product is free to use. We offer paid tiers, however, we are working on a way for every developer to access the whole of our product for free (and maybe even get paid)."}
                                icon={<FaDollarSign size={'1.5em'} color={'#E20D8B'} style={{ marginTop:'2', marginRight:'9' }} />}
                            />
                            <ProductFeature
                                title={"Small Team"}
                                text={"We are a small team meaning we can put all of our focus on this product, unlike some other guys *cough* Google *cough*. Don't get trapped into vendor lock-in, support our team of dedicated developers."}
                                icon={<FaUsers size={'1.5em'} color={'#E20D8B'} style={{ marginTop:'2', marginRight:'9' }} />}
                            />
                            <ProductFeature
                                title={"Sleek Design"}
                                text={"We believe a product's back-end can be amazing, but without a beautiful front-end, it is hard to use. We strive to make our product as easy to use as possible, and we think we have done a pretty good job."}
                                icon={<FaPalette size={'1.5em'} color={'#E20D8B'} style={{ marginTop:'2', marginRight:'9' }} />}
                            />
                        </Grid>
                        <Box h={20}></Box>
                        <Heading>
                            New features are added every day!
                        </Heading>
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
                    </Box>
                    <Box h={20}></Box>
                </Box>

                <Footer />
                
            </Box>
        </ChakraProvider>
    )
}

export default AboutPage