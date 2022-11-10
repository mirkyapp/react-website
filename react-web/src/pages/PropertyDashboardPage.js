import React from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Buffer } from 'buffer';
import { Box, Button, ChakraProvider, Grid, Heading, Menu, MenuButton, MenuItem, MenuList, Spinner, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import theme from "../theme";
import { PropDashSidebar } from "../comps/PropDashSidebar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaChevronDown } from "react-icons/fa";
import Footer from "../comps/Footer";
// import Header from "../comps/Header";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: true,
            },
        },
        y: {
            grid: {
                display: true,
            },
        },
    },

};


function PropertyDashboardPage() {
    const params = useParams();

    const [propId, setPropId] = React.useState(params.id);
    const [propData, setPropData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const cookies = new Cookies();
    const [session, setSession] = React.useState(cookies.get('mirky-session'));

    const labels = ['12am','3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm',];
    const rtuData = {
        labels,
        datasets: [
        {
            data: [223,202,212,290,250,220,220,230],
            backgroundColor: '#6459F4',
        },
        ],
    };

    const pvData = {
        labels,
        datasets: [
        {
            data: [9000,9590,10002,10504,10890,11005,11200,12000],
            backgroundColor: '#6459F4',
        },
        ],
    };


    React.useEffect(() => {
        setPropId(params.id);

        axios.get(`https://api.mirky.app/v1//property/fetch-prop/${propId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Basic " + Buffer.from(session.id + ":" + session.password).toString('base64'),
            },
        })
        .then(res => {
            setPropData(res.data.property);
            setIsLoading(false);
        })

    }, [params.id, session, propId]);

    return (
        <ChakraProvider theme={theme}>
            {isLoading ? (
                <Box display="flex" justifyContent={'center'} alignItems={"center"} alignContent={'center'} justifyItems={'center'} margin={'auto'} h={'100vh'}>
                    <Spinner size='xl' />
                </Box>
            ) : (
                <Box>
                    {/* <Header /> */}
                    <PropDashSidebar />
                    <Box
                    ml={'5em'}
                    mt={'3em'}
                    w={'30%'}
                    >


                        <Heading 
                            textAlign={'left'}
                            fontSize={'5xl'}
                            fontWeight={'extrabold'}
                            
                        >
                            Analytics
                        </Heading>

                        <Text
                            color={'gray.500'}
                            fontSize={'xl'}
                            fontWeight={'bold'}
                        >
                            {propData.propName}
                        </Text>
                        <Box h={5}/>
                        <Menu>
                        <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                            Past 24 Hours
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Last Hour</MenuItem>
                            <MenuItem>Last 24 Hours</MenuItem>
                            <MenuItem>Last 7 Days</MenuItem>
                            <MenuItem>Last 30 Days</MenuItem>
                            <MenuItem>Last 6 Moths</MenuItem>
                            
                        </MenuList>
                        </Menu>

                        <Box h={10} />

                        <Box dis={'flex'} w={'80vw'} p={10}>
                            <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', sm:'repeat(1,1fr)' }} gap={6}>

                                <Box
                                    p={5}
                                    shadow={'md'}
                                    borderWidth={'1px'}
                                    borderRadius={'lg'}
                                    backgroundColor={'rgba(180, 180, 180, 0.2)'}
                                >
                                    <Box display="flex" flexDir={'row'}>
                                        <Heading
                                            fontSize={'3xl'}
                                            fontWeight={'bold'}
                                            textAlign={'left'}
                                        >
                                            🟢 Real-Time Users
                                        </Heading>
                                        <Stat textAlign={'right'} mt={-3}>
                                            <StatNumber fontSize={'5xl'} fontWeight={'black'}>340</StatNumber>
                                            <StatHelpText fontSize={'xl'}>
                                            <StatArrow type='decrease'  />
                                            2.36%
                                            </StatHelpText>
                                        </Stat>

                                        
                                    </Box>
                                    <Bar options={options} data={rtuData} />

                                </Box>

                                <Box
                                    p={5}
                                    shadow={'md'}
                                    borderWidth={'1px'}
                                    borderRadius={'lg'}
                                    backgroundColor={'rgba(180, 180, 180, 0.2)'}
                                >
                                    <Box display="flex" flexDir={'row'}>
                                        <Heading
                                            fontSize={'3xl'}
                                            fontWeight={'bold'}
                                            textAlign={'left'}
                                        >
                                            Page Views
                                        </Heading>
                                        <Stat textAlign={'right'} mt={-3}>
                                            <StatNumber fontSize={'5xl'} fontWeight={'black'}>12,204</StatNumber>
                                            <StatHelpText fontSize={'xl'}>
                                            <StatArrow type='increase' />
                                            19.60%
                                            </StatHelpText>
                                        </Stat>

                                        
                                    </Box>
                                    <Bar options={options} data={pvData} />

                                </Box>

                                <Box
                                    p={5}
                                    shadow={'md'}
                                    borderWidth={'1px'}
                                    borderRadius={'lg'}
                                    backgroundColor={'rgba(180, 180, 180, 0.2)'}
                                >
                                    <Box display="flex" flexDir={'column'}>
                                        <Box display={'flex'} flexDir={'row'}>
                                        <Heading
                                            fontSize={'3xl'}
                                            fontWeight={'bold'}
                                            textAlign={'left'}
                                        >
                                            Events
                                        </Heading>
                                        <Stat textAlign={'right'} mt={-3}>
                                            <StatNumber fontSize={'5xl'} fontWeight={'black'}>955</StatNumber>
                                            <StatHelpText fontSize={'xl'}>
                                            <StatArrow type='increase'  />
                                            4.13%
                                            </StatHelpText>
                                        </Stat>
                                        <Box h={5} />
                                        </Box>

                                        <TableContainer>
                                            <Table size='sm'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Event Name</Th>
                                                        <Th>Trigger Count</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody >

                                                    <Tr>
                                                        <Td fontSize={'xl'}>signup</Td>
                                                        <Td fontSize={'xl'}>391</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td fontSize={'xl'}>email-change</Td>
                                                        <Td fontSize={'xl'}>213</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td fontSize={'xl'}>property-create</Td>
                                                        <Td fontSize={'xl'}>129</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td fontSize={'xl'}>account-delete</Td>
                                                        <Td fontSize={'xl'}>120</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td fontSize={'xl'}>help-request</Td>
                                                        <Td fontSize={'xl'}>102</Td>
                                                    </Tr>
                                                
                                                </Tbody>
                                                <Tfoot>
                                                    <Tr>
                                                        <Th>Event Name</Th>
                                                        <Th>Trigger Count</Th>
                                                    </Tr>
                                                </Tfoot>
                                            </Table>
                                        </TableContainer>
                                        
                                    </Box>

                                </Box>

                                <Box
                                    p={5}
                                    shadow={'md'}
                                    borderWidth={'1px'}
                                    borderRadius={'lg'}
                                    backgroundColor={'rgba(180, 180, 180, 0.2)'}
                                >
                                    <Box display="flex" flexDir={'column'}>
                                        <Heading
                                            fontSize={'3xl'}
                                            fontWeight={'bold'}
                                            textAlign={'left'}
                                        >
                                            Page Breakdown
                                        </Heading>
                                        <Box h={5} />

                                        <TableContainer>
                                            <Table size='sm'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Page Name</Th>
                                                        <Th>View Count</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody >

                                                    <Tr>
                                                        <Td fontSize={'xl'}>/</Td>
                                                        <Td fontSize={'xl'}>4,812</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td fontSize={'xl'}>/login</Td>
                                                        <Td fontSize={'xl'}>3,231</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td fontSize={'xl'}>/signup</Td>
                                                        <Td fontSize={'xl'}>3,112</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td fontSize={'xl'}>/about</Td>
                                                        <Td fontSize={'xl'}>1,933</Td>
                                                    </Tr>
                                                
                                                </Tbody>
                                                <Tfoot>
                                                    <Tr>
                                                        <Th>Page Name</Th>
                                                        <Th>View Count</Th>
                                                    </Tr>
                                                </Tfoot>
                                            </Table>
                                        </TableContainer>
                                        
                                    </Box>

                                </Box>

                                
                                
                            </Grid>
                        </Box>
                        <Box h={10} />
                        <Footer />
                    </Box>
                </Box>
            )}
        </ChakraProvider>
    )
}

export default PropertyDashboardPage