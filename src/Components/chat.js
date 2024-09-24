import React, { useState } from 'react';
import { Button, Text,Textarea,Flex,Divider} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown';
function Chat() {
    const [query, setQuery] = useState('');
    const [reply, setReply] = useState('');
    const [history, setHistory] = useState([]);
    function submitQuery() {
        // Determine the operation
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
            setHistory((prevHistory) => [...prevHistory, newEntry]);
            
        })
        .catch((error) => console.error("Error:", error));

    }
    return (
        <>

        <Flex padding={'10px'} marginTop={'10vh'} height={'80vh'} width={'100%'} justifyContent={'center'} overflow={'hidden'}>
            <Flex flexDirection={'column'} height={'70vh'} border={'1px solid #ccc'} width={'20%'} margin={'0 auto'}>
            <Flex paddingLeft={'2vw'} flexDirection={'column'} height={'70vh'} overflowY={'scroll'} border={'1px solid #ccc'} padding={'1vw'} width={'100%'} margin={'0 auto'}>
                    History
                    {history.map((item, index) => (
                        <>
                            <Text key={index} whiteSpace={'pre-wrap'} marginBottom={'1vh'}>
                            {index + 1}. {item.timestamp}
                            </Text>
                            <Text key={index} whiteSpace={'pre-wrap'} marginBottom={'1vh'}>
                                User:<ReactMarkdown>{item.question}</ReactMarkdown>
                            </Text>
                            <Text key={index} whiteSpace={'pre-wrap'} marginBottom={'1vh'}>
                                Chatgpt:<ReactMarkdown>{item.content}</ReactMarkdown>
                            </Text>
                            <Divider orientation='horizontal' />
                        </>
                        
                    
                    ))} 
                    
            </Flex>
            <Button colorScheme={'green'} onClick={()=>submitQuery()}>Clear History</Button>
            </Flex> 
            <Flex flexDirection={'column'} maxHeight={'75vh'}outlineOffset={'0'} padding={'5px'} marginLeft={'10px'} marginRight={'10px'}  fontSize={'1vw'} bg={'#f0f0f0'} height={'70vh'}  width={'40%'}>
            <Textarea minHeight={'65vh'} border={'InactiveBorder'} placeholder={"Enter here!"} onChange={(e) => setQuery(((e.target.value)))}></Textarea>
            <Button colorScheme={'blue'} onClick={()=>submitQuery()}>Submit</Button>
            </Flex>
            
            <Text padding={'30px'} marginLeft={'10px'} marginRight={'10px'} border={'1px solid black'} borderRadius={'10px'} fontSize={'1vw'}  bg={'#f0f0f0'} height={'70vh'} width={'40%'} whiteSpace={'pre-wrap'} overflowY={'scroll'}overflowX={'hidden'} ><ReactMarkdown>{reply}</ReactMarkdown></Text>
        </Flex>
        
        

        </>
        

    )
}
export default Chat;