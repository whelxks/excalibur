import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/lib/theme";

const initial = [
  {
    id: "r1",
    name: "Alex",
    age: 24,
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80",
    bio: "Architecture nerd, quiet traveller, very into food.",
    tags: ["ID VERIFIED", "ENGLISH", "ART"],
  },
  {
    id: "r2",
    name: "Maya",
    age: 27,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80",
    bio: "Solo traveller. Loves printmaking, jazz and morning markets.",
    tags: ["ID VERIFIED", "FOOD", "MUSIC"],
  },
];
export default function HostDashboard() {
  const router = useRouter();
  const [requests, setRequests] = useState(initial);
  const [accepted, setAccepted] = useState<string[]>([]);
  function act(id: string, yes: boolean) {
    setRequests((r) => r.filter((x) => x.id !== id));
    if (yes) setAccepted((a) => [...a, id]);
  }
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.page}>
        <View style={s.top}>
          <Pressable onPress={() => router.back()} style={s.back}>
            <Ionicons name="arrow-back" size={20} color={colors.cream} />
          </Pressable>
          <Text style={s.mode}>HOST MODE</Text>
          <View style={{ width: 42 }} />
        </View>
        <Text style={s.hello}>Good evening,{`\n`}Ren.</Text>
        <Text style={s.sub}>Your group stays tiny on purpose.</Text>
        <View style={s.live}>
          <View style={s.liveTop}>
            <View>
              <Text style={s.liveK}>LIVE EXPERIENCE</Text>
              <Text style={s.liveTitle}>Ink after dusk</Text>
            </View>
            <View style={s.pax}>
              <Text style={s.paxBig}>{1 + accepted.length}/2</Text>
              <Text style={s.paxSmall}>JOINED</Text>
            </View>
          </View>
          <View style={s.progress}>
            <View
              style={[
                s.progressOn,
                {
                  width: `${Math.min(100, ((1 + accepted.length) / 2) * 100)}%`,
                },
              ]}
            />
          </View>
          <Text style={s.liveMeta}>Tomorrow · 7:30 PM · Shimogyo</Text>
        </View>
        <View style={s.section}>
          <Text style={s.sectionT}>REQUESTS TO REVIEW</Text>
          <Text style={s.sectionN}>{requests.length}</Text>
        </View>
        {requests.map((r) => (
          <View key={r.id} style={s.request}>
            <Image source={{ uri: r.image }} style={s.photo} />
            <View style={{ flex: 1 }}>
              <Text style={s.name}>
                {r.name}, {r.age}
              </Text>
              <Text style={s.bio}>{r.bio}</Text>
              <View style={s.tags}>
                {r.tags.map((t) => (
                  <Text key={t} style={s.tag}>
                    {t}
                  </Text>
                ))}
              </View>
              <View style={s.actions}>
                <Pressable
                  onPress={() => act(r.id, false)}
                  style={[s.btn, s.reject]}
                >
                  <Ionicons name="close" size={18} color={colors.terra} />
                  <Text style={s.rejectT}>PASS</Text>
                </Pressable>
                <Pressable
                  onPress={() => act(r.id, true)}
                  style={[s.btn, s.accept]}
                >
                  <Ionicons name="checkmark" size={18} color={colors.cream} />
                  <Text style={s.acceptT}>ACCEPT</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
        {requests.length === 0 && (
          <View style={s.empty}>
            <Text style={s.emptyBig}>All reviewed.</Text>
            <Text style={s.emptySub}>
              {1 + accepted.length >= 2
                ? "Your group is full — chat can now open."
                : "Waiting for another traveller request."}
            </Text>
            {1 + accepted.length >= 2 && (
              <Pressable
                onPress={() => router.push("/chat/kyoto-ink__h1__alex")}
                style={s.openChat}
              >
                <Text style={s.openChatT}>OPEN GROUP CHAT</Text>
              </Pressable>
            )}
          </View>
        )}
        <Pressable style={s.create}>
          <Ionicons name="add-circle" size={24} color={colors.gold} />
          <View>
            <Text style={s.createK}>LIST SOMETHING SMALL</Text>
            <Text style={s.createT}>Create another local activity</Text>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.forest },
  page: { padding: 18, paddingBottom: 50 },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  back: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#456057",
    alignItems: "center",
    justifyContent: "center",
  },
  mode: {
    fontFamily: "DMSans_700Bold",
    fontSize: 10,
    letterSpacing: 2,
    color: colors.gold,
  },
  hello: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 43,
    lineHeight: 44,
    color: colors.cream,
    marginTop: 30,
  },
  sub: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    color: "#B9C5BF",
    marginTop: 7,
  },
  live: {
    backgroundColor: "#244A41",
    borderRadius: 23,
    padding: 18,
    marginTop: 25,
  },
  liveTop: { flexDirection: "row", justifyContent: "space-between" },
  liveK: {
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    letterSpacing: 1.5,
    color: colors.gold,
  },
  liveTitle: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 27,
    color: colors.cream,
    marginTop: 4,
  },
  pax: { alignItems: "center" },
  paxBig: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 30,
    color: colors.firefly,
  },
  paxSmall: {
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    letterSpacing: 1,
    color: "#9EB2AA",
  },
  progress: {
    height: 5,
    borderRadius: 5,
    backgroundColor: "#3A5C54",
    overflow: "hidden",
    marginTop: 18,
  },
  progressOn: { height: 5, backgroundColor: colors.firefly },
  liveMeta: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: "#B8C8C1",
    marginTop: 11,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 10,
  },
  sectionT: {
    fontFamily: "DMSans_700Bold",
    fontSize: 9,
    letterSpacing: 1.8,
    color: "#DCE4E0",
  },
  sectionN: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 22,
    color: colors.gold,
  },
  request: {
    backgroundColor: colors.cream,
    borderRadius: 22,
    padding: 13,
    marginBottom: 14,
    flexDirection: "row",
    gap: 12,
  },
  photo: { width: 88, height: 118, borderRadius: 16 },
  name: { fontFamily: "Fraunces_700Bold", fontSize: 23, color: colors.ink },
  bio: {
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    lineHeight: 16,
    color: colors.muted,
    marginTop: 3,
  },
  tags: { flexDirection: "row", gap: 5, flexWrap: "wrap", marginTop: 8 },
  tag: {
    fontFamily: "DMSans_700Bold",
    fontSize: 7,
    letterSpacing: 0.7,
    color: colors.forest,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  actions: { flexDirection: "row", gap: 7, marginTop: 10 },
  btn: {
    flex: 1,
    height: 35,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  reject: { borderWidth: 1, borderColor: "#E2BEB2" },
  accept: { backgroundColor: colors.forest },
  rejectT: {
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    letterSpacing: 1,
    color: colors.terra,
  },
  acceptT: {
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    letterSpacing: 1,
    color: colors.cream,
  },
  empty: {
    backgroundColor: "#244A41",
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
  },
  emptyBig: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 27,
    color: colors.cream,
  },
  emptySub: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: "#B8C8C1",
    marginTop: 6,
  },
  openChat: {
    marginTop: 15,
    backgroundColor: colors.firefly,
    borderRadius: 13,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  openChatT: {
    fontFamily: "DMSans_700Bold",
    fontSize: 9,
    letterSpacing: 1.2,
    color: colors.fireflyBg,
  },
  create: {
    marginTop: 28,
    borderWidth: 1,
    borderColor: "#456057",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  createK: {
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    letterSpacing: 1.4,
    color: colors.gold,
  },
  createT: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 20,
    color: colors.cream,
    marginTop: 3,
  },
});
