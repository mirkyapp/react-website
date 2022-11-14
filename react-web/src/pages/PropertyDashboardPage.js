import React from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Buffer } from 'buffer';
import { Box, Button, ChakraProvider, Code, Grid, Heading, Menu, MenuButton, MenuItem, MenuList, Spinner, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
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
    const [hasAnalytics, setHasAnalytics] = React.useState(false);
    const cookies = new Cookies();
    const [session, setSession] = React.useState(cookies.get('mirky-session'));

    // Define data consts
    const [realTimeTotal, setRealTimeTotal] = React.useState('N/A');
    const [oneDayRealTimeList, setOneDayRealTimeList] = React.useState([]);
    const [oneDayRealTimePercent, setOneDayRealTimePercent] = React.useState('N/A');
    const [oneDayRealTimePercentColor, setOneDayRealTimePercentColor] = React.useState('');

    const [oneDayPageViewsTotal, setOneDayPageViewsTotal] = React.useState('N/A');
    const [oneDayPageViewsList, setOneDayPageViewsList] = React.useState([]);
    const [oneDayPageViewsPercent, setOneDayPageViewsPercent] = React.useState('N/A');
    const [oneDayPageViewsPercentColor, setOneDayPageViewsPercentColor] = React.useState('');

    const [oneDayEventsTotal, setOneDayEventsTotal] = React.useState('N/A');
    const [oneDayEventsList, setOneDayEventsList] = React.useState([]);
    const [oneDayEventsPercent, setOneDayEventsPercent] = React.useState('N/A');
    const [oneDayEventsPercentColor, setOneDayEventsPercentColor] = React.useState('');

    const [oneDayPageBreakdownList, setOneDayPageBreakdownList] = React.useState([]);

    // Define chart range const
    const [chartRange, setChartRange] = React.useState('Last 24 Hours');

    // Define chart data labels
    const oneDayLabels = ['12am','3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm',];
    const oneHourLabels = ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"];
    const oneWeekLabels = ["1", "2", "3", "4", "5", "6", "7"];
    const oneMonthLabels = ['Week 1', "Week 2", "Week 3", "Week 4"];
    const sixMonthLabels = ["1", "2", "3", "4", "5", "6"];

    // Define chart data
    const oneDayRealTimeData = {
        oneDayLabels,
        datasets: [
        {
            data: oneDayRealTimeList,
            backgroundColor: '#6459F4',
        },
        ],
    };
    const oneDayPageViewsData = {
        oneDayLabels,
        datasets: [
        {
            data: oneDayPageViewsList,
            backgroundColor: '#6459F4',
        },
        ],
    };

    React.useEffect(() => {
        if (session !== undefined) {
            console.log('User is logged in')
        } else {
            window.location.href = '/login'
        }
    }, [session]);

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
            if (res.data.property.analytics) {
                setHasAnalytics(true);
            }
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
                    <PropDashSidebar id={propId} />

                    <Box
                    ml={'5em'}
                    mt={'3em'}
                    w={'30%'}
                    >
                        <Heading 
                            textAlign={'left'}
                            fontSize={['2xl', '3xl', '4xl']}
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
                            {chartRange}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => { setChartRange('Last Hour') }} >Last Hour</MenuItem>
                            <MenuItem onClick={() => { setChartRange('Last 24 Hours') }} >Last 24 Hours</MenuItem>
                            <MenuItem onClick={() => { setChartRange('Last 7 Days') }} >Last 7 Days</MenuItem>
                            <MenuItem onClick={() => { setChartRange('Last 30 Days') }} >Last 30 Days</MenuItem>
                            <MenuItem onClick={() => { setChartRange('Last 6 Months') }} >Last 6 Months</MenuItem>
                            
                        </MenuList>
                        </Menu>

                        <Box h={10} />
                        {!hasAnalytics ? (
                            <Box 
                                p="5"
                                bg="red.900"
                                borderRadius="lg"
                                w={'80vw'}
                                textAlign={'center'}
                                borderColor={'red.500'}
                                borderWidth={2}
                            >
                                <Heading size="lg" mb={4} fontWeight={'extrabold'}>
                                    🚨 No Analytics Data Recieved Yet 🚨
                                </Heading> 
                                <Text fontWeight={"500"} color={"red.200"}>
                                    Please make sure you have correctly connected your application to Mirky.
                                </Text>
                                <Code mt={4} p={2}>
                                    https://api.mirky.app/v1/property/prop-analytics/{propId}
                                </Code>
                                <Text mt={4} fontWeight={"500"} color={"red.200"}>
                                    If you have ensured that you have connected your application to Mirky, please wait a few minutes and try again.
                                </Text>
                                    
                                <NavLink to={'/docs'}>
                                    <Button mt={4} colorScheme="red" variant={"ghost"}>
                                        View Documentation
                                    </Button>
                                </NavLink>
                            </Box>
                        ) : (
                            null
                        )}

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
                                            <StatNumber fontSize={'5xl'} fontWeight={'black'}>{realTimeTotal}</StatNumber>
                                            <StatHelpText fontSize={'xl'}>
                                            <StatArrow type={oneDayRealTimePercentColor}  />
                                            {oneDayRealTimePercent}%
                                            </StatHelpText>
                                        </Stat>

                                        
                                    </Box>
                                    <Bar options={options} data={oneDayRealTimeData} />

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
                                            <StatNumber fontSize={'5xl'} fontWeight={'black'}>{oneDayPageViewsTotal}</StatNumber>
                                            <StatHelpText fontSize={'xl'}>
                                            <StatArrow type={oneDayPageViewsPercentColor} />
                                            {oneDayPageViewsPercent}%
                                            </StatHelpText>
                                        </Stat>

                                        
                                    </Box>
                                    <Bar options={options} data={oneDayPageViewsData} />

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
                                            <StatNumber fontSize={'5xl'} fontWeight={'black'}>{oneDayEventsTotal}</StatNumber>
                                            <StatHelpText fontSize={'xl'}>
                                            <StatArrow type={oneDayEventsPercentColor}  />
                                            {oneDayEventsPercent}%
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

                                                    {oneDayEventsList.map((event) => (
                                                        <Tr key={event.eventName}>
                                                            <Td>{event.eventName}</Td>
                                                            <Td>{event.triggerCount}</Td>
                                                        </Tr>
                                                    ))}
                                                
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

                                                    {oneDayPageViewsList.map((page) => (
                                                        <Tr key={page.pageName}>
                                                            <Td>{page.pageName}</Td>
                                                            <Td>{page.viewCount}</Td>
                                                        </Tr>
                                                    ))}
                                                
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