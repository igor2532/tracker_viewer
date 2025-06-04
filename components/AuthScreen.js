import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { sendCode, checkCode } from "../api";
import { COLORS, RADIUS } from "../theme";

export default function AuthScreen({ onAuth }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);
    setMsg("");
    const r = await sendCode(email);
    setLoading(false);
    if (r.success) { setStep(2); setMsg("Код отправлен на email"); }
    else setMsg(r.error || "Ошибка");
  };

  const handleCheckCode = async () => {
    setLoading(true);
    setMsg("");
    const r = await checkCode(email, code);
    setLoading(false);
    if (r.success) { onAuth(r); }
    else setMsg(r.error || "Ошибка");
  };

  return (
    <LinearGradient colors={["#2193b0", "#6dd5ed"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1, justifyContent: "center", alignItems: "center" }} behavior="padding">
        <View style={styles.card}>
          <Text style={styles.logo}>🚀 Tracker Viewer</Text>
          {step === 1 && (
            <>
              <Text style={styles.title}>Вход по email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={[styles.button, (!email || loading) && styles.buttonDisabled]}
                onPress={handleSendCode}
                disabled={loading || !email}
                activeOpacity={0.8}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Получить код</Text>}
              </TouchableOpacity>
              {!!msg && <Text style={styles.msg}>{msg}</Text>}
            </>
          )}

          {step === 2 && (
            <>
              <Text style={styles.title}>Введите код из письма</Text>
              <TextInput
                style={styles.input}
                placeholder="Код"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
              />
              <TouchableOpacity
                style={[styles.button, (!code || loading) && styles.buttonDisabled]}
                onPress={handleCheckCode}
                disabled={loading || !code}
                activeOpacity={0.8}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Войти</Text>}
              </TouchableOpacity>
              {!!msg && <Text style={styles.msg}>{msg}</Text>}
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 28,
    borderRadius: RADIUS * 1.5,
    width: 320,
    alignItems: "center",
    shadowColor: "#222",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  logo: { fontSize: 28, fontWeight: "900", color: COLORS.primary, marginBottom: 22 },
  title: { fontWeight: "bold", fontSize: 21, color: COLORS.text, marginBottom: 18 },
  input: { borderWidth: 1.2, borderColor: COLORS.primary, backgroundColor: "#f8fafd", borderRadius: RADIUS, width: 230, marginBottom: 18, padding: 13, fontSize: 16, color: COLORS.text },
  button: { backgroundColor: COLORS.primary, paddingVertical: 13, borderRadius: RADIUS, alignItems: "center", width: 180, marginTop: 8 },
  buttonDisabled: { backgroundColor: "#aaa" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 17 },
  msg: { color: COLORS.error, marginTop: 13, fontSize: 15 },
});
