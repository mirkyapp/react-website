import { Box, ChakraProvider, Heading } from "@chakra-ui/react"
import Header from "../comps/Header"
import theme from "../theme"

function DocsPage() {
    return (
        <ChakraProvider theme={theme}>
            <Box>
                <Header />

                <Box textAlign={'center'} mt={20} pr={'5vw'} pl={'5vw'} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>

                    <Heading fontSize={'7xl'}>Docs Coming Soon</Heading>
                    
                </Box>
                
            </Box>
        </ChakraProvider>
    )
}

export default DocsPage