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
const PORT = process.env.PORT || 5000;
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
    const handleResetClick = () => {
        const confirmClear = window.confirm("Are you sure you want to clear the history?");
        if (confirmClear) {
            resetDB();
        }
    };
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
    function generatepdf() {
        fetch(`http://127.0.0.1:5000/generatepdf`, {
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob(); // Expect a binary response (PDF)
        })
        .then((blob) => {
            // Create a URL for the blob object
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'entries.pdf'); // Name for the downloaded file
            document.body.appendChild(link);
            link.click(); // Trigger the download
            link.parentNode.removeChild(link); // Clean up
        })
        .catch((error) => {
            console.error('Error generating PDF:', error);
        });
    }

    return(
        <>
            <Flex marginTop={'5vh'} marginBottom={'5vh'} flexDirection={'column'} height={'85vh'} border={'1px solid #ccc'} width={'20%'} >
                <Flex bg={'#adBBDA'} flexDirection={'column'} justifyContent={'center'}padding={'10px'}>
                    <Text>History</Text>
                    <Box>Sorted by Most Recent</Box>
                </Flex>
            <Flex paddingLeft={'2vw'} flexDirection={'column'} height={'100%'} overflowY={'scroll'}  padding={'1vw'} width={'100%'} bg={'#f0f0f0'}>
                    {history.map((item, index) => (
                        <>
                            <React.Fragment key={item.createdAt}>
                            <Text marginBottom={'1vh'} width={'100%'}>
                                {index + 1}. {formatDate(item.createdAt)}
                            </Text>
                            <Text marginBottom={'1vh'}>
                                <Flex bg={'#003135'} justifyContent={'center'}>
                                    <Text color={'white'}>User</Text>
                                </Flex>
                                 <Box bg={'#003135'} textColor={'white'}paddingLeft={'1vw'}>
                                 <ReactMarkdown components={{
                                    pre: ({ node, ...props }) => (
                                        <Box as="pre" whiteSpace="pre-wrap" {...props} />
                                    ),
                                    code: ({ node, ...props }) => (
                                        <Box as="code" whiteSpace="pre-wrap" {...props} />
                                    )
                                }}
                                    >{item.request}</ReactMarkdown>
                                 </Box>
                                
                            </Text>
                            <Text marginBottom={'1vh'}>
                                <Flex bg={'#afdde5'} justifyContent={'center'}>
                                    <Text>Chatgpt</Text>
                                </Flex>
                                <Box bg={'#afdde5'} paddingLeft={'1vw'}>
                                <ReactMarkdown components={{
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
          }}>{item.response}</ReactMarkdown>
                                </Box>
                            </Text>
                            <Divider orientation='horizontal' />
                        </React.Fragment>
                        </>
                        
                    
                    ))} 
                    
            </Flex>
            <Flex justifyContent={'space-evenly'}>
            <Button colorScheme={'red'} onClick={()=>loadDB()}>Load History</Button>
            <Button colorScheme={'green'} onClick={()=>handleResetClick()}>Clear History</Button>
            <Button colorScheme={'blue'} onClick={()=>generatepdf()}>Generate PDF</Button>
            </Flex>
            
            </Flex> 


        </>
    )
}
export default History;