import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/theme';

export default function TabsLayout(){
 return <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:colors.terra,tabBarInactiveTintColor:'#827B73',tabBarStyle:{height:76,paddingTop:8,paddingBottom:10,backgroundColor:'#FFF9EF',borderTopColor:'#E3DACF'},tabBarLabelStyle:{fontFamily:'DMSans_700Bold',fontSize:10}}}>
  <Tabs.Screen name="discover" options={{title:'Discover',tabBarIcon:({color,size})=><Ionicons name="compass-outline" color={color} size={size}/>}}/>
  <Tabs.Screen name="journal" options={{title:'Journal',tabBarIcon:({color,size})=><Ionicons name="book-outline" color={color} size={size}/>}}/>
  <Tabs.Screen name="firefly" options={{title:'Firefly',tabBarIcon:({color,size})=><Ionicons name="flashlight-outline" color={color} size={size}/>}}/>
  <Tabs.Screen name="profile" options={{title:'You',tabBarIcon:({color,size})=><Ionicons name="person-circle-outline" color={color} size={size}/>}}/>
 </Tabs>
}
