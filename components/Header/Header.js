import { View, Box, Heading, StatusBar, Input, Center } from 'native-base';
import React from 'react';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const { user, admin } = useAuth();
    console.log('admin ' + admin);
    return (
        <>
            <StatusBar backgroundColor="#A78BFA"
                barStyle="light-content" />
            <View bg="violet.400" w="xl">
                <Heading textAlign="center" my="5" color="lightText">
                    THE BOOK UNIVERSE
                </Heading>
            </View>
        </>
    );
};

export default Header;