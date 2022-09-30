import { Box, Button, ChakraProvider, Checkbox, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Highlight, HStack, Image, Input, InputGroup, InputRightElement, Link, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import theme from "../theme";
import { Formik, Form, Field } from 'formik';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import React from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { NavLink } from "react-router-dom";

function LoginPage() {

    const cookies = new Cookies();

    const [usernameChecking, setUsernameChecking] = React.useState(false);
    const [usernameAvailable, setUsernameAvailable] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [sessionId, setSessionId] = React.useState(cookies.get('mirky-anon-session-id'));
    const toast = useToast()

    React.useEffect(() => {
        if (sessionId === undefined) {
            window.location.href = '/properties'
        }
    });

    const validateEmail = (values) => {
        let errors
        if (!values) {
            errors = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
            errors = 'Invalid email address';
        }

        return errors
    }

    function validatePassword(value) {
        let error
        if (!value) {
            error = 'Password is required'
        } else if (value.length < 8) {
            error = 'Password must be at least 8 characters'
        } else if (value.length > 50) {
            error = 'Password must be less than 50 characters'
        }
        setPassword(value)
        return error
    }

  return (
    <ChakraProvider theme={theme}>
      <Box >
        <Box
            h={'100vh'}
            w={'100%'}
            p={10}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDir={'column'}
            bgColor={'rgba(0,0,0,0.5)'}
            bgGradient='linear(to-r, brandBlurple.900, brandPurple.900)'
        >
            <Heading>
                Login to Mirky
            </Heading>

            <Box
                p={10}
                bgColor={'whiteAlpha.300'}
                borderRadius={'20'}
                justifyContent={'center'}
                alignContent={'center'}
                alignItems={'center'}
                display={'flex'}
                flexDir={'column'}
                mt={10}
            >

                <Stack spacing={5} w={'fit-content'}>

                    <FormControl isRequired>
                        <Formik
                            initialValues={{ email: null, password: null, }}
                            onSubmit={(values, actions) => {
                                setTimeout(() => {
                                    
                                    axios.post('https://api.mirky.app/v1/auth/login', {
                                        email: values.email,
                                        password: values.password,
                                        sessionId: sessionId
                                    }).then(res => {
                                        let data = res.data
                                        if (data.message === "User logged in, session replaced") {
                                            cookies.remove('mirky-anon-session-id')
                                            cookies.set('mirky-session-id', data.sessionId, { path: '/' })

                                            toast({
                                                title: "Logged in.",
                                                description: "You have been logged in.",
                                                status: "success",
                                                duration: 5000,
                                                isClosable: true,
                                            })
                                            window.location.href = '/properties'
                                        } else {
                                            toast({
                                                title: "Error",
                                                description: data.message,
                                                status: "error",
                                                duration: 5000,
                                                isClosable: true,
                                            })
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                        toast({
                                            title: "Error",
                                            description: "An error occurred while logging in.",
                                            status: "error",
                                            duration: 5000,
                                            isClosable: true,
                                        })
                                    })

                                    actions.setSubmitting(false)
                                }, 1000)
                            }}
                        >

                        {(props) => (
                            <Form>
                                <Field name='email' validate={validateEmail}>
                                    {({ field, form }) => (
                                    <FormControl isRequired isInvalid={form.errors.email && form.touched.email}>
                                        <FormLabel>Email</FormLabel>
                                        <Input {...field} placeholder='name@domain.com' type={'email'} />
                                        <FormErrorMessage mb={5}>{form.errors.email}</FormErrorMessage>
                                        <Box h={5}></Box>
                                    </FormControl>
                                    )}
                                </Field>
                                <Field name='password' validate={validatePassword}>
                                    {({ field, form }) => (
                                    <FormControl isRequired isInvalid={form.errors.password && form.touched.password}>
                                        <FormLabel>Password</FormLabel>
                                        <Input {...field} placeholder='greatPassword'type={'password'}  />
                                        <FormErrorMessage mb={5}>{form.errors.password}</FormErrorMessage>
                                        <Box h={2}></Box>
                                    </FormControl>
                                    )}
                                </Field>
                                
                                <Button
                                    mt={4}
                                    colorScheme='brandBlurple'
                                    isLoading={props.isSubmitting}
                                    type='submit'
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                        </Formik>
                    </FormControl>
                    <NavLink to={'/signup'}>
                        <Link _hover={{ color: 'brandBlurple.200', textDecoration: 'underline' }}>
                            Don't have an account?
                        </Link>
                    </NavLink>
                </Stack>

            </Box>

        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default LoginPage;
