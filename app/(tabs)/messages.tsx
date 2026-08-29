import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { Channel } from 'stream-chat';
import { Brand } from '@/components/Brand';
import { latestMessage, messageTime, relativeTime } from '@/lib/chatFormat';
import { currentUser, findHost } from '@/lib/matches';
import { connectStreamUser, hasStream, streamClient } from '@/lib/stream';
import { colors } from '@/lib/theme';

export default function Messages(){
 const router=useRouter(); const [channels,setChannels]=useState<Channel[]>([]);
 const [loading,setLoading]=useState(true); const [error,setError]=useState<string|null>(null);

 const load=useCallback(async()=>{
  if(!hasStream||!streamClient){setError('Add EXPO_PUBLIC_STREAM_API_KEY to .env to enable chat.');setLoading(false);return}
  try{
   await connectStreamUser(currentUser);
   const list=await streamClient.queryChannels({type:'messaging',members:{$in:[currentUser.id]}},{last_message_at:-1},{watch:true,state:true,limit:30});
   setChannels(list); setError(null);
  }catch(e:any){setError(e?.message??'Could not load conversations.')}
  finally{setLoading(false)}
 },[]);

 useFocusEffect(useCallback(()=>{load()},[load]));

 // Refresh the list when a message lands in any channel.
 useEffect(()=>{if(!streamClient)return; const h=()=>load();
  streamClient.on('message.new',h); streamClient.on('notification.mark_read',h);
  return()=>{streamClient.off('message.new',h); streamClient.off('notification.mark_read',h)}},[load]);

 return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.page} showsVerticalScrollIndicator={false}>
  <Brand/>
  <View style={s.intro}><Text style={s.eyebrow}>MUTUAL MATCHES</Text><Text style={s.h1}>Your locals{`\n`}are waiting.</Text><Text style={s.deck}>A chat opens the moment you and a host both swipe right.</Text></View>

  {loading&&<ActivityIndicator color={colors.forest} style={{marginTop:30}}/>}
  {!loading&&error&&<View style={s.empty}><Text style={s.emptyBig}>Chat unavailable</Text><Text style={s.emptySub}>{error}</Text></View>}
  {!loading&&!error&&channels.length===0&&<View style={s.empty}><Text style={s.emptyBig}>No matches yet.</Text><Text style={s.emptySub}>Swipe on a host from an activity and your conversation will appear here.</Text></View>}

  {channels.map(ch=>{
   const data:any=ch.data??{}; const host=findHost(data.host_id);
   const last=latestMessage(ch.state.messages as any); const unread=ch.countUnread();
   const preview=last?`${last.user?.id===currentUser.id?'You: ':''}${last.text??''}`:'Say hello to your host';
   return <Pressable key={ch.id} onPress={()=>router.push(`/chat/${ch.id}`)} style={s.row}>
    {host?.image?<Image source={{uri:host.image}} style={s.avatar}/>:<View style={[s.avatar,s.avatarFallback]}/>}
    <View style={{flex:1}}>
     <View style={s.topLine}>
      <Text style={s.name} numberOfLines={1}>{host?.name??'Local host'}</Text>
      <Text style={[s.time,unread>0&&s.timeUnread]}>{relativeTime(last?messageTime(last as any):ch.state.last_message_at)}</Text>
     </View>
     <Text style={s.activity} numberOfLines={1}>{data.activity_name??'Experience'}</Text>
     <View style={s.bottomLine}>
      <Text style={[s.preview,unread>0&&s.previewUnread]} numberOfLines={1}>{preview}</Text>
      {unread>0&&<View style={s.dot}><Text style={s.dotT}>{unread>9?'9+':unread}</Text></View>}
     </View>
    </View>
    <Ionicons name="chevron-forward" size={17} color="#BDB4A9"/>
   </Pressable>
  })}
 </ScrollView></SafeAreaView>
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:colors.paper},page:{padding:18,paddingBottom:40},intro:{marginTop:26,marginBottom:22},eyebrow:{fontFamily:'DMSans_700Bold',fontSize:9,letterSpacing:2,color:colors.terra},h1:{fontFamily:'Fraunces_700Bold',fontSize:40,lineHeight:42,color:colors.ink,letterSpacing:-1,marginTop:8},deck:{fontFamily:'DMSans_400Regular',fontSize:14,lineHeight:21,color:colors.muted,marginTop:9},row:{flexDirection:'row',alignItems:'center',gap:13,backgroundColor:colors.cream,borderRadius:22,padding:13,marginBottom:11},avatar:{width:58,height:58,borderRadius:29,backgroundColor:colors.paper2},avatarFallback:{borderWidth:1,borderColor:colors.line},topLine:{flexDirection:'row',alignItems:'baseline',justifyContent:'space-between',gap:8},name:{flex:1,fontFamily:'Fraunces_700Bold',fontSize:20,color:colors.ink},time:{fontFamily:'DMSans_500Medium',fontSize:10,color:colors.muted},timeUnread:{color:colors.terra,fontFamily:'DMSans_700Bold'},activity:{fontFamily:'DMSans_500Medium',fontSize:11,color:colors.terra,marginTop:2},bottomLine:{flexDirection:'row',alignItems:'center',gap:8,marginTop:5},preview:{flex:1,fontFamily:'DMSans_400Regular',fontSize:12,color:colors.muted},previewUnread:{fontFamily:'DMSans_700Bold',color:colors.ink},dot:{minWidth:19,height:19,borderRadius:10,paddingHorizontal:5,backgroundColor:colors.terra,alignItems:'center',justifyContent:'center'},dotT:{fontFamily:'DMSans_700Bold',fontSize:9,color:colors.cream},empty:{backgroundColor:colors.cream,borderRadius:22,padding:26,alignItems:'center',marginTop:10},emptyBig:{fontFamily:'Fraunces_700Bold',fontSize:24,color:colors.ink},emptySub:{fontFamily:'DMSans_400Regular',fontSize:13,lineHeight:19,color:colors.muted,marginTop:7,textAlign:'center'}});
