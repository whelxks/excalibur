import { forwardRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/theme';

type Props = { value: string; onChangeText: (t: string) => void; onSend: () => void };

export const Composer = forwardRef<TextInput, Props>(function Composer({ value, onChangeText, onSend }, ref) {
  const canSend = value.trim().length > 0;
  return <View style={s.row}>
    <Pressable style={s.add}><Ionicons name="add" size={22} color={colors.muted}/></Pressable>
    <TextInput ref={ref} value={value} onChangeText={onChangeText} onSubmitEditing={onSend} returnKeyType="send" multiline
      placeholder="Message your host…" placeholderTextColor="#999187" style={s.input}/>
    <Pressable onPress={onSend} disabled={!canSend} style={[s.send, !canSend && s.sendOff]}>
      <Ionicons name="arrow-up" size={20} color={colors.cream}/>
    </Pressable>
  </View>
});
const s = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, alignItems: 'flex-end', paddingHorizontal: 12, paddingBottom: 18, backgroundColor: '#FFF9EF' },
  add: { width: 40, height: 46, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, minHeight: 46, maxHeight: 120, borderRadius: 18, backgroundColor: colors.paper2, paddingHorizontal: 15, paddingTop: 13, paddingBottom: 13, fontFamily: 'DMSans_400Regular', fontSize: 14, color: colors.ink },
  send: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.terra, alignItems: 'center', justifyContent: 'center' },
  sendOff: { backgroundColor: '#D9C6BC' },
});
