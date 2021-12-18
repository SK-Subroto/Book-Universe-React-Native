import {
    Input,
    KeyboardAvoidingView,
    Text,
    Button,
    VStack,
    Heading,
    useBreakpointValue,
    Center,
} from "native-base"
import { Platform } from "react-native";
import React, { useEffect, useState } from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-native';
import { auth } from "../../firebase";


const Login = () => {

    const { user, loginUser, registerUser, isLoading, authError, setAuthError } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')


    const handleLogin = () => {
        loginUser(email, password, location, navigate);
    }
    // console.log(user);
    return (
        <Center flex={1}>
            <KeyboardAvoidingView
                h={{
                    base: "300px",
                    lg: "auto",
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <VStack p="6" flex="1" justifyContent="flex-end">
                    <Heading fontSize={24} mb="3">
                        Sign In
                    </Heading>
                    <Input
                        variant="rounded"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        placeholder="Email Address"
                        mb="4"
                        w="300"
                    />
                    <Input
                        variant="rounded"
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        mb="4"
                        secureTextEntry
                    />
                    <Button onPress={handleLogin} mb="4">Sign In</Button>
                </VStack>
                <Link
                    to="/register"
                // style={styles.subNavItem}
                // underlayColor="#f0f4f7"
                >
                    <Center><Text>Create A New Account</Text></Center>
                </Link>
                {/* <Button size="sm" variant="link" colorScheme="secondary">
                        Create A New Account
                    </Button> */}

            </KeyboardAvoidingView>
        </Center>
    );
};

export default Login;