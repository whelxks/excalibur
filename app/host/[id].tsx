import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { findHost } from "@/lib/matches";
import { activities } from "@/lib/mockData";
import { colors, shadow } from "@/lib/theme";

export default function HostProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const host = findHost(id);
  const hosting = activities.filter((a) => a.hosts.some((h) => h.id === id));
  if (!host)
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.missing}>
          <Text style={s.missingT}>Host not found.</Text>
        </View>
      </SafeAreaView>
    );
  return (
    <View style={s.page}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={{ uri: host.image }}
          style={s.hero}
          imageStyle={s.heroImg}
        >
          <LinearGradient
            colors={["rgba(9,14,12,.45)", "transparent", "rgba(9,14,12,.9)"]}
            style={StyleSheet.absoluteFillObject}
          />
          <SafeAreaView edges={["top"]}>
            <Pressable onPress={() => router.back()} style={s.back} hitSlop={8}>
              <Ionicons name="arrow-back" size={21} color={colors.ink} />
            </Pressable>
          </SafeAreaView>
          <View>
            {host.verified && (
              <View style={s.verify}>
                <Ionicons
                  name="shield-checkmark"
                  size={13}
                  color={colors.forest}
                />
                <Text style={s.verifyT}>VERIFIED LOCAL</Text>
              </View>
            )}
            <View style={s.nameRow}>
              <Text style={s.name}>
                {host.name}, {host.age}
              </Text>
              <Text style={s.rating}>★ {host.rating}</Text>
            </View>
            <Text style={s.tagline}>{host.tagline}</Text>
          </View>
        </ImageBackground>
        <View style={s.body}>
          <Text style={s.bio}>{host.bio}</Text>
          <Text style={s.label}>SPEAKS</Text>
          <Text style={s.languages}>{host.languages.join(" · ")}</Text>
          <Text style={s.label}>TRUST</Text>
          <View style={s.badges}>
            {host.badges.map((b) => (
              <Text key={b} style={s.badge}>
                {b}
              </Text>
            ))}
          </View>
          {hosting.length > 0 && (
            <>
              <Text style={s.label}>HOSTS</Text>
              {hosting.map((a) => (
                <Pressable
                  key={a.id}
                  onPress={() => router.push(`/activity/${a.id}`)}
                  style={[s.activity, shadow]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={s.activityK}>{a.category}</Text>
                    <Text style={s.activityT} numberOfLines={2}>
                      {a.title}
                    </Text>
                    <Text style={s.activityMeta}>
                      {a.neighbourhood} · {a.duration} · ${a.price}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.muted}
                  />
                </Pressable>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.paper },
  safe: { flex: 1, backgroundColor: colors.paper },
  missing: { flex: 1, alignItems: "center", justifyContent: "center" },
  missingT: { fontFamily: "Fraunces_700Bold", fontSize: 22, color: colors.ink },
  hero: { height: 440, padding: 18, justifyContent: "space-between" },
  heroImg: { borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  verify: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    backgroundColor: colors.firefly,
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 999,
    marginBottom: 12,
  },
  verifyT: {
    fontFamily: "DMSans_700Bold",
    fontSize: 9,
    letterSpacing: 1.2,
    color: colors.forest,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  name: { fontFamily: "Fraunces_700Bold", fontSize: 36, color: colors.cream },
  rating: { fontFamily: "DMSans_700Bold", fontSize: 15, color: colors.gold },
  tagline: {
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    color: "#EEE5D9",
    marginTop: 5,
  },
  body: { padding: 20 },
  bio: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    lineHeight: 24,
    color: colors.ink,
  },
  label: {
    fontFamily: "DMSans_700Bold",
    fontSize: 9,
    letterSpacing: 2,
    color: colors.terra,
    marginTop: 26,
    marginBottom: 9,
  },
  languages: {
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    color: colors.muted,
  },
  badges: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  badge: {
    fontFamily: "DMSans_700Bold",
    fontSize: 9,
    letterSpacing: 1,
    color: colors.forest,
    borderWidth: 1,
    borderColor: "#A7B1A9",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  activity: {
    backgroundColor: colors.cream,
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  activityK: {
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    letterSpacing: 1.5,
    color: colors.terra,
  },
  activityT: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 17,
    lineHeight: 21,
    color: colors.ink,
    marginTop: 4,
  },
  activityMeta: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: colors.muted,
    marginTop: 5,
  },
});
