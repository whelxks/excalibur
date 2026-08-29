import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { loadResources } from '@/lib/firefly';
import type { FireflyResource } from '@/lib/types';
import { colors } from '@/lib/theme';

const icon:Record<string,any>={water:'water',power:'battery-charging',firstaid:'medkit',toilet:'accessibility',shelter:'home',connectivity:'wifi'};
const label:Record<string,string>={available:'AVAILABLE',limited:'LIMITED',unavailable:'UNAVAILABLE'};
export default function Firefly(){
 const router=useRouter(); const [resources,setResources]=useState<FireflyResource[]>([]);
 const refresh=useCallback(()=>{loadResources().then(setResources)},[]); useFocusEffect(refresh);
 return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.page} showsVerticalScrollIndicator={false}>
  <View style={s.brand}><View style={s.glow}/><Text style={s.brandT}>FIREFLY</Text><View style={s.offline}><View style={s.live}/><Text style={s.offlineT}>OFFLINE CACHE READY</Text></View></View>
  <Text style={s.title}>The city, even{`\n`}when the network dies.</Text><Text style={s.sub}>Nearby essentials cached on your phone. Exchange newer information with another phone by scanning a Firefly code.</Text>
  <Pressable onPress={()=>router.push('/firefly-sync')} style={s.sync}><View><Text style={s.syncSmall}>PEOPLE BECOME THE NETWORK</Text><Text style={s.syncBig}>Share / scan updates</Text></View><View style={s.syncIcon}><Ionicons name="qr-code" size={27} color={colors.fireflyBg}/></View></Pressable>
  <View style={s.line}><Text style={s.lineTitle}>NEARBY ESSENTIALS</Text><Text style={s.lineMeta}>{resources.length} CACHED</Text></View>
  {resources.map(r=>{const mins=Math.max(1,Math.round((Date.now()-r.updatedAt)/60000)); return <View key={r.id} style={s.resource}>
    <View style={s.resourceIcon}><Ionicons name={icon[r.type]} size={23} color={colors.firefly}/></View>
    <View style={{flex:1}}><Text style={s.resourceName}>{r.name}</Text><Text style={s.resourceMeta}>{r.distanceKm.toFixed(1)} km · updated {mins}m ago · {r.reports} reports</Text><View style={s.confTrack}><View style={[s.confFill,{width:`${Math.round(r.confidence*100)}%`}]}/></View></View>
    <View style={{alignItems:'flex-end'}}><Text style={[s.status,r.status==='unavailable'&&{color:'#FF746C'},r.status==='limited'&&{color:'#FFD36B'}]}>{label[r.status]}</Text><Text style={s.conf}>{Math.round(r.confidence*100)}%</Text></View>
   </View>})}
  <View style={s.explain}><Text style={s.explainTitle}>How Firefly decides what to trust</Text><Text style={s.explainBody}>Newer reports beat stale ones. Repeated independent confirmations raise confidence. The cache stays on-device and can move phone-to-phone through a compact QR payload.</Text></View>
 </ScrollView></SafeAreaView>
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:colors.fireflyBg},page:{padding:18,paddingBottom:50},brand:{flexDirection:'row',alignItems:'center',gap:9},glow:{width:12,height:12,borderRadius:6,backgroundColor:colors.firefly,shadowColor:colors.firefly,shadowOpacity:1,shadowRadius:12},brandT:{fontFamily:'DMSans_700Bold',fontSize:13,letterSpacing:2.5,color:colors.firefly},offline:{marginLeft:'auto',flexDirection:'row',alignItems:'center',gap:6,borderWidth:1,borderColor:'#2B342F',borderRadius:999,paddingHorizontal:9,paddingVertical:6},live:{width:6,height:6,borderRadius:3,backgroundColor:colors.firefly},offlineT:{fontFamily:'DMSans_700Bold',fontSize:8,letterSpacing:1,color:'#AEB8B2'},title:{fontFamily:'Fraunces_700Bold',fontSize:43,lineHeight:44,color:'#F5F2E9',marginTop:34},sub:{fontFamily:'DMSans_400Regular',fontSize:14,lineHeight:22,color:'#98A49D',marginTop:13,maxWidth:350},sync:{marginTop:24,backgroundColor:colors.firefly,borderRadius:22,padding:18,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},syncSmall:{fontFamily:'DMSans_700Bold',fontSize:8,letterSpacing:1.6,color:'#445047'},syncBig:{fontFamily:'Fraunces_700Bold',fontSize:23,color:colors.fireflyBg,marginTop:4},syncIcon:{width:48,height:48,borderRadius:16,backgroundColor:'#D8EE5E',alignItems:'center',justifyContent:'center'},line:{flexDirection:'row',justifyContent:'space-between',marginTop:30,marginBottom:10},lineTitle:{fontFamily:'DMSans_700Bold',fontSize:9,letterSpacing:1.8,color:'#E2E7E3'},lineMeta:{fontFamily:'DMSans_700Bold',fontSize:9,letterSpacing:1.2,color:'#66716B'},resource:{flexDirection:'row',gap:12,alignItems:'center',paddingVertical:16,borderBottomWidth:1,borderBottomColor:'#202823'},resourceIcon:{width:44,height:44,borderRadius:15,backgroundColor:'#18211C',alignItems:'center',justifyContent:'center'},resourceName:{fontFamily:'DMSans_700Bold',fontSize:14,color:'#EDF1EE'},resourceMeta:{fontFamily:'DMSans_400Regular',fontSize:10,color:'#75817A',marginTop:4},confTrack:{height:3,backgroundColor:'#27312B',borderRadius:3,marginTop:8,overflow:'hidden'},confFill:{height:3,backgroundColor:colors.firefly},status:{fontFamily:'DMSans_700Bold',fontSize:8,letterSpacing:1.2,color:colors.firefly},conf:{fontFamily:'Fraunces_700Bold',fontSize:20,color:'#E7EBE8',marginTop:4},explain:{marginTop:25,borderWidth:1,borderColor:'#27312B',borderRadius:18,padding:16},explainTitle:{fontFamily:'DMSans_700Bold',fontSize:12,color:colors.firefly},explainBody:{fontFamily:'DMSans_400Regular',fontSize:12,lineHeight:19,color:'#86928B',marginTop:7}});
