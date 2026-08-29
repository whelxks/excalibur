import { Text, View, StyleSheet } from 'react-native';
import { colors } from '@/lib/theme';

export function Brand({light=false}:{light?:boolean}) {
  return <View style={s.row}><View style={[s.dot,{backgroundColor: light ? colors.gold : colors.terra}]} /><Text style={[s.word,{color:light?colors.cream:colors.ink}]}>EVERY TOURIST</Text></View>
}
const s=StyleSheet.create({row:{flexDirection:'row',alignItems:'center',gap:9},dot:{width:10,height:10,borderRadius:5},word:{fontFamily:'DMSans_700Bold',fontSize:13,letterSpacing:2.5}});
