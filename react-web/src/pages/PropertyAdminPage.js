import { Box, Button, ButtonGroup, ChakraProvider, Code, Divider, Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, Grid, Heading, HStack, IconButton, Image, Input, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Switch, Text, useDisclosure, useEditableControls, useToast } from "@chakra-ui/react"
import Footer from "../comps/Footer";
import theme from "../theme"
import { NavLink, useParams } from "react-router-dom";
import { PropDashSidebar } from "../comps/PropDashSidebar";
import Cookies from 'universal-cookie';
import React from "react";
import axios from "axios";
import { Buffer } from 'buffer';
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

function PropertyAdminPage() {

    const params = useParams();
    const cookies = new Cookies();
    const [session] = React.useState(cookies.get('mirky-session'));
    const [propId] = React.useState(params.id);
    const [isLoading, setIsLoading] = React.useState(true);
    const toast = useToast()

    const [propData, setPropData] = React.useState()

    const pfpModal = useDisclosure()
    const createEvent = useDisclosure()
    const [selectedFile, setSelectedFile] = React.useState(null);
	const [isFilePicked, setIsFilePicked] = React.useState(false);
    const [isFileLoading, setIsFileLoading] = React.useState(false)

    const [defaultEventsList, setDefaultEventsList] = React.useState([])
    const [customEventsList, setCustomEventsList] = React.useState([])

    /* Here's a custom control */
    function EditableControls(props) {
        const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
        } = useEditableControls()

        return isEditing ? (
        <ButtonGroup justifyContent='center' size='sm' ml={2} mt={1}>
            <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
            <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        </ButtonGroup>
        ) : (
        <Flex justifyContent='center' mt={1.5} ml={1}>
            <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
        </Flex>
        )
    }

    React.useEffect(() => {

        if (session !== undefined) {
            console.log('User is logged in')
        } else {
            window.location.href = '/login'
        }
    }, [session]);

    // Query Property Data
    React.useEffect(() => {

        axios.get(`https://api.mirky.app/v1//property/fetch-prop/${propId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Basic " + Buffer.from(session.id + ":" + session.password).toString('base64'),
            },
        })
        .then(res => {
            setPropData(res.data.property);

            // Set preset events
            setDefaultEventsList(res.data.property.analytics.presetEvents)

            setIsLoading(false)
        })

    }, [session, propId]);

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handlePfpSubmission = () => {

        setIsFileLoading(true)

        var type = selectedFile.type.split('/')[0]

        if (type !== 'image') {
            toast({
                title: "Error",
                description: "Image type must be either JPEG or PNG",
                status: "error",
                duration: 9000,
                isClosable: true,
            })

            setIsFilePicked(false)
            setIsFileLoading(false)
            setSelectedFile(null)
        } else {
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post(`https://api.mirky.app/v1/property/${propId}/update/logo`, formData, {
                headers: {
                    "Authorization": "Basic " + Buffer.from(session.id + ":" + session.password).toString('base64'),
                    "Content-Type": "multipart/form-data"
                },
            }).then(res => {
                console.log(res)

                if (res.data.message === 'Picture updated successfully') {
                    toast({
                        title: "Success",
                        description: "Logo updated successfully",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    })
                    pfpModal.onClose()
                }
                else {
                    toast({
                        title: "Error",
                        description: "An error occurred while updating your logo",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    })
                }

                setIsFilePicked(false)
                setIsFileLoading(false)
                setSelectedFile(null)
            }).catch(err => {
                toast({
                    title: "Error",
                    description: err,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            })
        }

    };

    const handleEditableSubmission = (value, field) => {

        if (field === 'email') {
            // validate the email is valid
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(value).toLowerCase())) {
                toast({
                    title: "Error",
                    description: "Please enter a valid email address",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
                return
            }
        }



        axios.post(`https://api.mirky.app/v1/user/${session.id}/update/${field}`, {
            value: value
        }, {
            headers: {
                "Authorization": "Basic " + Buffer.from(session.id + ":" + session.password).toString('base64'),
                "Content-Type": "application/json"
            },
        }).then(res => {
            var data = res.data

            if (data.message === 'Field updated successfully') {
                toast({
                    title: "Success",
                    description: "Account updated successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                console.log(data)
                toast({
                    title: "Error",
                    description: "An error occurred while updating your account",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
        }).catch(err => {
            console.log(err)
            toast({
                title: "Error",
                description: err,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        })
    }

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
                            Admin Settings
                        </Heading>

                        <Text
                            color={'gray.500'}
                            fontSize={'xl'}
                            fontWeight={'bold'}
                        >
                            {propData.propName}
                        </Text>

                        <Code
                        >
                            ID: {propData.propId}
                        </Code>
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
                                    <Box display="flex" flexDir={'column'}>
                                        <Heading
                                            fontSize={'3xl'}
                                            fontWeight={'bold'}
                                            textAlign={'left'}
                                        >
                                            Property Settings
                                        </Heading>

                                        <Box h={5} />
                                        <Divider />
                                        <Box h={5} />

                                        <HStack mb={2} spacing={5}>
                                            <Image src={propData.logo.location} borderRadius={'13'} boxSize={'125px'} />
                                            <Button ml={10} colorScheme={'brandBlurple'} onClick={pfpModal.onOpen}> Change Logo </Button>
                                            <Modal onClose={pfpModal.onClose} isOpen={pfpModal.isOpen} isCentered >
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>Select a file or drag and drop</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        {isFilePicked ? (
                                                            <Box justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                                                                <Image src={URL.createObjectURL(selectedFile)} borderRadius={'13'} boxSize={'150px'} margin={'auto'} />
                                                            </Box>
                                                        ) : (
                                                            <FormControl>
                                                                <Box borderStyle={'dashed'} p={50} borderRadius={20} borderWidth={3}>
                                                                    <input type="file" name="file" onChange={changeHandler} />
                                                                </Box>
                                                            </FormControl>
                                                        )}
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button onClick={pfpModal.onClose}>Close</Button>
                                                        <Box w={5}></Box>
                                                        <Button isLoading={isFileLoading} onClick={handlePfpSubmission} isDisabled={!isFilePicked} colorScheme={'brandBlurple'}>Upload</Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                        </HStack>

                                        <HStack mb={2}>
                    
                                            <Heading fontSize={'2xl'}> Property Name: </Heading>
                                            <Editable
                                                textAlign='center'
                                                defaultValue={propData.propName}
                                                display={'flex'}
                                                flexDir="row"
                                                fontSize='2xl'
                                                isPreviewFocusable={false}
                                                onSubmit={(value) => handleEditableSubmission(value, 'prop-name')}
                                            >
                                                <EditablePreview />
                                                {/* Here is the custom input */}
                                                <Input as={EditableInput} fontSize={'2xl'} />
                                                <EditableControls />
                                            </Editable>
                    
                                        </HStack>

                                        <HStack mb={2}>
                    
                                            <Heading fontSize={'2xl'}> Company Name: </Heading>
                                            <Editable
                                                textAlign='center'
                                                defaultValue={propData.companyName}
                                                display={'flex'}
                                                flexDir="row"
                                                fontSize='2xl'
                                                isPreviewFocusable={false}
                                                onSubmit={(value) => handleEditableSubmission(value, 'company-name')}
                                            >
                                                <EditablePreview />
                                                {/* Here is the custom input */}
                                                <Input as={EditableInput} fontSize={'2xl'} />
                                                <EditableControls />
                                            </Editable>
                    
                                        </HStack>

                                        <HStack mb={2}>
                    
                                            <Heading fontSize={'2xl'}> Website: </Heading>
                                            <Editable
                                                textAlign='center'
                                                defaultValue={propData.website}
                                                display={'flex'}
                                                flexDir="row"
                                                fontSize='2xl'
                                                isPreviewFocusable={false}
                                                onSubmit={(value) => handleEditableSubmission(value, 'website')}
                                            >
                                                <EditablePreview />
                                                {/* Here is the custom input */}
                                                <Input as={EditableInput} fontSize={'2xl'} />
                                                <EditableControls />
                                            </Editable>
                    
                                        </HStack>

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
                                            Event Settings
                                        </Heading>

                                        <Box h={5} />
                                        <Divider />
                                        <Box h={5} />
                                        
                                        <Heading fontSize={'2xl'}> Default Events </Heading>
                                        <Box h={2} />

                                        {defaultEventsList.map((event, index) => (
                                            <HStack mb={2}>
                                                <FormControl display='flex' alignItems='center'>
                                                    <FormLabel htmlFor={`event-${index}`} mb='0'>
                                                        {event.eId}
                                                    </FormLabel>
                                                    <Switch isChecked={event.active} colorScheme={'brandBlurple'} id={`event-${index}`} />
                                                </FormControl>
                                            </HStack>
                                        ))}

                                    
                                        <Box h={5} />
                                        <Heading fontSize={'2xl'}> Custom Events </Heading>
                                        <Box h={2} />

                                        {customEventsList.map((event, index) => (
                                            <HStack mb={2}>
                                                <FormControl display='flex' alignItems='center'>
                                                    <FormLabel htmlFor={`event-${index}`} mb='0'>
                                                        {event.eId}
                                                    </FormLabel>
                                                    <Switch isChecked={event.active} colorScheme={'brandBlurple'} id={`event-${index}`} />
                                                </FormControl>
                                            </HStack>
                                        ))}
                                        <Button colorScheme={'brandBlurple'} onClick={createEvent.onOpen}>Create Event</Button>

                                        <Modal onClose={createEvent.onClose} isOpen={createEvent.isOpen} isCentered >
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>Create Custom Event</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        <FormControl>
                                                            <FormLabel htmlFor="create-event-name" >Event Name</FormLabel>
                                                            <Input id="create-event-name" isRequired placeholder="Event Name" />
                                                            <Box h={5}></Box>
                                                            <FormLabel>Description</FormLabel>
                                                            <Input placeholder="Description" />
                                                        </FormControl>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button onClick={createEvent.onClose}>Close</Button>
                                                        <Box w={5}></Box>
                                                        <Button colorScheme={'brandBlurple'}>Create</Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                        </Modal>

                                    </Box>
                                </Box>

                            </Grid>
                        </Box>
                    </Box>

                    {/* <Footer /> */}
                    
                </Box>
            )}
        </ChakraProvider>
    )
}

export default PropertyAdminPage