import React, { useState } from 'react';
import { Button, Text,Textarea,Flex,Spinner,Box, Select} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

function Chat() {
    const [query, setQuery] = useState('');
    const [reply, setReply] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [model,setModel]=useState('gpt-4o-mini');
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
                model: model,
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
    function handleModelChange(event) {
      setModel(event.target.value); // Update the model state based on the selected value
    }
    return (
        <>
        <Flex  alignItems={'center'} width={'100%'} flexDirection={'column'}>
        <Flex>
                <Select placeholder='Select Model' onChange={handleModelChange} value={model}>
                    <option value='gpt-4o-mini'>GPT-4o-Mini</option>
                    <option value='gpt-4'>GPT-4</option>
                    <option value='gpt-3.5-turbo'>GPT-3.5 Turbo</option>
                </Select>
        </Flex>
        <Flex marginTop={'5vh'} marginBottom={'5vh'} height={'85vh'} width={'80%'} justifyContent={'center'} overflow={'hidden'}flexDirection={'column'}>
            <Text height={'80%'} padding={'4vh'} bg={'#f0f0f0'}width={'100%'} whiteSpace={'pre-wrap'} overflowY={'scroll'}overflowX={'auto'} ><ReactMarkdown
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
            math: ({ value }) => <InlineMath math={value} />,
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
            <Flex flexDirection={'column'} outlineOffset={'0'} marginpaddingLeft={'10px'} paddingRight={'10px'} fontSize={'1vw'} bg={'#f0f0f0'} height={'20%'}  width={'100%'}>
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
        </Flex>
        
        

        </>
        

    )
}
export default Chat;