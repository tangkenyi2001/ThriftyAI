import Chat from"./Components/chat.js"
import { ChakraProvider, Flex, theme } from "@chakra-ui/react";
import History from "./Components/history.js";
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex bg={'#0fa4af'} flexDirection={'row'} height={'100vh'}>
        <History/>
        <Chat/>
      </Flex>
      
    </ChakraProvider>
  )
}

export default App;
