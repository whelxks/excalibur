import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { badgeCatalog } from '@/lib/mockData';
import { colors, tapeColors } from '@/lib/theme';
import { EmojiSticker } from '@/components/EmojiSticker';
import { useAppStore } from '@/store/useAppStore';

const tileRotate=['-4deg','3deg','-3deg','4deg','-5deg','2deg','-2deg','5deg','-4deg','3deg'];

export default function BadgeBook(){
 const router=useRouter(); const badges=useAppStore(s=>s.journalBadges);
 const collectedEmojis=new Set(badges.map(b=>b.emoji));
 const collectedCount=badgeCatalog.filter(c=>collectedEmojis.has(c.emoji)).length;

 return <SafeAreaView style={s.safe}>
  <ScrollView contentContainerStyle={s.page} showsVerticalScrollIndicator={false}>
   <View style={s.headRow}><Pressable onPress={()=>router.back()} style={s.back}><Ionicons name="arrow-back" size={20} color={colors.ink}/></Pressable></View>
   <Text style={s.eyebrow}>YOUR STICKER BOOK</Text>
   <Text style={s.title}>Every badge{`\n`}worth earning.</Text>
   <Text style={s.sub}>Collected on completed experiences. The rest are still out there, waiting.</Text>

   <View style={s.countPill}><Text style={s.countT}>{collectedCount}/{badgeCatalog.length} COLLECTED</Text></View>

   <View style={s.grid}>
    {badgeCatalog.map((c,i)=>{
     const got=collectedEmojis.has(c.emoji);
     return <View key={c.emoji} style={s.cell}>
      {got
       ? <EmojiSticker emoji={c.emoji} color={tapeColors[i%tapeColors.length]} size={74} rotate={tileRotate[i%tileRotate.length]}/>
       : <View style={[s.locked,{transform:[{rotate:tileRotate[i%tileRotate.length]}]}]}><Text style={s.lockedQ}>?</Text></View>}
      <Text style={[s.cellLabel,!got&&s.cellLabelLocked]}>{got?c.label:'???'}</Text>
     </View>
    })}
   </View>
  </ScrollView>
 </SafeAreaView>
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:colors.paper},page:{padding:20,paddingBottom:60},headRow:{marginBottom:10},back:{width:40,height:40,borderRadius:20,backgroundColor:colors.cream,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:colors.line},eyebrow:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:2,color:colors.terra,marginTop:10},title:{fontFamily:'Fraunces_700Bold',fontSize:34,lineHeight:36,color:colors.ink,marginTop:8},sub:{fontFamily:'DMSans_400Regular',fontSize:14,lineHeight:20,color:colors.muted,marginTop:10,maxWidth:320},
countPill:{alignSelf:'flex-start',backgroundColor:colors.forest,borderRadius:999,paddingHorizontal:18,paddingVertical:10,marginTop:20,transform:[{rotate:'-1deg'}],shadowColor:'#000',shadowOpacity:.15,shadowRadius:5,shadowOffset:{width:0,height:3}},countT:{fontFamily:'DMSans_700Bold',fontSize:12,letterSpacing:1.5,color:colors.cream},
grid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',marginTop:30},cell:{width:'31%',alignItems:'center',marginBottom:30},locked:{width:74,height:74,borderRadius:37,backgroundColor:'#EAE1D5',borderWidth:3,borderStyle:'dashed',borderColor:'#CBBFB1',alignItems:'center',justifyContent:'center'},lockedQ:{fontFamily:'Fraunces_700Bold',fontSize:26,color:'#B3A995'},cellLabel:{fontFamily:'DMSans_700Bold',fontSize:11,color:colors.ink,textAlign:'center',marginTop:10,lineHeight:14},cellLabelLocked:{color:'#B3A995'}});
