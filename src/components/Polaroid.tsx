import { Image, StyleSheet, View, type ViewStyle } from 'react-native';
import { colors } from '@/lib/theme';

export function Polaroid({uri, size=92, rotate='3deg', style}:{uri:string, size?:number, rotate?:string, style?:ViewStyle}) {
 return <View style={[s.frame,{width:size,height:size,transform:[{rotate}]},style]}>
  <Image source={{uri}} style={s.img}/>
 </View>
}
const s=StyleSheet.create({frame:{backgroundColor:colors.cream,padding:6,paddingBottom:12,borderRadius:6,shadowColor:'#000',shadowOpacity:.22,shadowRadius:6,shadowOffset:{width:0,height:4}},img:{width:'100%',height:'100%',borderRadius:2}});
