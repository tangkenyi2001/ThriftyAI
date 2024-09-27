import Chat from"./Components/chat.js"
import { Button,ChakraProvider, Flex, theme } from "@chakra-ui/react";
import History from "./Components/history.js";
import React, { useState } from 'react';
function App() {
  const [history,setHistory]=useState(false)
  const [view,setView]=useState('View History')
  function viewHistory() {
    setHistory(prevHistory => !prevHistory);
    setView(prevView=>(prevView==='View History'?'Hide History' : 'Show History'));
  }
  return (
    <ChakraProvider theme={theme}>
      <Flex flexDirection={'column'} height={'100%'} width={'100%'}bg={'#0fa4af'}>
        <Flex>
          <Button onClick={()=>viewHistory()}>{view}</Button>
        </Flex>
        <Flex bg={'#0fa4af'} justifyContent={'center'}flexDirection={'row'}>
            {history&&<History/>}
            <Chat/>
        </Flex>
      </Flex>
      
      
    </ChakraProvider> 
  )
}

export default App;
