import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios'; // Ensure axios is imported

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://10.141.221.60:5000/api/login', { email, password });
            if (response.status === 200) {
                const { token } = response.data;
                console.log('Login successful:', token);
                Alert.alert('Login Successful');
                router.push('/(home)/register'); // Navigate to the register screen
            }
        } catch (error) {
            if (error.response) {
                console.error('Login error:', error.response.data);
                Alert.alert('Login Failed', error.response.data.message || 'An error occurred');
            } else {
                console.error('Login error:', error.message);
                Alert.alert('Login Failed', 'An error occurred');
            }
        }
    };
    return (
        <View style={{ borderColor: 'blue', borderWidth: 2, margin: 40, width: 320, height: 400 }}>
            <View>
                <Text style={{
                    color: 'blue',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 50,
                    fontSize: 30,
                    fontWeight: 'bold'
                }}>
                    Login
                </Text>
            </View>

            <View>
                <TextInput
                    style={{
                        width: 300,
                        height: 40,
                        borderColor: 'red',
                        borderWidth: 2,
                        borderRadius: 5,
                        padding: 10,
                        marginLeft: 10,
                        marginTop: 30,
                    }}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email} // Bind the value to state
                    onChangeText={setEmail} // Update state on text change
                />

                <TextInput
                    style={{
                        width: 300,
                        height: 40,
                        borderColor: 'red',
                        borderWidth: 2,
                        borderRadius: 5,
                        padding: 10,
                        marginLeft: 10,
                        marginTop: 30,
                    }}
                    placeholder="Password"
                    secureTextEntry
                    value={password} // Bind the value to state
                    onChangeText={setPassword} // Update state on text change
                />
            </View>

            <View>
                <TouchableOpacity onPress={() => router.push('/(home)/register')}>
                    <Text style={{ color: 'blue', marginTop: 20 }}>Create account?</Text>
                </TouchableOpacity>
            </View>


            <View>
                <TouchableOpacity onPress={() => router.push('/(home)/fetch')}>
                    <Text style={{ color: 'blue', marginTop: 20 }}>list of user</Text>
                </TouchableOpacity>
            </View>


            <View style={{ marginTop: 20 }}>
                <Button
                    title="Login"
                    onPress={() => router.push("/(home)/fetch")}// Call handleLogin on button press
                />
            </View>
        </View>
    );
};

export default Login;
