import {
    Button, Center, Heading, HStack, Image, Text, Modal,
    FormControl,
    Input,
    View,
    Spinner,
    useToast
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useParams } from 'react-router-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import useAuth from '../../hooks/useAuth';

const BookDetails = () => {
    const { id } = useParams();
    const { user } = useAuth()
    const [showModal, setShowModal] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [address, setAddress] = useState('');

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);

    const toast = useToast();

    const handleSaveRent = () => {
        const duration = Math.abs(new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24);
        const bodyData = {
            startDate,
            endDate,
            duration,
            totalCost: duration * book?.price,
            bookTitle: book?.title,
            bookImg: book?.img,
            address,
            status: false,
            userName: user.displayName,
            useEmail: user.email
        }
        fetch('https://sk-book-rent.herokuapp.com/orders', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.show({
                        description: "Successfully Ordered",
                    })
                }
            })
            .catch(err => console.log(err))
        console.log(bodyData);
        setShowModal(false)
    }


    useEffect(() => {
        fetch(`https://sk-book-rent.herokuapp.com/books/${id}`)
            .then(res => res.json())
            .then(data => setBook(data))
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, []);

    // const [date, setDate] = useState(new Date(1598051730000));
    // const [mode, setMode] = useState('date');
    // const [show, setShow] = useState(false);

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
    //     console.log(date);
    // };

    // const showMode = (currentMode) => {
    //     setShow(true);
    //     setMode(currentMode);
    // };

    // const showDatepicker = () => {
    //     showMode('date');
    // };

    // const showTimepicker = () => {
    //     showMode('time');
    // };

    return (
        <>
            {!loading ?
                <Center flex={1} my={4}>
                    <Image
                        alt="Alternate Text"
                        size="2xl"
                        resizeMode="contain"
                        source={{
                            uri: `${book?.img}`,
                        }}
                    />
                    <Heading fontSize="xl" p="4" pb="3">
                        {book?.title}
                    </Heading>
                    <Rating
                        type='custom'
                        // count={4}
                        startingValue={book?.rating}
                        ratingCount={5}
                        fractions={2}
                        imageSize={20}
                        // showRating
                        readonly={true}
                        ratingColor={"goldenrod"}
                        ratingBackgroundColor='#c8c7c8'
                        tintColor="#FAFAF9"
                    />
                    <Text w="350" mb={6}>{book.description}</Text>
                    <HStack space={8} alignItems="center">
                        <Text
                            color="coolGray.600"
                            fontSize={18}
                            _dark={{
                                color: "warmGray.200",
                            }}
                        >
                            ${book?.price}/day
                        </Text>
                        <Button
                            size="md"
                            colorScheme="secondary"
                            onPress={() => setShowModal(true)}
                        // onPress={() => handleBookDetails(2)}
                        >
                            Rent
                        </Button>
                    </HStack>
                    {/* modal */}
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Please Fill Up</Modal.Header>
                            <Modal.Body>
                                <FormControl>
                                    <FormControl.Label>Start Date</FormControl.Label>
                                    <Input
                                        value={startDate}
                                        placeholder="mm/dd/yyyy"
                                        onChangeText={text => setStartDate(text)}
                                    />
                                    {/* <View>
                                <Button onPress={showDatepicker}>Show date picker!</Button>
                            </View>
                            <View>
                                <Button onPress={showTimepicker}>Show time picker</Button>
                            </View> */}
                                    {/* {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )} */}
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>End Date</FormControl.Label>
                                    <Input
                                        value={endDate}
                                        placeholder="mm/dd/yyyy"
                                        onChangeText={text => setEndDate(text)}
                                    />
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>Address</FormControl.Label>
                                    <Input
                                        value={address}
                                        placeholder="address"
                                        onChangeText={text => setAddress(text)}
                                    />
                                </FormControl>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button
                                        variant="ghost"
                                        colorScheme="blueGray"
                                        onPress={() => {
                                            setShowModal(false)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onPress={handleSaveRent}
                                    >
                                        Save
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Center>
                :
                <HStack flex={1} space={2} alignItems="center">
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        Loading
                    </Heading>
                </HStack>
            }
        </>
    );
};

export default BookDetails;