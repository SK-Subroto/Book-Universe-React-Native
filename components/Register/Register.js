import React, { useEffect, useState } from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-native';
import { Button, Center, Heading, HStack, Input, KeyboardAvoidingView, Spinner, Text, useBreakpointValue, VStack } from 'native-base';
import { Platform } from 'react-native';

const Register = () => {
    // const isLargeScreen = useBreakpointValue({
    //     base: false,
    //     sm: false,
    //     md: false,
    //     lg: true,
    // })

    const { user, loginUser, registerUser, isLoading, authError, setAuthError } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // const handleGoogleSignIn = () => {
    //     signInWithGoogle(location, navigate)
    // }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [name, setName] = useState('')

    // const navigation = useNavigation()

    useEffect(() => {
        setAuthError('');
    }, [])

    const handleSignUp = () => {
        if (password !== password2) {
            setAuthError('Your password did not match');
            return
        } else {
            registerUser(email, password, name, navigate);
        }
    }

    return (
        <Center flex={1}>
            <KeyboardAvoidingView
                h={{
                    base: "500px",
                    lg: "auto",
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {!isLoading && <VStack p="6" flex="1" justifyContent="flex-end">
                    <Heading fontSize={24} mb="3">
                        Sign UP
                    </Heading>
                    <Input
                        variant="rounded"
                        value={name}
                        onChangeText={text => setName(text)}
                        placeholder="Full Name"
                        mb="4"
                        w="300"
                    />
                    <Input
                        variant="rounded"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        placeholder="Email Address"
                        mb="4"
                    />
                    <Input
                        variant="rounded"
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        mb="4"
                        secureTextEntry
                    />
                    <Input
                        variant="rounded"
                        placeholder="re-Password"
                        value={password2}
                        onChangeText={text => setPassword2(text)}
                        mb="4"
                        secureTextEntry
                    />
                    <Button onPress={handleSignUp} mb="4">Sign Up</Button>
                </VStack>}
                {isLoading && <HStack space={2} alignItems="center">
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        Loading
                    </Heading>
                </HStack>}
                {user?.email && <Text>User Created successfully!</Text>}
                <Text>{authError ? authError : ''}</Text>
            </KeyboardAvoidingView>
        </Center>
    );
};

export default Register;