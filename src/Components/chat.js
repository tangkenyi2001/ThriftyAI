import React, { useState } from 'react';
import { Button, Text,Textarea,Flex,Divider} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown';

function Chat() {
    const [query, setQuery] = useState('');
    const [reply, setReply] = useState('');
    
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
            
            
        })
        .catch((error) => console.error("Error:", error));

    }
    return (
        <>

        <Flex marginTop={'10vh'} height={'80vh'} width={'80%'} justifyContent={'center'} overflow={'hidden'}>
            
            <Flex flexDirection={'column'} maxHeight={'75vh'}outlineOffset={'0'} marginLeft={'10px'} marginRight={'10px'}  fontSize={'1vw'} bg={'#f0f0f0'} height={'70vh'}  width={'40%'}>
            <Textarea minHeight={'65vh'} border={'InactiveBorder'} placeholder={"Enter here!"} onChange={(e) => setQuery(((e.target.value)))}></Textarea>
            <Button colorScheme={'blue'} onClick={()=>submitQuery()}>Submit</Button>
            </Flex>
            
            <Text padding={'30px'} marginLeft={'10px'} marginRight={'10px'} border={'1px solid black'} borderRadius={'10px'} fontSize={'1vw'}  bg={'#f0f0f0'} height={'70vh'} width={'40%'} whiteSpace={'pre-wrap'} overflowY={'scroll'}overflowX={'hidden'} ><ReactMarkdown>{reply}</ReactMarkdown></Text>
        </Flex>
        
        

        </>
        

    )
}
export default Chat;