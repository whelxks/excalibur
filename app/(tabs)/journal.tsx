import { ImageBackground, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { activities, badgeCatalog } from '@/lib/mockData';
import { colors, tapeColors } from '@/lib/theme';
import { Brand } from '@/components/Brand';
import { WashiTape } from '@/components/WashiTape';
import { EmojiSticker } from '@/components/EmojiSticker';
import { useAppStore } from '@/store/useAppStore';
import type { JournalBadge } from '@/lib/types';

export default function Journal(){
 const router=useRouter(); const badges=useAppStore(s=>s.journalBadges);
 const cities=new Set(badges.map(b=>b.city.toLowerCase())).size;
 const hostsMet=badges.filter(b=>b.activityId).length;
 const shareBadge=async (b:JournalBadge)=>{ try{ await Share.share({message:`${b.title} — ${b.city}\n“${b.note}”\n\nvia Every Tourist`}); }catch{} };
 const [featured,...rest]=badges;
 const featuredActivity=featured?.activityId?activities.find(a=>a.id===featured.activityId):undefined;
 const collectedEmojis=new Set(badges.map(b=>b.emoji));
 const collectedCount=badgeCatalog.filter(c=>collectedEmojis.has(c.emoji)).length;
 const previewBadges=badgeCatalog.slice(0,4);

 return <SafeAreaView style={s.safe}>
  <ScrollView contentContainerStyle={s.page} showsVerticalScrollIndicator={false}>
  <Brand/><View style={s.head}><Text style={s.eyebrow}>YOUR TRAVEL MEMORY</Text><Text style={s.title}>The places that{`\n`}changed the trip.</Text><Text style={s.sub}>Badges are earned only after a completed local experience — your host stamps it into your journal once you're done.</Text></View>

  <View style={s.tripLog}>
   <View style={[s.pin,{left:22}]}/><View style={[s.pin,{right:22}]}/>
   <Text style={s.passportLabel}>EVERY TOURIST · FIELD JOURNAL</Text>
   <Text style={s.passportNum}>{String(badges.length).padStart(2,'0')}</Text>
   <Text style={s.passportSmall}>MEMORIES COLLECTED</Text>
   {badges.length>0&&<View style={s.passportStats}>
    <View><Text style={s.statNum}>{cities}</Text><Text style={s.statLabel}>CITIES</Text></View>
    <View><Text style={s.statNum}>{hostsMet}</Text><Text style={s.statLabel}>HOSTS MET</Text></View>
   </View>}
  </View>

  <Pressable onPress={()=>router.push('/journal/badges')} style={s.summary}>
   <View style={s.summaryPreview}>
    {previewBadges.map((c,i)=>collectedEmojis.has(c.emoji)
     ? <EmojiSticker key={c.emoji} emoji={c.emoji} color={tapeColors[i%tapeColors.length]} size={38} rotate={i%2===0?'-6deg':'5deg'} style={[s.previewStamp,{marginLeft:i?-13:0,zIndex:previewBadges.length-i}]}/>
     : <View key={c.emoji} style={[s.previewLocked,{marginLeft:i?-13:0,zIndex:previewBadges.length-i}]}><Text style={s.previewLockedQ}>?</Text></View>)}
   </View>
   <View style={{flex:1}}>
    <Text style={s.summaryCount}>{collectedCount}/{badgeCatalog.length} COLLECTED</Text>
    <Text style={s.summaryCta}>See your sticker book →</Text>
   </View>
   <Ionicons name="chevron-forward" size={20} color={colors.muted}/>
  </Pressable>

  {badges.length===0
   ? <View style={s.emptyHero}>
      <Text style={s.emptyEmoji}>🗺️</Text>
      <Text style={s.emptyTitle}>Your journal is empty.</Text>
      <Text style={s.emptyBody}>Every completed local experience earns a stamp. Go somewhere worth writing down — your host takes care of the rest.</Text>
     </View>
   : <>
      <Pressable onPress={()=>router.push(`/journal/${featured.id}`)} style={s.featured}>
       <WashiTape color={tapeColors[0]} style={{top:-10,left:34,transform:[{rotate:'-4deg'}]}}/>
       <WashiTape color={tapeColors[2]} style={{top:-10,right:34,transform:[{rotate:'5deg'}]}}/>
       <View style={s.featuredPhoto}>
        {featuredActivity
         ? <ImageBackground source={{uri:featuredActivity.image}} style={s.featuredImg}>
            <LinearGradient colors={['rgba(10,15,13,.05)','rgba(10,15,13,.55)']} style={StyleSheet.absoluteFillObject}/>
            <View style={s.featuredTop}><View style={s.tag}><Text style={s.tagT}>LATEST STAMP</Text></View><Pressable onPress={(e)=>{e.stopPropagation?.();shareBadge(featured);}} style={s.shareBtn}><Ionicons name="share-outline" size={16} color={colors.ink}/></Pressable></View>
           </ImageBackground>
         : <View style={[s.featuredImg,{backgroundColor:featured.accent,alignItems:'center',justifyContent:'space-between'}]}>
            <View style={s.featuredTop}><View style={s.tag}><Text style={s.tagT}>LATEST STAMP</Text></View><Pressable onPress={(e)=>{e.stopPropagation?.();shareBadge(featured);}} style={s.shareBtn}><Ionicons name="share-outline" size={16} color={colors.ink}/></Pressable></View>
            <Text style={s.featuredPlainEmoji}>{featured.emoji}</Text><View/>
           </View>}
       </View>
       <EmojiSticker emoji={featured.emoji} color={featured.accent} size={58} rotate="-5deg" style={s.featuredBadge}/>
       <View style={s.featuredFoot}>
        <View style={s.featuredHead}><Text style={s.featuredDate}>{featured.date} · {featured.city.toUpperCase()}</Text><Text style={s.featuredTitle}>{featured.title}</Text></View>
        <View style={s.featuredNoteRow}><Text style={s.featuredNote}>“{featured.note}”</Text><Ionicons name="chevron-forward" size={18} color={colors.muted}/></View>
       </View>
      </Pressable>

      {rest.map((b,i)=>{
       return <Pressable key={b.id} onPress={()=>router.push(`/journal/${b.id}`)} style={[s.entry,{transform:[{rotate:i%2===0?'1deg':'-1.2deg'}]}]}>
         <WashiTape color={tapeColors[(i+1)%tapeColors.length]} style={{top:-10,left:26,transform:[{rotate:i%2===0?'-4deg':'3deg'}]}}/>
         <Pressable onPress={(e)=>{e.stopPropagation?.();shareBadge(b);}} style={s.entryShare}><Ionicons name="share-outline" size={15} color={colors.muted}/></Pressable>
         <View style={s.entryBody}>
          <Text style={s.date}>{b.date} · {b.city.toUpperCase()}</Text>
          <Text style={s.entryTitle}>{b.title}</Text>
          <View style={s.entryRule}/>
          <Text style={s.note}>“{b.note}”</Text>
         </View>
         <EmojiSticker emoji={b.emoji} color={b.accent} size={70} rotate={i%2===0?'-4deg':'3deg'} style={s.entryBadge}/>
        </Pressable>
      })}

      <View style={s.prompt}><Text style={s.promptBig}>Your next badge is blank.</Text><Text style={s.promptSmall}>Go somewhere worth writing down.</Text></View>
     </>}
 </ScrollView>
 </SafeAreaView>
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:colors.paper},page:{padding:18,paddingBottom:50},head:{paddingTop:28,paddingBottom:22},eyebrow:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:2,color:colors.terra},title:{fontFamily:'Fraunces_700Bold',fontSize:42,lineHeight:43,color:colors.ink,marginTop:8},sub:{fontFamily:'DMSans_400Regular',fontSize:14,lineHeight:21,color:colors.muted,marginTop:12,maxWidth:340},
tripLog:{backgroundColor:colors.forest,borderTopLeftRadius:10,borderTopRightRadius:28,borderBottomRightRadius:10,borderBottomLeftRadius:28,padding:20,marginBottom:26,transform:[{rotate:'-0.6deg'}],shadowColor:'#000',shadowOpacity:.18,shadowRadius:10,shadowOffset:{width:0,height:5}},pin:{position:'absolute',top:-6,width:12,height:12,borderRadius:6,backgroundColor:colors.gold,borderWidth:2,borderColor:colors.cream,shadowColor:'#000',shadowOpacity:.3,shadowRadius:2,shadowOffset:{width:0,height:1}},passportLabel:{fontFamily:'DMSans_700Bold',fontSize:9,letterSpacing:2,color:colors.gold},passportNum:{fontFamily:'Fraunces_700Bold',fontSize:52,color:colors.cream,marginTop:8},passportSmall:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:1.7,color:'#CAD4CE'},passportStats:{flexDirection:'row',gap:28,marginTop:18,paddingTop:16,borderTopWidth:1,borderStyle:'dashed',borderTopColor:'rgba(255,255,255,.25)'},statNum:{fontFamily:'Fraunces_700Bold',fontSize:22,color:colors.cream},statLabel:{fontFamily:'DMSans_700Bold',fontSize:9,letterSpacing:1.4,color:'#CAD4CE',marginTop:3},
summary:{flexDirection:'row',alignItems:'center',gap:14,backgroundColor:colors.cream,borderRadius:20,padding:16,marginBottom:26,borderWidth:1,borderColor:'#E7DFD2',shadowColor:'#000',shadowOpacity:.1,shadowRadius:6,shadowOffset:{width:0,height:3}},summaryPreview:{flexDirection:'row',alignItems:'center',marginRight:6},previewStamp:{shadowColor:'#000',shadowOpacity:.18,shadowRadius:4,shadowOffset:{width:0,height:2}},previewLocked:{width:38,height:38,borderRadius:19,backgroundColor:'#EAE1D5',borderWidth:2,borderColor:colors.cream,alignItems:'center',justifyContent:'center'},previewLockedQ:{fontFamily:'Fraunces_700Bold',fontSize:15,color:'#B3A995'},summaryCount:{fontFamily:'DMSans_700Bold',fontSize:11,letterSpacing:1.3,color:colors.terra},summaryCta:{fontFamily:'Fraunces_600SemiBold',fontSize:17,color:colors.ink,marginTop:3},
emptyHero:{alignItems:'center',paddingVertical:50,paddingHorizontal:10},emptyEmoji:{fontSize:52,marginBottom:14},emptyTitle:{fontFamily:'Fraunces_700Bold',fontSize:26,color:colors.ink,textAlign:'center'},emptyBody:{fontFamily:'DMSans_400Regular',fontSize:14,lineHeight:21,color:colors.muted,marginTop:10,textAlign:'center',maxWidth:300},
featured:{backgroundColor:colors.cream,borderRadius:10,paddingBottom:16,marginBottom:34,marginTop:14,transform:[{rotate:'-1deg'}],shadowColor:'#000',shadowOpacity:.22,shadowRadius:10,shadowOffset:{width:0,height:6}},featuredPhoto:{margin:10,marginBottom:0,height:210,borderRadius:4,overflow:'hidden'},featuredImg:{flex:1,padding:14},featuredTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'},tag:{backgroundColor:'rgba(23,33,30,.55)',borderRadius:999,paddingHorizontal:11,paddingVertical:6},tagT:{fontFamily:'DMSans_700Bold',fontSize:9,letterSpacing:2,color:colors.gold},shareBtn:{width:32,height:32,borderRadius:16,backgroundColor:'rgba(255,249,239,.9)',alignItems:'center',justifyContent:'center'},featuredPlainEmoji:{fontSize:76},featuredBadge:{position:'absolute',left:22,top:178,shadowColor:'#000',shadowOpacity:.25,shadowRadius:5,shadowOffset:{width:0,height:3}},featuredFoot:{paddingHorizontal:20,paddingTop:16},featuredHead:{paddingLeft:64},featuredDate:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:1.5,color:colors.terra},featuredTitle:{fontFamily:'Fraunces_700Bold',fontSize:27,lineHeight:29,color:colors.ink,marginTop:6},featuredNoteRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:12,marginTop:10},featuredNote:{flex:1,fontFamily:'DMSans_400Regular',fontStyle:'italic',fontSize:14,lineHeight:20,color:colors.muted},
entry:{minHeight:126,borderTopLeftRadius:22,borderTopRightRadius:8,borderBottomRightRadius:24,borderBottomLeftRadius:10,marginBottom:24,marginTop:8,flexDirection:'row',alignItems:'center',padding:18,backgroundColor:colors.cream,borderWidth:1,borderColor:'#E7DFD2',shadowColor:'#000',shadowOpacity:.1,shadowRadius:6,shadowOffset:{width:0,height:3}},entryShare:{position:'absolute',top:12,right:12,width:30,height:30,borderRadius:15,backgroundColor:'rgba(23,33,30,.06)',alignItems:'center',justifyContent:'center',zIndex:2},entryBody:{flex:1,paddingRight:14},date:{fontFamily:'DMSans_700Bold',fontSize:9,letterSpacing:1.5,color:colors.terra},entryTitle:{fontFamily:'Fraunces_700Bold',fontSize:22,lineHeight:24,color:colors.ink,marginTop:6,transform:[{rotate:'-1deg'}]},entryRule:{width:44,height:2,borderRadius:1,backgroundColor:colors.terra,opacity:.35,marginTop:9,marginBottom:8},note:{fontFamily:'DMSans_400Regular',fontStyle:'italic',fontSize:13,lineHeight:18,color:colors.muted},entryBadge:{marginLeft:8},
prompt:{alignItems:'center',paddingVertical:26,paddingHorizontal:16,marginTop:6,borderRadius:18,borderWidth:2,borderStyle:'dashed',borderColor:colors.line,transform:[{rotate:'-0.6deg'}]},promptBig:{fontFamily:'Fraunces_700Bold',fontSize:22,color:colors.ink},promptSmall:{fontFamily:'DMSans_400Regular',fontSize:13,color:colors.muted,marginTop:5}});
