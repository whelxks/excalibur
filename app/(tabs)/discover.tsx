import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ActivityCard } from '@/components/ActivityCard';
import { Brand } from '@/components/Brand';
import { activities as all } from '@/lib/mockData';
import { colors } from '@/lib/theme';
import { useAppStore } from '@/store/useAppStore';

const filters=['All','Food','Art','Craft','Night'];
export default function Discover(){
 const router=useRouter(); const {country,city}=useAppStore(); const [filter,setFilter]=useState('All');
 const [items,setItems]=useState(all);
 useEffect(()=>{const byCity=all.filter(a=>a.city.toLowerCase()===city.toLowerCase());setItems(byCity.length?byCity:all)},[city]);
 const shown=useMemo(()=>filter==='All'?items:items.filter(a=>(a.category+a.title).toLowerCase().includes(filter.toLowerCase())),[items,filter]);
 return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.page} showsVerticalScrollIndicator={false}>
  <View style={s.head}><Brand/><Pressable onPress={()=>router.replace('/')} style={s.location}><Ionicons name="location" size={14} color={colors.terra}/><Text style={s.locationT}>{city}, {country}</Text><Ionicons name="chevron-down" size={14} color={colors.muted}/></Pressable></View>
  <View style={s.intro}><Text style={s.eyebrow}>SMALL GROUPS · 1–3 PEOPLE</Text><Text style={s.h1}>What’s hiding{`\n`}behind the obvious?</Text><Text style={s.deck}>Experiences listed by locals, not tour operators.</Text></View>
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filters}>{filters.map(f=><Pressable key={f} onPress={()=>setFilter(f)} style={[s.filter,filter===f&&s.filterOn]}><Text style={[s.filterT,filter===f&&s.filterTOn]}>{f}</Text></Pressable>)}</ScrollView>
  <View style={s.editorial}><Text style={s.editorialNum}>01</Text><View><Text style={s.editorialTitle}>LOCAL EDIT</Text><Text style={s.editorialSub}>Hand-picked for {city}</Text></View></View>
  {shown.map(a=><ActivityCard key={a.id} activity={a} onPress={()=>router.push(`/activity/${a.id}`)}/>)}
  {shown.length===0&&<View style={s.empty}><Text style={s.emptyTitle}>Nothing obvious here.</Text><Text style={s.emptyBody}>That’s kind of the point. Try another filter or city.</Text></View>}
 </ScrollView></SafeAreaView>
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:colors.paper},page:{paddingHorizontal:16,paddingBottom:40},head:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:14},location:{flexDirection:'row',alignItems:'center',gap:5,backgroundColor:colors.cream,borderRadius:999,paddingHorizontal:11,paddingVertical:8},locationT:{fontFamily:'DMSans_700Bold',fontSize:11,color:colors.ink},intro:{paddingTop:28,paddingBottom:20},eyebrow:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:2,color:colors.terra,marginBottom:8},h1:{fontFamily:'Fraunces_700Bold',fontSize:43,lineHeight:43,color:colors.ink,letterSpacing:-1.2},deck:{fontFamily:'DMSans_400Regular',fontSize:15,color:colors.muted,marginTop:12},filters:{gap:8,paddingVertical:12},filter:{paddingHorizontal:16,paddingVertical:10,borderRadius:999,borderWidth:1,borderColor:colors.line},filterOn:{backgroundColor:colors.ink,borderColor:colors.ink},filterT:{fontFamily:'DMSans_700Bold',fontSize:11,color:colors.muted},filterTOn:{color:colors.cream},editorial:{flexDirection:'row',gap:12,alignItems:'center',marginVertical:22},editorialNum:{fontFamily:'Fraunces_600SemiBold',fontSize:38,color:'#CBBFB1'},editorialTitle:{fontFamily:'DMSans_700Bold',fontSize:11,letterSpacing:2,color:colors.ink},editorialSub:{fontFamily:'DMSans_400Regular',fontSize:12,color:colors.muted,marginTop:2},empty:{padding:30,backgroundColor:colors.cream,borderRadius:24},emptyTitle:{fontFamily:'Fraunces_700Bold',fontSize:26,color:colors.ink},emptyBody:{fontFamily:'DMSans_400Regular',color:colors.muted,marginTop:8}});
