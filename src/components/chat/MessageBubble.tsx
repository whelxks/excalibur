import { StyleSheet, Text, View } from 'react-native';
import type { MessageResponse } from 'stream-chat';
import { clockTime } from '@/lib/chatFormat';
import { colors } from '@/lib/theme';

/** Warm forest/cream bubbles — deliberately not Stream's default blue. */
export function MessageBubble({ message, mine }: { message: MessageResponse; mine: boolean }) {
  return <View style={[s.wrap, mine && { alignItems: 'flex-end' }]}>
    <Text style={s.sender}>{mine ? 'YOU' : (message.user?.name ?? 'Local').toUpperCase()}</Text>
    <View style={[s.bubble, mine ? s.mine : s.theirs]}>
      <Text style={[s.text, mine && { color: colors.cream }]}>{message.text}</Text>
    </View>
    <Text style={s.time}>{clockTime(message as any)}</Text>
  </View>
}
const s = StyleSheet.create({
  wrap: { alignItems: 'flex-start' },
  sender: { fontFamily: 'DMSans_700Bold', fontSize: 8, letterSpacing: 1.3, color: colors.muted, marginBottom: 4 },
  bubble: { maxWidth: '82%', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 18 },
  mine: { backgroundColor: colors.forest, borderBottomRightRadius: 5 },
  theirs: { backgroundColor: colors.cream, borderBottomLeftRadius: 5, borderWidth: 1, borderColor: '#E5DBCF' },
  text: { fontFamily: 'DMSans_400Regular', fontSize: 14, lineHeight: 20, color: colors.ink },
  time: { fontFamily: 'DMSans_500Medium', fontSize: 8, color: '#A39B91', marginTop: 4 },
});
