import { StyleSheet, View, type ViewStyle } from 'react-native';

export function WashiTape({color, style}:{color:string, style?:ViewStyle}) {
 return <View style={[s.tape,{backgroundColor:color},style]}/>
}
const s=StyleSheet.create({tape:{position:'absolute',width:74,height:24,opacity:.6,borderRadius:2,borderWidth:1,borderColor:'rgba(255,255,255,.5)'}});
