import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, ButtonGroup, ChakraProvider, Checkbox, Divider, Editable, EditableInput, EditablePreview, Flex, FormControl, Heading, Highlight, HStack, IconButton, Image, Input, InputGroup, InputRightAddon, InputRightElement, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, SimpleGrid, Spinner, Stack, Text, useDisclosure, useEditableControls, useToast } from "@chakra-ui/react";
import theme from "../theme";
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import React from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { NavLink } from "react-router-dom";
import Header from "../comps/Header";
import Footer from "../comps/Footer";
import { Buffer } from 'buffer';
import  FocusLock from "react-focus-lock"
import { Formik, Form, Field } from 'formik'; 

function AccountPage() {
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

    const cookies = new Cookies();
    const [session, setSession] = React.useState(cookies.get('mirky-session'));
    const [properties, setProperties] = React.useState([]);
    const toast = useToast()
    const pfpModal = useDisclosure()
    const deleteAlert = useDisclosure()
    const [selectedFile, setSelectedFile] = React.useState(null);
	const [isFilePicked, setIsFilePicked] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false)
    const cancelRef = React.useRef()

    React.useEffect(() => {
        if (session !== undefined) {
            console.log('User is logged in')
        } else {
            window.location.href = '/login'
        }
    }, [session]);

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handlePfpSubmission = () => {

        setIsLoading(true)

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
            setIsLoading(false)
            setSelectedFile(null)
        } else {
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post(`https://api.mirky.app/v1/user/${session.id}/update/profile-picture`, formData, {
                headers: {
                    "Authorization": "Basic " + Buffer.from(session.id + ":" + session.password).toString('base64'),
                    "Content-Type": "multipart/form-data"
                },
            }).then(res => {
                console.log(res)

                if (res.data.message === 'PFP updated successfully') {
                    toast({
                        title: "Success",
                        description: "Profile picture updated successfully. It may take a minute to update on the website.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    })
                    pfpModal.onClose()
                }
                else {
                    toast({
                        title: "Error",
                        description: "An error occurred while updating your profile picture",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    })
                }

                setIsFilePicked(false)
                setIsLoading(false)
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
      <Box h={'100vh'}>
        <Header />

        <Box
            pl={'5vw'}
            pr={'5vw'}
            pb={'5vw'}
            pt={'10'}
            textAlign={'center'}
            justifyContent={'center'}
            alignContent={'center'}
            alignItems={'center'}
        >
            <Heading fontSize={'6xl'} mb={10}> Account </Heading>

            <Box 
                margin={'auto'}
                bgColor={'whiteAlpha.300'}
                borderRadius={20}
                p={10}
                pr={20}
                pl={20} 
                w={'fit-content'}
                textAlign={'left'}
            >
                <Heading fontSize={'4xl'} mb={10}> Account Details </Heading>
                
                <HStack mb={2} spacing={5}>
                    <Image src={session.avatar} borderRadius={'full'} boxSize={'75px'} />
                    <Button ml={10} colorScheme={'brandBlurple'} onClick={pfpModal.onOpen}> Change Avatar </Button>
                    <Modal onClose={pfpModal.onClose} isOpen={pfpModal.isOpen} isCentered >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Select a file or drag and drop</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {isFilePicked ? (
                                    <Box justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                                        <Image src={URL.createObjectURL(selectedFile)} borderRadius={'full'} boxSize={200} margin={'auto'} />
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
                                <Button isLoading={isLoading} onClick={handlePfpSubmission} isDisabled={!isFilePicked} colorScheme={'brandBlurple'}>Upload</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </HStack>
                
                <HStack mb={2}>
                    
                    <Heading fontSize={'2xl'}> Username: </Heading>
                    <Editable
                    textAlign='center'
                    defaultValue={session.username}
                    display={'flex'}
                    flexDir="row"
                    fontSize='2xl'
                    isPreviewFocusable={false}
                    onSubmit={(value) => handleEditableSubmission(value, 'username')}
                    >
                    <EditablePreview />
                    {/* Here is the custom input */}
                    <Input as={EditableInput} fontSize={'2xl'} />
                    <EditableControls />
                    </Editable>
                    
                </HStack>

                <HStack mb={2}> 
                    <Heading fontSize={'2xl'}> Email: </Heading>
                    <Editable
                    textAlign='center'
                    defaultValue={session.email}
                    display={'flex'}
                    flexDir="row"
                    fontSize='2xl'
                    isPreviewFocusable={false}
                    onSubmit={(value) => handleEditableSubmission(value, 'email')}
                    >
                    <EditablePreview />
                    {/* Here is the custom input */}
                    <Input as={EditableInput} fontSize={'2xl'} />
                    <EditableControls />
                    </Editable>
                </HStack>

                <Divider mb={5} mt={5} />

                <Heading fontSize={'4xl'} mb={10}> Personal Details </Heading>

                <HStack mb={2}>
                    <Heading fontSize={'2xl'}> First Name: </Heading>
                    <Editable
                    textAlign='center'
                    defaultValue={session.firstName}
                    display={'flex'}
                    flexDir="row"
                    fontSize='2xl'
                    isPreviewFocusable={false}
                    onSubmit={(value) => handleEditableSubmission(value, 'firstName')}
                    >
                    <EditablePreview />
                    {/* Here is the custom input */}
                    <Input as={EditableInput} fontSize={'2xl'} />
                    <EditableControls />
                    </Editable>
                </HStack>

                <HStack mb={2}>
                    <Heading fontSize={'2xl'}> Last Name: </Heading>
                    <Editable
                    textAlign='center'
                    defaultValue={session.lastName}
                    display={'flex'}
                    flexDir="row"
                    fontSize='2xl'
                    isPreviewFocusable={false}
                    onSubmit={(value) => handleEditableSubmission(value, 'lastName')}
                    >
                    <EditablePreview />
                    {/* Here is the custom input */}
                    <Input as={EditableInput} fontSize={'2xl'} />
                    <EditableControls />
                    </Editable>
                </HStack>

                <Divider mb={5} mt={5} />

                <Heading fontSize={'4xl'} mb={10}> Danger Zone </Heading>

                <Stack mb={2}>
                    
                    <Button colorScheme={'brandBlurple'} size={'lg'}> Logout </Button>
                    <Box h={5}></Box>
                    <Button colorScheme={'red'} size={'sm'} onClick={deleteAlert.onOpen} > Delete Account </Button>
                    <AlertDialog
                        isOpen={deleteAlert.isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={deleteAlert.onClose}
                        isCentered
                    >
                        <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Account
                            </AlertDialogHeader>

                            <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={deleteAlert.onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={deleteAlert.onClose} ml={3}>
                                Delete
                            </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>

                </Stack>

            </Box>

        </Box>
        

        <Footer />
      </Box>
      
    </ChakraProvider>
  );
}

export default AccountPage;
