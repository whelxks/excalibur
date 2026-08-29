import { useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HostCard } from '@/components/HostCard';
import { activities } from '@/lib/mockData';
import { buildMatch, ensureMatchChannel } from '@/lib/matches';
import { colors } from '@/lib/theme';

const W=Dimensions.get('window').width;
export default function SwipeHosts(){
 const {activityId}=useLocalSearchParams<{activityId:string}>(); const router=useRouter(); const a=activities.find(x=>x.id===activityId)||activities[0];
 const [index,setIndex]=useState(0); const pan=useRef(new Animated.ValueXY()).current;
 const host=a.hosts[index%a.hosts.length];
 const rotate=pan.x.interpolate({inputRange:[-W/2,0,W/2],outputRange:['-8deg','0deg','8deg']});
 const stampYes=pan.x.interpolate({inputRange:[0,W*.25],outputRange:[0,1],extrapolate:'clamp'}); const stampNo=pan.x.interpolate({inputRange:[-W*.25,0],outputRange:[1,0],extrapolate:'clamp'});
 // A right swipe is a match: create (or reopen) the Stream channel keyed by
 // the match ID, then drop straight into the conversation.
 const finish=(accepted:boolean)=>{Animated.timing(pan,{toValue:{x:accepted?W*1.3:-W*1.3,y:20},duration:220,useNativeDriver:true}).start(async()=>{pan.setValue({x:0,y:0});
  if(!accepted){setIndex(i=>i+1);return}
  const match=buildMatch(a,host);
  try{await ensureMatchChannel(match)}catch(e:any){console.warn('[stream] could not open match channel:',e?.message)}
  router.push(`/chat/${match.id}`);
 });};
 const responder=useMemo(()=>PanResponder.create({onMoveShouldSetPanResponder:(_,g)=>Math.abs(g.dx)>8,onPanResponderMove:Animated.event([null,{dx:pan.x,dy:pan.y}],{useNativeDriver:false}),onPanResponderRelease:(_,g)=>{if(g.dx>90)finish(true);else if(g.dx<-90)finish(false);else Animated.spring(pan,{toValue:{x:0,y:0},useNativeDriver:true}).start();}}),[host.id]);
 return <View style={s.page}>
  <View style={s.top}><Pressable onPress={()=>router.back()} style={s.round}><Ionicons name="arrow-back" size={20} color={colors.ink}/></Pressable><View style={{alignItems:'center'}}><Text style={s.kicker}>WHO FEELS RIGHT?</Text><Text style={s.activity} numberOfLines={1}>{a.title}</Text></View><View style={s.round}><Ionicons name="shield-checkmark" size={19} color={colors.forest}/></View></View>
  <View style={s.deck}>
   <Animated.View {...responder.panHandlers} style={{transform:[{translateX:pan.x},{translateY:pan.y},{rotate}]}}><HostCard host={host}/><Animated.View style={[s.stamp,s.yes,{opacity:stampYes}]}><Text style={s.yesT}>GO WITH {host.name.toUpperCase()}</Text></Animated.View><Animated.View style={[s.stamp,s.no,{opacity:stampNo}]}><Text style={s.noT}>NEXT LOCAL</Text></Animated.View></Animated.View>
  </View>
  <View style={s.actions}><Pressable onPress={()=>finish(false)} style={[s.action,s.pass]}><Ionicons name="close" size={30} color={colors.terra}/></Pressable><View><Text style={s.hint}>Swipe left to pass</Text><Text style={s.hint}>right to request</Text></View><Pressable onPress={()=>finish(true)} style={[s.action,s.accept]}><Ionicons name="heart" size={26} color={colors.cream}/></Pressable></View>
  <Text style={s.note}>The host sees your traveller profile too. Chat unlocks after the host accepts and the group is confirmed.</Text>
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:colors.paper,paddingHorizontal:14,paddingTop:54,paddingBottom:24},top:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:14},round:{width:42,height:42,borderRadius:21,backgroundColor:colors.cream,alignItems:'center',justifyContent:'center'},kicker:{fontFamily:'DMSans_700Bold',fontSize:9,letterSpacing:1.8,color:colors.terra},activity:{fontFamily:'DMSans_500Medium',fontSize:11,color:colors.muted,maxWidth:220,marginTop:3},deck:{flex:1,justifyContent:'center'},stamp:{position:'absolute',top:55,paddingHorizontal:14,paddingVertical:10,borderWidth:3,borderRadius:10,transform:[{rotate:'-8deg'}]},yes:{left:24,borderColor:colors.firefly,backgroundColor:'rgba(24,60,52,.86)'},no:{right:22,borderColor:colors.terra,backgroundColor:'rgba(255,249,239,.9)'},yesT:{fontFamily:'DMSans_700Bold',fontSize:14,letterSpacing:1.5,color:colors.firefly},noT:{fontFamily:'DMSans_700Bold',fontSize:14,letterSpacing:1.5,color:colors.terra},actions:{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:26,marginTop:10},action:{width:62,height:62,borderRadius:31,alignItems:'center',justifyContent:'center'},pass:{backgroundColor:colors.cream,borderWidth:1,borderColor:colors.line},accept:{backgroundColor:colors.forest},hint:{fontFamily:'DMSans_500Medium',fontSize:10,color:colors.muted,textAlign:'center'},note:{fontFamily:'DMSans_400Regular',fontSize:10,lineHeight:15,color:colors.muted,textAlign:'center',paddingHorizontal:25,marginTop:12}});
