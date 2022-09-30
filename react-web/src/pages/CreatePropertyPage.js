import { Box, Button, ChakraProvider, Checkbox, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Highlight, HStack, Image, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon, InputRightElement, Link, Radio, RadioGroup, Select, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import theme from "../theme";
import { Formik, Form, Field } from 'formik';
import { CheckIcon, CloseIcon, PhoneIcon } from '@chakra-ui/icons'
import React from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { NavLink } from "react-router-dom";

function CreatePropertyPage() {

    const cookies = new Cookies();
    const [sessionId, setSessionId] = React.useState(cookies.get('mirky-anon-session-id'));
    const toast = useToast()
    const [value, setValue] = React.useState("");

    React.useEffect(() => {
        if (sessionId === undefined) {
            //
        }
    });

    const industryOptions = [
        { value: "arts_entertainment", label: "Arts & Entertainment" },
        { value: "automotive", label: "Automotive" },
        { value: "beauty_fitness", label: "Beauty & Fitness" },
        { value: "books_literature", label: "Books & Literature" },
        { value: "business_industrial", label: "Business & Industrial" },
        { value: "computer_electronics", label: "Computer & Electronics" },
        { value: "finance", label: "Finance" },
        { value: "food_drink", label: "Food & Drink" },
        { value: "games", label: "Games" },
        { value: "health", label: "Health" },
        { value: "hobbies_interests", label: "Hobbies & Interests" },
        { value: "home_garden", label: "Home & Garden" },
        { value: "internet_telecom", label: "Internet & Telecom" },
        { value: "jobs_education", label: "Jobs & Education" },
        { value: "law_government", label: "Law & Government" },
        { value: "news_media", label: "News & Media" },
        { value: "online_communites", label: "Online Communities" },
        { value: "people_society", label: "People & Society" },
        { value: "pets_animals", label: "Pets & Animals" },
        { value: "real_estate", label: "Real Estate" },
        { value: "reference", label: "Reference" },
        { value: "science", label: "Science" },
        { value: "shopping", label: "Shopping" },
        { value: "sports", label: "Sports" },
        { value: "travel", label: "Travel" },
        { value: "other", label: "Other" }
    ]

    function validatePropName(value) {
        let error
        if (!value) {
            error = 'Property name is required'
        } else if (value.length < 3) {
            error = 'Property name must be at least 3 characters'
        } else if (value.length > 50) {
            error = 'Property name must be less than 50 characters'
        }
        return error
    }

    function validateCompanyName(value) {
        let error
        
        return error
    }

    function validateWebsite(value) {
        let error
        
        return error
    }

    function validateIndustry(value) {
        let error
        if (value === 'Select One') {
            error = 'Industry is required'
        }
        return error
    }

  return (
    <ChakraProvider theme={theme}>
      <Box >
        <Box
            h={'100vh'}
            w={'100%'}
            p={10}
            pl={'10vw'}
            pr={'10vw'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDir={'column'}
            bgColor={'rgba(0,0,0,0.5)'}
            bgGradient='linear(to-r, brandBlurple.900, brandPurple.900)'
        >
            <Heading>
                Create an Analytics Property
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
                w={'100%'}
            >

                <Stack spacing={5} w={'100%'}>

                    <FormControl isRequired>
                        <Formik
                            initialValues={{ propName: null, companyName: null, website: null, industry: null, companySize: null }}
                            onSubmit={(values, actions) => {
                                setTimeout(() => {
                                    
                                    axios.post('https://api.mirky.app/v1/property/create', {
                                        propName: values.propName,
                                        companyName: values.companyName,
                                        website: values.website,
                                        industry: values.industry,
                                        companySize: values.companySize,
                                        sessionId: cookies.get('mirky-session-id')
                                    }).then(res => {
                                        let data = res.data
                                        if (data.message === "Property created") {

                                            toast({
                                                title: "Account Created",
                                                description: "Your account has been created successfully.",
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
                                            description: "An error occurred while creating your account.",
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
                                <Field name='propName' validate={validatePropName}>
                                    {({ field, form }) => (
                                    <FormControl isRequired isInvalid={form.errors.propName && form.touched.propName}>
                                        <FormLabel>Property Name</FormLabel>
                                        <Input {...field} placeholder='Mirky Website' type={'propName'} />
                                        <FormErrorMessage mb={5}>{form.errors.propName}</FormErrorMessage>
                                        <Box h={5}></Box>
                                    </FormControl>
                                    )}
                                </Field>

                                <Field name='companyName' validate={validateCompanyName}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.companyName && form.touched.companyName}>
                                        <FormLabel>Company Name</FormLabel>
                                        <Input {...field} placeholder='Business Inc.' type={'companyName'} />
                                        <FormErrorMessage mb={5}>{form.errors.companyName}</FormErrorMessage>
                                        <Box h={5}></Box>
                                    </FormControl>
                                    )}
                                </Field>

                                <Field name='website' validate={validateWebsite}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.website && form.touched.website}>
                                        <FormLabel>Website</FormLabel>
                                        <InputGroup>
                                            <InputLeftAddon children='https://' />
                                            <Input {...field} placeholder='mrirky.app' type={'website'} />
                                        </InputGroup>
                                        <FormErrorMessage mb={5}>{form.errors.website}</FormErrorMessage>
                                        <Box h={5}></Box>
                                    </FormControl>
                                    )}
                                </Field>

                                <Field name='industry' validate={validateIndustry}>
                                    {({ field, form }) => (
                                    <FormControl isRequired isInvalid={form.errors.industry && form.touched.industry}>
                                        <FormLabel>Industry</FormLabel>
                                        <Select placeholder='Select One' {...field}
                                            id="industry"
                                            name={field.name}
                                            onChange={field.onChange}
                                            value={form.values.industry}
                                        >
                                            {industryOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                {option.label}
                                                </option>
                                            ))}
                                        </Select>
                                        <FormErrorMessage mb={5}>{form.errors.industry}</FormErrorMessage>
                                        <Box h={5}></Box>
                                    </FormControl>
                                    )}
                                </Field>

                                <Field name='companySize'>
                                    {({ field, form }) => (
                                    <FormControl isRequired isInvalid={form.errors.companySize && form.touched.companySize}>
                                        <FormLabel>Company Size</FormLabel>
                                        <RadioGroup 
                                            {...field}
                                            colorScheme="brandBlurple"
                                            name={field.name}
                                            onChange={field.handleChange} 
                                            value={form.values.companySize}
                                        >
                                                <Stack direction='column'>
                                                    <Radio {...field} name={field.name} value='small'>Small: 1 - 10 Employees</Radio>
                                                    <Radio {...field} name={field.name} value='medium'>Medium: 11 - 100 Employees</Radio>
                                                    <Radio {...field} name={field.name} value='large'>Large: 101 - 1,000+ Employees</Radio>
                                                </Stack>
                                            </RadioGroup>
                                        <FormErrorMessage mb={5}>{form.errors.companySize}</FormErrorMessage>
                                        <Box h={5}></Box>
                                    </FormControl>
                                    )}
                                </Field>
                                
                                <Button
                                    mt={4}
                                    colorScheme='brandBlurple'
                                    isLoading={props.isSubmitting}
                                    type='submit'
                                >
                                    Create
                                </Button>
                            </Form>
                        )}
                        </Formik>
                    </FormControl>
                </Stack>

            </Box>

        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default CreatePropertyPage;
