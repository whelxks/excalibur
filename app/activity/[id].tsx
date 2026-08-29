import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { activities } from '@/lib/mockData';
import { colors } from '@/lib/theme';

export default function ActivityDetail(){
 const {id}=useLocalSearchParams<{id:string}>(); const router=useRouter(); const a=activities.find(x=>x.id===id)||activities[0]; const left=a.maxPax-a.joined;
 return <View style={s.page}><ScrollView showsVerticalScrollIndicator={false}>
  <ImageBackground source={{uri:a.image}} style={s.hero}><LinearGradient colors={['rgba(0,0,0,.15)','rgba(0,0,0,.78)']} style={StyleSheet.absoluteFillObject}/>
   <Pressable onPress={()=>router.back()} style={s.back}><Ionicons name="arrow-back" size={22} color={colors.cream}/></Pressable>
   <View><Text style={s.cat}>{a.category}</Text><Text style={s.title}>{a.title}</Text><Text style={s.place}>{a.neighbourhood}, {a.city}</Text></View>
  </ImageBackground>
  <View style={s.body}>
   <View style={s.factRow}><View><Text style={s.factBig}>{a.duration}</Text><Text style={s.factSmall}>TIME TOGETHER</Text></View><View><Text style={s.factBig}>{a.joined}/{a.maxPax}</Text><Text style={s.factSmall}>JOINED</Text></View><View><Text style={s.factBig}>${a.price}</Text><Text style={s.factSmall}>PER PERSON</Text></View></View>
   <Text style={s.sectionLabel}>THE STORY</Text><Text style={s.story}>{a.story}</Text>
   <View style={s.rule}/>
   <Text style={s.sectionLabel}>WHY IT’S HERE</Text><Text style={s.blurb}>This experience is hosted in a real local setting with a maximum of {a.maxPax} tourists. Hosts are shown only after you choose the experience, so you pick the experience first — then the person you trust to take you into it.</Text>
   <View style={s.safety}><Ionicons name="shield-checkmark" size={22} color={colors.forest}/><View style={{flex:1}}><Text style={s.safetyTitle}>Verified-host experience</Text><Text style={s.safetyText}>Identity and relevant host credentials are reviewed before a host can go live.</Text></View></View>
  </View>
 </ScrollView>
 <View style={s.sticky}><View><Text style={s.left}>{left>0?`${left} ${left===1?'spot':'spots'} left`:'Waitlist only'}</Text><Text style={s.micro}>Choose who you go with next</Text></View><Pressable onPress={()=>router.push(`/swipe/${a.id}`)} style={s.cta}><Text style={s.ctaT}>SWIPE HOSTS</Text><Ionicons name="arrow-forward" size={17} color={colors.cream}/></Pressable></View>
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:colors.paper},hero:{height:500,padding:18,paddingTop:54,justifyContent:'space-between'},back:{width:44,height:44,borderRadius:22,backgroundColor:'rgba(9,14,12,.5)',alignItems:'center',justifyContent:'center'},cat:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:2,color:colors.gold,marginBottom:8},title:{fontFamily:'Fraunces_700Bold',fontSize:41,lineHeight:42,color:colors.cream},place:{fontFamily:'DMSans_500Medium',fontSize:14,color:'#EFE6DA',marginTop:12},body:{padding:20,paddingBottom:130},factRow:{flexDirection:'row',justifyContent:'space-between',backgroundColor:colors.cream,borderRadius:22,padding:18,marginTop:-8},factBig:{fontFamily:'Fraunces_700Bold',fontSize:21,color:colors.ink},factSmall:{fontFamily:'DMSans_700Bold',fontSize:8,letterSpacing:1.4,color:colors.muted,marginTop:3},sectionLabel:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:2,color:colors.terra,marginTop:28,marginBottom:10},story:{fontFamily:'Fraunces_600SemiBold',fontSize:25,lineHeight:33,color:colors.ink},rule:{height:1,backgroundColor:colors.line,marginVertical:28},blurb:{fontFamily:'DMSans_400Regular',fontSize:16,lineHeight:24,color:colors.muted},safety:{marginTop:24,flexDirection:'row',gap:12,backgroundColor:'#E3E8DF',padding:16,borderRadius:20},safetyTitle:{fontFamily:'DMSans_700Bold',fontSize:13,color:colors.forest},safetyText:{fontFamily:'DMSans_400Regular',fontSize:12,lineHeight:18,color:colors.muted,marginTop:3},sticky:{position:'absolute',left:0,right:0,bottom:0,padding:14,paddingBottom:25,backgroundColor:'#FFF9EF',borderTopWidth:1,borderTopColor:colors.line,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},left:{fontFamily:'DMSans_700Bold',fontSize:13,color:colors.ink},micro:{fontFamily:'DMSans_400Regular',fontSize:10,color:colors.muted,marginTop:2},cta:{height:50,borderRadius:16,backgroundColor:colors.forest,paddingHorizontal:18,flexDirection:'row',gap:8,alignItems:'center'},ctaT:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:1.5,color:colors.cream}});
