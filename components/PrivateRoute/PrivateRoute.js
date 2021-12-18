import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-native';
import { Heading, HStack, Spinner } from 'native-base';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    let location = useLocation();
    // useEffect(() => {
    //     console.log(isLoading);
    // }, [isLoading])
    console.log(user.email);
    if (isLoading) {
        return <HStack flex={1} space={2} alignItems="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
                Loading
            </Heading>
        </HStack>
    }
    if (user.email) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;