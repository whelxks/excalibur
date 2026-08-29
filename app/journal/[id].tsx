import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { activities } from '@/lib/mockData';
import { colors, tapeColors } from '@/lib/theme';
import { WashiTape } from '@/components/WashiTape';
import { EmojiSticker } from '@/components/EmojiSticker';
import { Polaroid } from '@/components/Polaroid';
import { useAppStore } from '@/store/useAppStore';

export default function JournalDetail(){
 const {id}=useLocalSearchParams<{id:string}>(); const router=useRouter();
 const badges=useAppStore(s=>s.journalBadges); const b=badges.find(x=>x.id===id)||badges[0];
 const activity=b.activityId?activities.find(a=>a.id===b.activityId):undefined; const host=activity?.hosts?.[0];
 const back=<Pressable onPress={()=>router.back()} style={s.back}><Ionicons name="arrow-back" size={22} color={colors.cream}/></Pressable>;
 return <View style={s.page}><ScrollView showsVerticalScrollIndicator={false}>
  <View style={s.heroWrap}>
   {activity
    ? <ImageBackground source={{uri:activity.image}} style={s.hero}><LinearGradient colors={['rgba(0,0,0,.15)','rgba(0,0,0,.78)']} style={StyleSheet.absoluteFillObject}/>
       {back}
       <View><Text style={s.cat}>{b.date} · {b.city.toUpperCase()}</Text><Text style={s.title}>{b.title}</Text></View>
      </ImageBackground>
    : <View style={[s.hero,s.heroPlain,{backgroundColor:b.accent}]}>{back}
       <Text style={s.plainEmoji}>{b.emoji}</Text>
       <View><Text style={s.cat}>{b.date} · {b.city.toUpperCase()}</Text><Text style={s.title}>{b.title}</Text></View>
      </View>}
   <WashiTape color={tapeColors[1]} style={{top:44,right:60,transform:[{rotate:'10deg'}]}}/>
   <EmojiSticker emoji={b.emoji} color={b.accent} size={62} rotate="-7deg" style={s.heroBadge}/>
  </View>
  <View style={s.body}>
   <View style={s.tag}><Text style={s.tagT}>THE MEMORY</Text></View>
   <View style={s.noteCard}>
    <WashiTape color={tapeColors[0]} style={{top:-10,left:28,transform:[{rotate:'-6deg'}]}}/>
    <Text style={s.story}>“{b.note}”</Text>
   </View>
   {activity && host
    ? <>
       <View style={[s.tag,{marginTop:30}]}><Text style={s.tagT}>THE HOST WHO SHOWED YOU</Text></View>
       <View style={s.hostRow}>
        <Polaroid uri={host.image} size={64} rotate="-4deg"/>
        <View style={{flex:1}}><Text style={s.hostName}>{host.name}</Text><Text style={s.hostTag}>{host.tagline}</Text></View>
       </View>
       <Pressable onPress={()=>router.push(`/activity/${activity.id}`)} style={s.cta}><Text style={s.ctaT}>REVISIT THIS EXPERIENCE</Text><Ionicons name="arrow-forward" size={17} color={colors.cream}/></Pressable>
      </>
    : <Text style={s.blurb}>A memory you added yourself — not tied to a booked experience.</Text>}
  </View>
 </ScrollView></View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:colors.paper},heroWrap:{},hero:{height:420,padding:18,paddingTop:54,justifyContent:'space-between'},heroPlain:{alignItems:'center',justifyContent:'space-between'},plainEmoji:{fontSize:96,marginTop:20},back:{width:44,height:44,borderRadius:22,backgroundColor:'rgba(9,14,12,.5)',alignItems:'center',justifyContent:'center'},cat:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:2,color:colors.gold,marginBottom:8},title:{fontFamily:'Fraunces_700Bold',fontSize:37,lineHeight:39,color:colors.cream},heroBadge:{position:'absolute',left:20,bottom:-28,shadowColor:'#000',shadowOpacity:.25,shadowRadius:6,shadowOffset:{width:0,height:3}},
body:{padding:20,paddingTop:44,paddingBottom:50},tag:{alignSelf:'flex-start',backgroundColor:colors.cream,borderRadius:999,paddingHorizontal:12,paddingVertical:7,borderWidth:1,borderStyle:'dashed',borderColor:colors.line},tagT:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:2,color:colors.terra},
noteCard:{backgroundColor:colors.cream,borderRadius:18,padding:22,marginTop:14,transform:[{rotate:'-1deg'}],shadowColor:'#000',shadowOpacity:.14,shadowRadius:8,shadowOffset:{width:0,height:4}},story:{fontFamily:'Fraunces_600SemiBold',fontSize:24,lineHeight:32,color:colors.ink,fontStyle:'italic'},
blurb:{fontFamily:'DMSans_400Regular',fontSize:15,lineHeight:22,color:colors.muted,marginTop:20},hostRow:{flexDirection:'row',alignItems:'center',gap:16,marginTop:16,paddingHorizontal:4},hostName:{fontFamily:'Fraunces_700Bold',fontSize:19,color:colors.ink},hostTag:{fontFamily:'DMSans_400Regular',fontSize:12,color:colors.muted,marginTop:2},cta:{marginTop:22,height:54,borderRadius:16,backgroundColor:colors.forest,flexDirection:'row',gap:10,alignItems:'center',justifyContent:'center',borderWidth:3,borderColor:colors.cream,transform:[{rotate:'-1deg'}],shadowColor:'#000',shadowOpacity:.2,shadowRadius:6,shadowOffset:{width:0,height:3}},ctaT:{fontFamily:'DMSans_700Bold',fontSize:11,letterSpacing:1.5,color:colors.cream}});
