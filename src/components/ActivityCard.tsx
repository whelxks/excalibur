import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import type { Activity } from '@/lib/types';
import { colors, shadow } from '@/lib/theme';

export function ActivityCard({activity,onPress}:{activity:Activity,onPress:()=>void}){
 const left=activity.maxPax-activity.joined;
 return <Pressable onPress={onPress} style={[s.card,shadow]}>
   <ImageBackground source={{uri:activity.image}} style={s.image} imageStyle={s.imageRadius}>
    <LinearGradient colors={['transparent','rgba(8,13,11,.82)']} style={StyleSheet.absoluteFillObject}/>
    <View style={s.top}><Text style={s.tag}>{activity.category}</Text><View style={s.pax}><Ionicons name="people" size={14} color={colors.cream}/><Text style={s.paxT}>{activity.joined}/{activity.maxPax}</Text></View></View>
    <View style={s.bottom}><Text style={s.title}>{activity.title}</Text><View style={s.meta}><Text style={s.metaT}>{activity.neighbourhood} · {activity.duration}</Text><Text style={s.price}>${activity.price}</Text></View></View>
   </ImageBackground>
   <View style={s.foot}><Text style={s.blurb} numberOfLines={2}>{activity.blurb}</Text><View style={s.spots}><View style={[s.statusDot,{backgroundColor:left===0?colors.danger:colors.moss}]}/><Text style={s.spotsT}>{left===0?'Waitlist':`${left} ${left===1?'spot':'spots'} left`}</Text></View></View>
 </Pressable>
}
const s=StyleSheet.create({card:{backgroundColor:colors.cream,borderRadius:26,marginBottom:24,overflow:'hidden'},image:{height:360,justifyContent:'space-between',padding:18},imageRadius:{borderTopLeftRadius:26,borderTopRightRadius:26},top:{flexDirection:'row',justifyContent:'space-between'},tag:{fontFamily:'DMSans_700Bold',fontSize:11,letterSpacing:1.8,color:colors.cream,backgroundColor:'rgba(18,24,21,.58)',paddingVertical:9,paddingHorizontal:12,borderRadius:999,overflow:'hidden'},pax:{flexDirection:'row',gap:6,alignItems:'center',backgroundColor:'rgba(18,24,21,.58)',paddingHorizontal:11,borderRadius:999},paxT:{color:colors.cream,fontFamily:'DMSans_700Bold'},bottom:{gap:12},title:{fontFamily:'Fraunces_700Bold',fontSize:31,lineHeight:33,color:colors.cream},meta:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},metaT:{fontFamily:'DMSans_500Medium',color:'#F5EDE3'},price:{fontFamily:'DMSans_700Bold',fontSize:18,color:colors.gold},foot:{padding:18,gap:14},blurb:{fontFamily:'DMSans_400Regular',fontSize:15,lineHeight:21,color:colors.ink},spots:{flexDirection:'row',gap:8,alignItems:'center'},statusDot:{width:8,height:8,borderRadius:4},spotsT:{fontFamily:'DMSans_700Bold',fontSize:12,color:colors.muted,textTransform:'uppercase',letterSpacing:1}});
