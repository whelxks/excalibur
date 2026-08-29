import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { colors } from '@/lib/theme';

export function EmojiSticker({emoji, color, size=92, rotate='-4deg', style}:{emoji:string, color:string, size?:number, rotate?:string, style?:ViewStyle}) {
 return <View style={[s.wrap,{width:size,height:size,borderRadius:size/2,backgroundColor:color,transform:[{rotate}]},style]}>
  <Text style={{fontSize:size*0.44}}>{emoji}</Text>
 </View>
}
const s=StyleSheet.create({wrap:{alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:colors.cream,shadowColor:'#000',shadowOpacity:.2,shadowRadius:5,shadowOffset:{width:0,height:3}}});
