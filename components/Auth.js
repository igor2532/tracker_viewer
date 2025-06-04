import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { sendCode, checkCode } from '../api';

export default function Auth({ onAuth }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);
    setMsg('');
    const r = await sendCode(email);
    setLoading(false);
    if (r.success) { setStep(2); setMsg('Код отправлен на email'); }
    else setMsg(r.error || 'Ошибка');
  };

  const handleCheckCode = async () => {
    setLoading(true);
    setMsg('');
    const r = await checkCode(email, code);
    setLoading(false);
    if (r.success) { onAuth(r); }
    else setMsg(r.error || 'Ошибка');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 18 }}>
      {step === 1 && (
        <>
          <Text style={{ fontSize: 24, marginBottom: 16 }}>Вход</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, width: 220, marginBottom: 16, padding: 12 }}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity onPress={handleSendCode}
            style={{ backgroundColor: '#2196f3', borderRadius: 8, padding: 12, width: 220, alignItems: 'center' }}
            disabled={loading || !email}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff' }}>Получить код</Text>}
          </TouchableOpacity>
          <Text style={{ color: '#666', marginTop: 16 }}>{msg}</Text>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={{ fontSize: 24, marginBottom: 16 }}>Введите код</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, width: 220, marginBottom: 16, padding: 12 }}
            placeholder="Код"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
          />
          <TouchableOpacity onPress={handleCheckCode}
            style={{ backgroundColor: '#2196f3', borderRadius: 8, padding: 12, width: 220, alignItems: 'center' }}
            disabled={loading || !code}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff' }}>Войти</Text>}
          </TouchableOpacity>
          <Text style={{ color: '#666', marginTop: 16 }}>{msg}</Text>
        </>
      )}
    </View>
  );
}
