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
import { Buffer } from 'buffer';

function PropertiesPage() {

    const cookies = new Cookies();
    const [session, setSession] = React.useState(cookies.get('mirky-session'));
    const [properties, setProperties] = React.useState([]);
    const toast = useToast()

    React.useEffect(() => {
        if (session !== undefined) {
            console.log('User is logged in')
        } else {
            window.location.href = '/login'
        }

        axios.get(`https://api.mirky.app/v1/property/fetch-users-props/${session.id}`, {
            headers: {
                "Authorization": "Basic " + Buffer.from(session.id + ":" + session.password).toString('base64'),
            }
        })
            .then(res => {
                setProperties(res.data.properties)
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
    }, [session]);

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
