import Chat from"./Components/chat.js"
import { ChakraProvider, theme } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Chat/>
    </ChakraProvider>
  );
}

export default App;
