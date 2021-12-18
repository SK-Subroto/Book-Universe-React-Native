import { Avatar, Button, Center, Heading, useToast, View } from 'native-base';
import React from 'react';
import { useNavigate } from 'react-router-native';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleSignIn = () => {
        navigate('/login');
    }
    const handleSignUp = () => {
        navigate('/register');
    }
    return (
        <Center
            flex={1}
        >
            {user.email ?
                <Center>
                    <Avatar
                        bg="warning.200"
                        size="xl"
                    // source={{
                    //     uri: "https://avatars.githubusercontent.com/u/47079665?v=4",
                    // }}
                    >
                        {user.displayName.slice(0, 1).toUpperCase()}
                    </Avatar>
                    <Heading size="md" my={4}>{user.displayName}</Heading>
                    <Button
                        size="lg"
                        variant="outline"
                        colorScheme="secondary"
                        onPress={logout}
                    >
                        Sign out
                    </Button>
                </Center>
                :
                <Center>
                    <Button
                        size="lg"
                        mb={4}
                        variant="outline"
                        colorScheme="secondary"
                        onPress={handleSignIn}
                    >
                        Sign In
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        colorScheme="primary"
                        onPress={handleSignUp}
                    >
                        Sign Up
                    </Button>
                </Center>
            }
        </Center>
    );
};

export default Profile;