import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Host } from '@/lib/types';
import { colors, shadow } from '@/lib/theme';

export function HostCard({host}:{host:Host}){
 return <View style={[s.card,shadow]}><ImageBackground source={{uri:host.image}} style={s.img} imageStyle={s.radius}>
  <LinearGradient colors={['transparent','rgba(9,14,12,.9)']} style={StyleSheet.absoluteFillObject}/>
  <View style={s.verify}><Ionicons name="shield-checkmark" size={14} color={colors.forest}/><Text style={s.verifyText}>VERIFIED LOCAL</Text></View>
  <View><View style={s.nameRow}><Text style={s.name}>{host.name}, {host.age}</Text><Text style={s.rating}>★ {host.rating}</Text></View><Text style={s.tagline}>{host.tagline}</Text></View>
 </ImageBackground>
 <View style={s.info}><Text style={s.bio}>{host.bio}</Text><View style={s.badges}>{host.badges.map(b=><Text key={b} style={s.badge}>{b}</Text>)}</View><Text style={s.languages}>{host.languages.join(' · ')}</Text></View>
 </View>
}
const s=StyleSheet.create({card:{borderRadius:30,overflow:'hidden',backgroundColor:colors.cream},img:{height:430,padding:20,justifyContent:'space-between'},radius:{borderTopLeftRadius:30,borderTopRightRadius:30},verify:{alignSelf:'flex-start',flexDirection:'row',gap:6,alignItems:'center',backgroundColor:colors.firefly,paddingVertical:8,paddingHorizontal:11,borderRadius:999},verifyText:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:1.2,color:colors.forest},nameRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end'},name:{fontFamily:'Fraunces_700Bold',fontSize:38,color:colors.cream},rating:{fontFamily:'DMSans_700Bold',fontSize:15,color:colors.gold},tagline:{fontFamily:'DMSans_500Medium',fontSize:15,color:'#EEE5D9',marginTop:5},info:{padding:20,gap:16},bio:{fontFamily:'DMSans_400Regular',fontSize:16,lineHeight:23,color:colors.ink},badges:{flexDirection:'row',flexWrap:'wrap',gap:7},badge:{fontFamily:'DMSans_700Bold',fontSize:9,letterSpacing:1,color:colors.forest,borderWidth:1,borderColor:'#A7B1A9',borderRadius:999,paddingHorizontal:9,paddingVertical:7},languages:{fontFamily:'DMSans_500Medium',fontSize:13,color:colors.muted}});
