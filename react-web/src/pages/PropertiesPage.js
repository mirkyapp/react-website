import { Box, Button, ChakraProvider, Checkbox, Divider, FormControl, FormErrorMessage, FormLabel, Grid, Heading, Highlight, HStack, Image, Input, InputGroup, InputRightElement, Link, SimpleGrid, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import theme from "../theme";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import React from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { NavLink } from "react-router-dom";
import { Property } from "../comps/Property";
import Header from "../comps/Header";
import { AddProperty } from "../comps/AddProperty";
import Footer from "../comps/Footer";

function PropertiesPage() {

    const cookies = new Cookies();
    const [sessionId, setSessionId] = React.useState(cookies.get('mirky-session-id'));
    const [properties, setProperties] = React.useState([]);
    const toast = useToast()

    React.useEffect(() => {
        if (sessionId !== undefined) {
            console.log('User is logged in')
        } else {
            console.log('User is not logged in')
            window.location.href = '/login'
        }

        const req = axios.post('https://api.mirky.app/v1/property/fetch-users-props', {
            sessionId: sessionId
        })
            .then(res => {
                setProperties(res.data.properties)
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
    }, [sessionId]);

  return (
    <ChakraProvider theme={theme}>
      <Box h={'100vh'}>
        <Header />
        <Box
            pl={'5vw'}
            pr={'5vw'}
            pb={'5vw'}
            pt={'10'}
            textAlign={'center'}
        >
            <Heading
                fontSize={'6xl'}
            >
                Select a Property
            </Heading>

            <Box mt={10} >
                    
                <SimpleGrid minChildWidth='15rem' spacingY={5} spacingX={5} alignContent={'center'} justifyContent={'center'} alignItems={'center'}>
                    {properties.map((property) => (
                        <Property
                            key={property.propId}
                            id={property.propId}
                            name={property.propName} 
                        />
                    ))}
                    <AddProperty />
                </SimpleGrid>
            </Box>            

        </Box>
        <Footer /> 
      </Box>
    </ChakraProvider>
  );
}

export default PropertiesPage;
