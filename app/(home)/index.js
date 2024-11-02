import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Index = () => {  
    const router = useRouter(); 

    const handleNavigate = () => {
        router.push('./register'); // Push to the register screen
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
                    fontWeight: 'bold' // Changed to 'bold' for proper weight
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
                    keyboardType="email-address" // Added for better user experience
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
                    secureTextEntry // Added to hide password input
                />
            </View>

            <View>
                <TouchableOpacity onPress={handleNavigate}>
                    <Text style={{ color: 'blue', marginTop: 20 }}>Create account?</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}> 
                <Button
                    title="Login"
                    onPress={() => {
                        // Handle login action here
                        console.log('Login pressed');
                    }}
                />
            </View>
        </View>
    );
};

export default Index; 
