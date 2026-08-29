import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Host } from "@/lib/types";
import { colors, shadow } from "@/lib/theme";

const SCREEN_H = Dimensions.get("window").height;

export function HostCard({ host }: { host: Host }) {
  return (
    <View style={[s.card, shadow]}>
      <ImageBackground
        source={{ uri: host.image }}
        style={s.img}
        imageStyle={s.radius}
        resizeMode="cover"
      >
        <LinearGradient colors={["transparent", "rgba(9,14,12,.9)"]} />
        <View style={s.verify}>
          <Ionicons name="shield-checkmark" size={14} color={colors.forest} />
          <Text style={s.verifyText}>VERIFIED LOCAL</Text>
        </View>
        <View>
          <View style={s.nameRow}>
            <Text style={s.name}>
              {host.name}, {host.age}
            </Text>
            <Text style={s.rating}>★ {host.rating}</Text>
          </View>
          <Text style={s.tagline}>{host.tagline}</Text>
        </View>
      </ImageBackground>

      <ScrollView
        style={s.infoScroll}
        contentContainerStyle={s.info}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <Text style={s.bio}>{host.bio}</Text>

        {host.certifications.length > 0 && (
          <View style={s.certBlock}>
            <Text style={s.certLabel}>QUALIFICATIONS</Text>
            <View style={s.certList}>
              {host.certifications.map((c) => (
                <View key={c} style={s.certPill}>
                  <Ionicons
                    name="ribbon-outline"
                    size={12}
                    color={colors.terra}
                  />
                  <Text style={s.certT}>{c}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={s.badges}>
          {host.badges.map((b) => (
            <Text key={b} style={s.badge}>
              {b}
            </Text>
          ))}
        </View>
        <Text style={s.languages}>{host.languages.join(" · ")}</Text>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  card: {
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: colors.cream,
    maxHeight: SCREEN_H * 0.6,
  },
  img: { height: 250, padding: 20, justifyContent: "space-between"},
  radius: { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  verify: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    backgroundColor: colors.firefly,
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 999,
    marginTop: -110,
  },
  verifyText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 10,
    letterSpacing: 1.2,
    color: colors.forest,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  name: { fontFamily: "Fraunces_700Bold", fontSize: 38, color: colors.cream },
  rating: { fontFamily: "DMSans_700Bold", fontSize: 15, color: colors.gold },
  tagline: {
    fontFamily: "DMSans_500Medium",
    fontSize: 15,
    color: "#EEE5D9",
    marginTop: 5,
  },
  infoScroll: { flex: 1 },
  info: { padding: 20, gap: 16 },
  bio: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    lineHeight: 23,
    color: colors.ink,
  },
  certBlock: { gap: 8 },
  certLabel: {
    fontFamily: "DMSans_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.muted,
  },
  certList: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  certPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(232,112,58,0.1)",
    borderWidth: 1,
    borderColor: colors.terra,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  certT: {
    fontFamily: "DMSans_700Bold",
    fontSize: 10,
    color: colors.terra,
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
  languages: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: colors.muted,
  },
});
