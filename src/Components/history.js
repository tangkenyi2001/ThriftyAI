import React, { useState } from 'react';
import { Box,Button, Text,Textarea,Flex,Divider} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown';

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Use 24-hour format, set to true for 12-hour format
    };
    return date.toLocaleString('en-US', options);
}
function History(){
    const [history, setHistory] = useState([]);
    function loadDB(){
        fetch(`http://127.0.0.1:5000/loadhistory`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setHistory(data); // Update the history state with the fetched data
        })
        .catch((error) => {
            console.error('Error loading history:', error);
        });
    }
    function resetDB(){
        fetch(`http://127.0.0.1:5000/resetdb`, {
            method: 'DELETE', // Use DELETE method
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data.message); // Log success message
            setHistory([]); // Clear the history state in your React component
        })
        .catch((error) => {
            console.error('Error resetting database:', error);
        });
    }
    

    return(
        <>
            <Flex flexDirection={'column'} height={'70vh'} border={'1px solid #ccc'} width={'20%'} margin={'0 auto'} marginTop={'10vh'} border={'InactiveBorder'}>
            <Flex paddingLeft={'2vw'} flexDirection={'column'} height={'70vh'} overflowY={'scroll'} border={'1px solid #ccc'} padding={'1vw'} width={'100%'}bg={'#f0f0f0'}borderRadius={'0px'}>
                    History 
                    <br/>Sorted by Most Recent
                    {history.map((item, index) => (
                        <>
                            <React.Fragment key={item.createdAt}>
                            <Text marginBottom={'1vh'}>
                                {index + 1}. {formatDate(item.createdAt)}
                            </Text>
                            <Text marginBottom={'1vh'}>
                                <Flex borderRadius={'10px'}bg={'#003135'} justifyContent={'center'}>
                                    <Text color={'white'}>User</Text>
                                </Flex>
                                 <Box border={'1px solid black'} borderRadius={'10px'}paddingLeft={'1vw'}>
                                 <ReactMarkdown>{item.request}</ReactMarkdown>
                                 </Box>
                                
                            </Text>
                            <Text marginBottom={'1vh'}>
                                <Flex borderRadius={'10px'}bg={'#afdde5'} justifyContent={'center'}>
                                    <Text>Chatgpt</Text>
                                </Flex>
                                <Box border={'1px solid black'}borderRadius={'10px'}paddingLeft={'1vw'}>
                                <ReactMarkdown>{item.response}</ReactMarkdown>
                                </Box>
                            </Text>
                            <Divider orientation='horizontal' />
                        </React.Fragment>
                        </>
                        
                    
                    ))} 
                    
            </Flex>
            <Flex bg={'#024950'} justifyContent={'space-evenly'}>
            <Button colorScheme={'red'} onClick={()=>loadDB()}>Load History</Button>
            <Button colorScheme={'green'} onClick={()=>resetDB()}>Clear History</Button>
            </Flex>
            
            </Flex> 


        </>
    )
}
export default History;