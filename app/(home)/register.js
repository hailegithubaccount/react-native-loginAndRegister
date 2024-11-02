import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const Register = () => {
    const router = useRouter();

    // State for input values
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle registration
    const handleRegister = async () => {
        try {
            const response = await fetch('http://10.141.221.60:5000/api/register', { // Ensure the backend URL is correct
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful', data);
                // Navigate to a different screen or show a success message
                router.push('/some-other-route'); // Replace with the route you want to navigate to
            } else {
                console.error('Registration failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <View style={{ borderColor: 'blue', borderWidth: 2, margin: 40, width: 320, height: 400, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginTop: 20, fontSize: 30, fontWeight: 'bold' }}>Register</Text>

            <TextInput
                style={{ width: 300, height: 40, borderColor: 'red', borderWidth: 2, borderRadius: 5, padding: 10, marginTop: 30 }}
                placeholder="Username"
                value={username} 
                onChangeText={setUsername} 
            />
            <TextInput
                style={{ width: 300, height: 40, borderColor: 'red', borderWidth: 2, borderRadius: 5, padding: 10, marginTop: 30 }}
                placeholder="Email"
                value={email}
                onChangeText={setEmail} 
                keyboardType="email-address" 
            />
            <TextInput
                style={{ width: 300, height: 40, borderColor: 'red', borderWidth: 2, borderRadius: 5, padding: 10, marginTop: 30 }}
                placeholder="Password"
                secureTextEntry 
                value={password} 
                onChangeText={setPassword} 
            />

            <View style={{ marginTop: 20 }}>
                <Button
                    title="Register"
                    onPress={handleRegister} 
                />
            </View>
        </View>
    );
};

export default Register;
