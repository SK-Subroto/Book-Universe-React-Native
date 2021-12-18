import React, { useEffect, useState } from 'react';
import { VStack, Center, Heading, Box, Image, HStack, ScrollView, Text, Spacer, Flex, Button, View, Stack, Spinner, Input } from "native-base"
import { Rating } from 'react-native-ratings';
import { useNavigate } from 'react-router-native';

const Books = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [filterBooks, setFilterBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const categories = ['Novel', 'Poem', 'Story', 'Sci-Fi', 'Programming'];

    useEffect(() => {
        fetch('https://sk-book-rent.herokuapp.com/books')
            .then(res => res.json())
            .then(data => setBooks(data.books))
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        // console.log(search)
    }, [search]);

    const handleBookDetails = id => {
        navigate(`/details/${id}`);
    }
    return (
        <>
            <Center bg="violet.400" w="xl">
                <Input
                    bg="light.100"
                    variant="rounded"
                    mx="3"
                    placeholder="Search"
                    w="2/4"
                    size="md"
                    mb={6}
                    value={search}
                    onChangeText={text => setSearch(text)}
                />
            </Center>
            {!loading ?
                <ScrollView
                    _contentContainerStyle={{
                        p: "20px",
                        mb: "4",
                        minW: "72",
                    }}
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Stack space={3} alignItems="center" py={4}>
                            <HStack space={3} alignItems="center">
                                {
                                    categories.map((category, index) => (
                                        <Center key={index} px={4} mx={1} bg="muted.200" rounded="md" shadow={3}>
                                            <Text fontSize={18}>{category}</Text>
                                        </Center>
                                    ))
                                }
                            </HStack>
                        </Stack>
                    </ScrollView>
                    <VStack space={4} alignItems="center">
                        {
                            books.map(book => (
                                <Box key={book._id} p={4} w="350" rounded="lg" shadow={2} bg="light.50">
                                    <HStack px={4} space={3} justifyContent="space-between">
                                        <Image
                                            alt="Alternate Text"
                                            size="lg"
                                            resizeMode="contain"
                                            source={{
                                                uri: `${book.img}`,
                                            }}
                                        />
                                        <VStack>
                                            <Text
                                                _dark={{
                                                    color: "warmGray.50",
                                                }}
                                                color="coolGray.800"
                                                bold
                                            >
                                                {book.title}
                                            </Text>
                                            <Text
                                                color="coolGray.600"
                                                _dark={{
                                                    color: "warmGray.200",
                                                }}
                                            >
                                                {book.author}
                                            </Text>
                                            <View>
                                                <Rating
                                                    type='custom'
                                                    // count={4}
                                                    startingValue={book.rating}
                                                    ratingCount={5}
                                                    fractions={2}
                                                    imageSize={20}
                                                    // showRating
                                                    readonly={true}
                                                    ratingColor={"goldenrod"}
                                                    ratingBackgroundColor='#c8c7c8'
                                                    tintColor="#FAFAF9"
                                                />
                                            </View>
                                            <HStack space={8} alignItems="center">
                                                <Text
                                                    color="coolGray.600"
                                                    _dark={{
                                                        color: "warmGray.200",
                                                    }}
                                                >
                                                    ${book.price}/day
                                                </Text>
                                                <Button
                                                    size="sm"
                                                    colorScheme="secondary"
                                                    onPress={() => handleBookDetails(book._id)}
                                                >
                                                    Rent
                                                </Button>
                                            </HStack>
                                        </VStack>
                                    </HStack>
                                </Box>
                            ))

                        }
                    </VStack>
                </ScrollView>
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

export default Books;