import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { colors } from '@/lib/theme';
import { connectStreamUser } from '@/lib/stream';
import { currentUser } from '@/lib/matches';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Fraunces_700Bold, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold });

  useEffect(() => { connectStreamUser(currentUser).catch(e => console.warn('[stream] connect failed:', e?.message)); }, []);

  if (!fontsLoaded) return <View style={{flex:1,backgroundColor:colors.paper,alignItems:'center',justifyContent:'center'}}><ActivityIndicator color={colors.forest}/></View>;

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.paper,
          },
        }}
      />
    </>
  );
}
