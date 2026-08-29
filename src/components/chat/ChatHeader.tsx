import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/theme';

type Props = { name: string; image?: string; activityName: string; city: string; onBack: () => void; onPressProfile: () => void };

export function ChatHeader({ name, image, activityName, city, onBack, onPressProfile }: Props) {
  return <View style={s.head}>
    <Pressable onPress={onBack} style={s.back} hitSlop={8}><Ionicons name="arrow-back" size={21} color={colors.ink}/></Pressable>
    <Pressable onPress={onPressProfile} style={s.center} hitSlop={6}>
      {image ? <Image source={{ uri: image }} style={s.avatar}/> : <View style={[s.avatar, s.avatarFallback]}/>}
      <View style={{ flex: 1 }}>
        <Text style={s.name} numberOfLines={1}>{name}</Text>
        <Text style={s.activity} numberOfLines={1}><Text style={s.city}>{city.toUpperCase()}</Text>  {activityName}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.muted}/>
    </Pressable>
  </View>
}
const s = StyleSheet.create({
  head: { paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', gap: 8, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line, backgroundColor: colors.paper },
  back: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center' },
  center: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.paper2 },
  avatarFallback: { borderWidth: 1, borderColor: colors.line },
  name: { fontFamily: 'Fraunces_700Bold', fontSize: 19, color: colors.ink },
  activity: { fontFamily: 'DMSans_500Medium', fontSize: 10, color: colors.muted, marginTop: 1 },
  city: { fontFamily: 'DMSans_700Bold', fontSize: 9, letterSpacing: 1.1, color: colors.terra },
});
