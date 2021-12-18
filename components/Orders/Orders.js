import React, { useEffect, useState } from 'react';
import {
    Box,
    FlatList,
    Heading,
    Avatar,
    HStack,
    VStack,
    Text,
    Spacer,
    Center,
    NativeBaseProvider,
    Divider,
    Image,
    Spinner,
    Button,
    View,
} from "native-base"
import useAuth from '../../hooks/useAuth';

const Orders = () => {
    const { user } = useAuth();
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://sk-book-rent.herokuapp.com/orders?email=${user.email}`)
            .then(res => res.json())
            .then(data => setMyOrders(data))
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, []);

    const handleDeleteOrder = id => {
        fetch(`https://sk-book-rent.herokuapp.com/orders/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    const remainingOrders = myOrders.filter(order => order._id !== id);
                    setMyOrders(remainingOrders);
                }
            })
            .catch(err => console.log(err))
    }

    const renderItem = ({ item }) => {
        return (
            <Box mb={4} border="1" borderRadius="md" bg="muted.200">
                <HStack space="4" divider={<Divider />} py={2}>
                    <Center>
                        <Image
                            source={{
                                uri: `${item.bookImg}`,
                            }}
                            resizeMode="contain"
                            alt="Alternate Text"
                            size="xl"
                        />
                    </Center>
                    <Box px="4">
                        <Text fontWeight="bold" fontSize="18">{item.bookTitle}</Text>
                        <HStack><Text fontWeight='bold'>Start Date: </Text><Text>{item.startDate}</Text></HStack>
                        <HStack><Text fontWeight='bold'>Duration: </Text><Text>{item.duration} days</Text></HStack>
                        <HStack><Text fontWeight='bold'>Cost: </Text><Text>{item.totalCost.toFixed(2)} $</Text></HStack>
                        <HStack><Text fontWeight='bold'>Status: </Text>{item.status ? <Text>Approved</Text> : <Text>Pending</Text>}</HStack>
                        <Button size="sm" colorScheme="secondary" onPress={() => handleDeleteOrder(item._id)}>
                            Cancel
                        </Button>
                    </Box>
                </HStack>
            </Box>
        )
    }
    return (
        <>
            {!loading ?
                <Box
                    w={{
                        base: "100%",
                        md: "25%",
                    }}
                    flex={1}
                >
                    <Heading fontSize="xl" p="4" pb="3">
                        My Order
                    </Heading>
                    <FlatList
                        data={myOrders}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                    />
                </Box>
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

export default Orders;