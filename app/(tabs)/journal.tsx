import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { journalBadges } from '@/lib/mockData';
import { colors } from '@/lib/theme';
import { Brand } from '@/components/Brand';

export default function Journal(){
 return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.page} showsVerticalScrollIndicator={false}>
  <Brand/><View style={s.head}><Text style={s.eyebrow}>YOUR TRAVEL MEMORY</Text><Text style={s.title}>The places that{`\n`}changed the trip.</Text><Text style={s.sub}>Badges are earned only after a completed local experience. Add the part you never want to forget.</Text></View>
  <View style={s.passport}><Text style={s.passportLabel}>EVERY TOURIST · FIELD JOURNAL</Text><Text style={s.passportNum}>03</Text><Text style={s.passportSmall}>MEMORIES COLLECTED</Text></View>
  {journalBadges.map((b,i)=><View key={b.id} style={[s.entry,{transform:[{rotate:i%2===0?'-1.2deg':'1deg'}]}]}>
    <LinearGradient colors={[b.accent+'33','#FFF9EF']} style={s.gradient}/>
    <View style={s.stamp}><Text style={s.emoji}>{b.emoji}</Text></View>
    <View style={s.entryBody}><Text style={s.date}>{b.date} · {b.city.toUpperCase()}</Text><Text style={s.entryTitle}>{b.title}</Text><Text style={s.note}>“{b.note}”</Text></View>
   </View>)}
  <View style={s.prompt}><Text style={s.promptBig}>Your next badge is blank.</Text><Text style={s.promptSmall}>Go somewhere worth writing down.</Text></View>
 </ScrollView></SafeAreaView>
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:colors.paper},page:{padding:18,paddingBottom:50},head:{paddingTop:28,paddingBottom:22},eyebrow:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:2,color:colors.terra},title:{fontFamily:'Fraunces_700Bold',fontSize:42,lineHeight:43,color:colors.ink,marginTop:8},sub:{fontFamily:'DMSans_400Regular',fontSize:14,lineHeight:21,color:colors.muted,marginTop:12,maxWidth:340},passport:{backgroundColor:colors.forest,borderRadius:24,padding:20,marginBottom:24},passportLabel:{fontFamily:'DMSans_700Bold',fontSize:9,letterSpacing:2,color:colors.gold},passportNum:{fontFamily:'Fraunces_700Bold',fontSize:52,color:colors.cream,marginTop:8},passportSmall:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:1.7,color:'#CAD4CE'},entry:{minHeight:170,borderRadius:20,marginBottom:18,overflow:'hidden',flexDirection:'row',alignItems:'center',padding:18,borderWidth:1,borderColor:'#DED3C6',backgroundColor:colors.cream},gradient:{...StyleSheet.absoluteFillObject},stamp:{width:92,height:92,borderRadius:46,borderWidth:2,borderStyle:'dashed',borderColor:colors.ink,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(255,249,239,.65)'},emoji:{fontSize:43},entryBody:{flex:1,paddingLeft:16},date:{fontFamily:'DMSans_700Bold',fontSize:9,letterSpacing:1.5,color:colors.terra},entryTitle:{fontFamily:'Fraunces_700Bold',fontSize:24,lineHeight:25,color:colors.ink,marginTop:5},note:{fontFamily:'DMSans_400Regular',fontSize:13,lineHeight:18,color:colors.muted,marginTop:7},prompt:{alignItems:'center',paddingVertical:30},promptBig:{fontFamily:'Fraunces_700Bold',fontSize:23,color:colors.ink},promptSmall:{fontFamily:'DMSans_400Regular',fontSize:13,color:colors.muted,marginTop:5}});
