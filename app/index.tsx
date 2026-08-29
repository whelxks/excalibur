import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HostLanding from "./host-landing";
import TouristLanding from "./tourist-landing";
import { useAppState } from "@/lib/app-state";
import { colors } from "@/lib/theme";
import HostDashboard from "./host-dashboard";
import { router } from "expo-router";

type Role = "tourist" | "host";

interface RoleGateProps {
  setRole: (role: Role) => void;
}

export default function Home() {
  const { role, ready, setRole } = useAppState();

  if (ready && !role) {
    return <RoleGate setRole={setRole} />;
  }

  return (
    <View style={{ flex: 1 }}>{role === "tourist" && <TouristLanding />}</View>
  );
}

export function RoleGate({ setRole }: RoleGateProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.kicker}>EVERY TOURIST</Text>

        <Text style={styles.heading}>
          How are you{"\n"}
          <Text style={styles.headingItalic}>joining us?</Text>
        </Text>

        <Text style={styles.subtitle}>
          Travellers find experiences you won't see in a guidebook. Hosts share
          the thing they already do every week.
        </Text>

        <View style={styles.cardsWrap}>
          <Pressable
            style={({ pressed }) => [
              styles.card,
              styles.cardLight,
              pressed && styles.cardPressed,
            ]}
            onPress={() => setRole("tourist")}
          >
            <Text style={styles.cardTitleLight}>I'm a Tourist</Text>
            <Text style={styles.cardBodyLight}>
              Choose a city, discover local activities, meet the person who'll
              show you.
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.card,
              styles.cardDark,
              pressed && styles.cardPressed,
            ]}
            onPress={() => {
              setRole("host");
              router.push("/host-dashboard");
            }}
          >
            <Text style={styles.cardTitleDark}>I'm a Host</Text>
            <Text style={styles.cardBodyDark}>
              List what you do, set your capacity, and choose who joins you.
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  kicker: {
    fontFamily: "DMSans_700Bold",
    fontSize: 10,
    letterSpacing: 2.2,
    color: colors.forest,
    marginBottom: 14,
  },
  heading: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 40,
    lineHeight: 44,
    color: colors.ink,
    letterSpacing: -1.2,
  },
  headingItalic: {
    fontFamily: "Fraunces_700Bold",
    fontStyle: "italic",
    color: colors.terra,
  },
  subtitle: {
    fontFamily: "DMSans_400Regular",
    marginTop: 16,
    fontSize: 16,
    lineHeight: 23,
    color: colors.muted,
    maxWidth: 420,
  },
  cardsWrap: {
    marginTop: 32,
    gap: 16,
  },
  card: {
    borderRadius: 24,
    padding: 24,
  },
  cardLight: {
    backgroundColor: colors.paper2,
    borderWidth: 1,
    borderColor: colors.line,
  },
  cardDark: {
    backgroundColor: colors.forest,
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardTitleLight: {
    fontFamily: "Fraunces_700Bold",
    marginTop: 8,
    fontSize: 22,
    color: colors.ink,
  },
  cardTitleDark: {
    fontFamily: "Fraunces_700Bold",
    marginTop: 8,
    fontSize: 22,
    color: colors.cream,
  },
  cardBodyLight: {
    fontFamily: "DMSans_400Regular",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
  },
  cardBodyDark: {
    fontFamily: "DMSans_400Regular",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(255,255,255,0.7)",
  },
});
