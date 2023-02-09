import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from 'react-dom/client'
import Mirky from 'mirky'

import App from "./app";
import config from "./theme";

const analytics = new Mirky()
analytics.init('6yYFCaXt7HX9mMDJL8Cp8D')

analytics.pageView()

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <ChakraProvider>
    <React.StrictMode>
    <ColorModeScript  initialColorMode={"dark"}/>
    <App />
  </React.StrictMode>
  </ChakraProvider>,
)