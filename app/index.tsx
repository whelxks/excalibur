import { useMemo, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Brand } from '@/components/Brand';
import { colors } from '@/lib/theme';
import { useAppStore } from '@/store/useAppStore';

const suggestions=[['Japan','Kyoto'],['Japan','Osaka'],['Mexico','Oaxaca'],['Australia','Sydney']];

export default function Landing(){
 const router=useRouter(); const setDestination=useAppStore(s=>s.setDestination);
 const [country,setCountry]=useState('Japan'); const [city,setCity]=useState('Kyoto');
 const filtered=useMemo(()=>suggestions.filter(([co,ci])=>!city||ci.toLowerCase().includes(city.toLowerCase())||co.toLowerCase().includes(country.toLowerCase())),[city,country]);
 const go=()=>{setDestination(country||'Japan',city||'Kyoto');router.push('/(tabs)/discover');};
 return <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':undefined}>
 <ScrollView contentContainerStyle={s.page} keyboardShouldPersistTaps="handled">
  <ImageBackground source={{uri:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=90'}} style={s.hero} imageStyle={s.heroImg}>
   <LinearGradient colors={['rgba(12,20,17,.05)','rgba(12,20,17,.78)']} style={StyleSheet.absoluteFillObject}/>
   <View style={s.heroTop}><Brand light/><Text style={s.kicker}>LOCAL, NOT LISTED</Text></View>
   <View><Text style={s.title}>Don’t visit.{"\n"}Belong for a moment.</Text><Text style={s.sub}>Tiny groups. Verified locals. Places that never make the tour websites.</Text></View>
  </ImageBackground>
  <View style={s.sheet}>
   <Text style={s.question}>Where do you want to go?</Text>
   <Text style={s.helper}>Start broad. We’ll find the city’s smaller stories.</Text>
   <View style={s.inputWrap}><Ionicons name="globe-outline" size={20} color={colors.muted}/><TextInput value={country} onChangeText={setCountry} placeholder="Country" placeholderTextColor="#9A9288" style={s.input}/></View>
   <View style={s.inputWrap}><Ionicons name="location-outline" size={20} color={colors.muted}/><TextInput value={city} onChangeText={setCity} placeholder="City" placeholderTextColor="#9A9288" style={s.input}/></View>
   <View style={s.chips}>{(filtered.length?filtered:suggestions).map(([co,ci])=><Pressable key={`${co}-${ci}`} onPress={()=>{setCountry(co);setCity(ci)}} style={s.chip}><Text style={s.chipT}>{ci}</Text></Pressable>)}</View>
   <Pressable onPress={go} style={s.cta}><Text style={s.ctaT}>ENTER THE CITY</Text><Ionicons name="arrow-forward" size={18} color={colors.cream}/></Pressable>
   <Pressable onPress={()=>router.push('/host-dashboard')} style={s.host}><Text style={s.hostT}>I’m a local — I want to host</Text></Pressable>
  </View>
 </ScrollView></KeyboardAvoidingView>
}
const s=StyleSheet.create({page:{backgroundColor:colors.paper,paddingBottom:36},hero:{height:480,padding:22,justifyContent:'space-between'},heroImg:{borderBottomLeftRadius:38,borderBottomRightRadius:38},heroTop:{gap:20},kicker:{fontFamily:'DMSans_700Bold',fontSize:10,letterSpacing:2.2,color:colors.cream,opacity:.86},title:{fontFamily:'Fraunces_700Bold',fontSize:49,lineHeight:50,color:colors.cream,letterSpacing:-1.4},sub:{fontFamily:'DMSans_400Regular',fontSize:16,lineHeight:23,color:'#F4EDE5',marginTop:15,maxWidth:340},sheet:{marginTop:-24,marginHorizontal:16,padding:22,borderRadius:30,backgroundColor:colors.cream,borderWidth:1,borderColor:'#E3DACF'},question:{fontFamily:'Fraunces_700Bold',fontSize:30,color:colors.ink},helper:{fontFamily:'DMSans_400Regular',fontSize:14,color:colors.muted,marginTop:5,marginBottom:20},inputWrap:{flexDirection:'row',alignItems:'center',gap:10,borderWidth:1,borderColor:colors.line,borderRadius:18,paddingHorizontal:15,marginBottom:10,backgroundColor:'#FFFCF7'},input:{flex:1,height:52,fontFamily:'DMSans_500Medium',fontSize:16,color:colors.ink},chips:{flexDirection:'row',flexWrap:'wrap',gap:8,marginVertical:6},chip:{backgroundColor:colors.paper2,borderRadius:999,paddingVertical:9,paddingHorizontal:13},chipT:{fontFamily:'DMSans_700Bold',fontSize:11,color:colors.forest},cta:{marginTop:16,backgroundColor:colors.forest,borderRadius:18,height:58,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:12},ctaT:{fontFamily:'DMSans_700Bold',fontSize:12,letterSpacing:1.7,color:colors.cream},host:{alignItems:'center',paddingTop:18},hostT:{fontFamily:'DMSans_500Medium',fontSize:13,color:colors.terra,textDecorationLine:'underline'}});
