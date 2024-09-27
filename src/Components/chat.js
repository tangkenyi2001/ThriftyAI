import React, { useState } from 'react';
import { Button, Text,Textarea,Flex,Spinner,Box} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown';

function Chat() {
    const [query, setQuery] = useState('');
    const [reply, setReply] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    function submitQuery() {
        // Determine the operation
        setIsLoading(true);
        fetch(`http://127.0.0.1:5000/chatgpt`, {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                text:query,
            })
            
        })
        .then((response) =>response.json())
        .then((data) => {
            const newEntry = {
                question:query,
                content: data.content,
                timestamp: new Date().toLocaleString(), // Store the current time
            };
            
            setReply(data.content);
            console.log("Success:", data);
            setIsLoading(false);
            
            
        })
        .catch((error) => console.error("Error:", error));

    }
    return (
        <>

        <Flex marginTop={'5vh'} marginBottom={'5vh'} height={'85vh'} width={'80%'} justifyContent={'center'} overflow={'hidden'}flexDirection={'column'}>
            <Text height={'80%'} paddingLeft={'10px'} paddingRight={'10px'} fontSize={'1vw'}  bg={'#f0f0f0'}width={'100%'} whiteSpace={'pre-wrap'} overflowY={'scroll'}overflowX={'auto'} ><ReactMarkdown
          components={{
            pre: ({ node, ...props }) => (
              <Box
                as="pre"
                bg="gray.800"
                color="green.300"
                padding="1em"
                borderRadius="md"
                overflowX="auto"
                whiteSpace="pre-wrap"
                {...props}
              />
            ),
            code: ({ node, inline, ...props }) => (
              <Box
                as="code"
                bg={inline ? "gray.700" : "gray.800"}
                color={inline ? "yellow.200" : "green.300"}
                //padding={inline ? "0.2em" : "1em"}
                borderRadius="md"
                {...props}
              />
            ),
          }}
        >{reply}</ReactMarkdown></Text>
            <Flex flexDirection={'column'} outlineOffset={'0'} paddingLeft={'10px'} paddingRight={'10px'} fontSize={'1vw'} bg={'#f0f0f0'} height={'20%'}  width={'100%'}>
            <Textarea bg={'EDE8F5'} minHeight={'70%'} placeholder={"Enter here!"} onChange={(e) => setQuery(((e.target.value)))}></Textarea>
            <Flex height={'30%'} flexDirection={'column'}>
              <Flex alignSelf={'center'} height={'100%'} width={'50%'} justifyContent={'space-evenly'}>
                <Button height={'80%'} colorScheme={'blue'} onClick={()=>submitQuery()}>Submit</Button>
                {isLoading && <Spinner size='lg' 
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'/>}
              </Flex>
                        
                
            </Flex>
            
            </Flex>   
        </Flex>
        
        

        </>
        

    )
}
export default Chat;