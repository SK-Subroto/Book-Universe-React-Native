import React from "react";
import {
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
  Image,
  Box,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import Books from "./components/Books/Books";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { NativeRouter, Route, Link, Routes } from "react-router-native";
import Profile from "./components/Profile/Profile";
import Orders from "./components/Orders/Orders";
import BookDetails from "./components/BookDetails/BookDetails";
import Login from "./components/Login/Login";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import Register from "./components/Register/Register";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ManageOrders from "./components/ManageOrders/ManageOrders";
import AddBook from "./components/AddBook/AddBook";
import AddAdmin from "./components/AddAdmin/AddAdmin";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <Center
          _dark={{ bg: "blueGray.900" }}
          _light={{ bg: "blueGray.50" }}
          // px={4}
          flex={1}
          safeArea
        >
          <NativeRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Books />} />
              <Route path="/home" element={<Books />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/order" element={<PrivateRoute><Orders /></PrivateRoute>} />
              <Route path="/details/:id" element={<PrivateRoute><BookDetails /></PrivateRoute>}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/manageorder" element={<PrivateRoute><ManageOrders /></PrivateRoute>} />
              <Route path="/addbook" element={<PrivateRoute><AddBook /></PrivateRoute>} />
              <Route path="/addadmin" element={<PrivateRoute><AddAdmin /></PrivateRoute>} />
            </Routes>
            <Footer />
          </NativeRouter>
          {/* <Header />
        <Books />
        <Footer /> */}
        </Center>
      </AuthProvider>
    </NativeBaseProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}

{/* <VStack space={5} alignItems="center">
  <NativeBaseIcon />
  <Heading size="lg">Welcome to NativeBase</Heading>
  <HStack space={2} alignItems="center">
    <Text>Edit</Text>
    <Code>App.js</Code>
    <Text>and save to reload.</Text>
  </HStack>
  <Link href="https://docs.nativebase.io" isExternal>
    <Text color="primary.500" underline fontSize={"xl"}>
      Learn NativeBase
    </Text>
  </Link>
  <ToggleDarkMode />
</VStack> */}