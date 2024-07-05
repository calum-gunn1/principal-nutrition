import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/contexts/SessionContext";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inviteCode, setInviteCode] = useState<string>(""); // Add invite code state
  const [error, setError] = useState<string>("");
  const { login, register } = useSession();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password, inviteCode); // Pass invite code
      router.replace("/(tabs)");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Login / Register
      </Text>
      {error ? (
        <Text style={[styles.error, { color: theme.text }]}>{error}</Text>
      ) : null}
      <Text style={[styles.label, { color: theme.text }]}>Email</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.inputBackground, color: theme.text },
        ]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={theme.icon}
      />
      <Text style={[styles.label, { color: theme.text }]}>Password</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.inputBackground, color: theme.text },
        ]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={theme.icon}
      />
      <Text style={[styles.label, { color: theme.text }]}>Invite Code</Text>{" "}
      {/* Add invite code input */}
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.inputBackground, color: theme.text },
        ]}
        placeholder="Invite Code"
        value={inviteCode}
        onChangeText={setInviteCode}
        placeholderTextColor={theme.icon}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={handleLogin}
          color={theme.buttonBackground}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Register"
          onPress={handleRegister}
          color={theme.buttonBackground}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default LoginScreen;
