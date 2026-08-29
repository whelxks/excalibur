import { useMemo, useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Brand } from "@/components/Brand";
import { colors } from "@/lib/theme";
import { useAppStore } from "@/store/useAppStore";
import { SafeAreaView } from "react-native-safe-area-context";

const COUNTRIES = ["Japan", "Australia", "Italy", "Mexico"] as const;
type Country = (typeof COUNTRIES)[number];

// Smaller, culturally distinct towns rather than capitals/major cities
const CITIES_BY_COUNTRY: Record<Country, string[]> = {
  Japan: ["Takayama", "Naoshima", "Yufuin", "Kyoto", "Osaka"],
  Australia: ["Kiama", "Nimbin", "Margaret River"],
  Italy: ["Matera", "Alberobello", "Orvieto"],
  Mexico: ["Oaxaca"],
};

const HERO_IMAGE_BY_COUNTRY: Record<Country, string> = {
  Japan:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=90",
  Australia:
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1600&q=90",
  Italy:
    "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=1600&q=90",
  Mexico:
    "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1600&q=90",
};

export default function TouristLanding() {
  const router = useRouter();
  const setDestination = useAppStore((s) => s.setDestination);
  const [country, setCountry] = useState<Country>("Japan");
  const [city, setCity] = useState(CITIES_BY_COUNTRY["Japan"][0]);
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);

  const cityOptions = useMemo(() => CITIES_BY_COUNTRY[country], [country]);
  const heroImage = HERO_IMAGE_BY_COUNTRY[country];

  const selectCountry = (c: Country) => {
    setCountry(c);
    setCity(CITIES_BY_COUNTRY[c][0]);
    setCountryPickerOpen(false);
  };

  const go = () => {
    setDestination(country, city);
    router.push("/(tabs)/discover");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={s.page}
          keyboardShouldPersistTaps="handled"
        >
          <ImageBackground
            key={country}
            source={{ uri: heroImage }}
            style={s.hero}
            imageStyle={s.heroImg}
          >
            <LinearGradient
              colors={["rgba(12,20,17,.05)", "rgba(12,20,17,.78)"]}
              // style={StyleSheet.absoluteFillObject}
            />
            <View style={s.heroTop}>
              <Brand light />
              <Text style={s.kicker}>LOCAL, NOT LISTED</Text>
            </View>
            <View>
              <Text style={s.title}>
                Don’t visit.{"\n"}Belong for a moment.
              </Text>
              <Text style={s.sub}>
                Tiny groups. Verified locals. Places that never make the tour
                websites.
              </Text>
            </View>
          </ImageBackground>

          <View style={s.sheet}>
            <Text style={s.question}>Where do you want to go?</Text>
            <Text style={s.helper}>
              Start broad. We’ll find the city’s smaller stories.
            </Text>

            <Pressable
              style={s.inputWrap}
              onPress={() => setCountryPickerOpen(true)}
            >
              <Ionicons name="globe-outline" size={20} color={colors.muted} />
              <Text style={s.selectValue}>{country}</Text>
              <Ionicons name="chevron-down" size={18} color={colors.muted} />
            </Pressable>

            <View style={s.inputWrap}>
              <Ionicons
                name="location-outline"
                size={20}
                color={colors.muted}
              />
              <TextInput
                value={city}
                onChangeText={setCity}
                placeholder="City"
                placeholderTextColor="#9A9288"
                style={s.input}
              />
            </View>

            <View style={s.chips}>
              {cityOptions.map((ci) => (
                <Pressable
                  key={ci}
                  onPress={() => setCity(ci)}
                  style={[s.chip, ci === city && s.chipActive]}
                >
                  <Text style={[s.chipT, ci === city && s.chipTActive]}>
                    {ci}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable onPress={go} style={s.cta}>
              <Text style={s.ctaT}>ENTER THE CITY</Text>
              <Ionicons name="arrow-forward" size={18} color={colors.cream} />
            </Pressable>
            {/* <Pressable
              onPress={() => router.push("/host-dashboard")}
              style={s.host}
            >
              <Text style={s.hostT}>I’m a local — I want to host</Text>
            </Pressable> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={countryPickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setCountryPickerOpen(false)}
      >
        <Pressable
          style={s.modalBackdrop}
          onPress={() => setCountryPickerOpen(false)}
        >
          <View style={s.modalSheet}>
            <Text style={s.modalTitle}>Choose a country</Text>
            {COUNTRIES.map((c) => (
              <Pressable
                key={c}
                style={[s.modalOption, c === country && s.modalOptionActive]}
                onPress={() => selectCountry(c)}
              >
                <Text
                  style={[
                    s.modalOptionT,
                    c === country && s.modalOptionTActive,
                  ]}
                >
                  {c}
                </Text>
                {c === country && (
                  <Ionicons name="checkmark" size={18} color={colors.forest} />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  page: { backgroundColor: colors.paper, paddingBottom: 36 },
  hero: { height: 480, padding: 22, justifyContent: "space-between" },
  heroImg: { borderBottomLeftRadius: 38, borderBottomRightRadius: 38 },
  heroTop: { gap: 20 },
  kicker: {
    fontFamily: "DMSans_700Bold",
    fontSize: 10,
    letterSpacing: 2.2,
    color: colors.cream,
    opacity: 0.86,
  },
  title: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 49,
    lineHeight: 50,
    color: colors.cream,
    letterSpacing: -1.4,
  },
  sub: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    lineHeight: 23,
    color: "#F4EDE5",
    marginTop: 15,
    maxWidth: 340,
  },
  sheet: {
    marginTop: -12,
    marginHorizontal: 16,
    padding: 22,
    borderRadius: 30,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: "#E3DACF",
  },
  question: { fontFamily: "Fraunces_700Bold", fontSize: 30, color: colors.ink },
  helper: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    color: colors.muted,
    marginTop: 5,
    marginBottom: 20,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 18,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#FFFCF7",
  },
  input: {
    flex: 1,
    height: 52,
    fontFamily: "DMSans_500Medium",
    fontSize: 16,
    color: colors.ink,
  },
  selectValue: {
    flex: 1,
    height: 52,
    lineHeight: 52,
    fontFamily: "DMSans_500Medium",
    fontSize: 16,
    color: colors.ink,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginVertical: 6 },
  chip: {
    backgroundColor: colors.paper2,
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 13,
  },
  chipActive: {
    backgroundColor: colors.forest,
  },
  chipT: { fontFamily: "DMSans_700Bold", fontSize: 11, color: colors.forest },
  chipTActive: {
    color: colors.cream,
  },
  cta: {
    marginTop: 16,
    backgroundColor: colors.forest,
    borderRadius: 18,
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  ctaT: {
    fontFamily: "DMSans_700Bold",
    fontSize: 12,
    letterSpacing: 1.7,
    color: colors.cream,
  },
  host: { alignItems: "center", paddingTop: 18 },
  hostT: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: colors.terra,
    textDecorationLine: "underline",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(12,20,17,0.4)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
    paddingBottom: 36,
  },
  modalTitle: {
    fontFamily: "Fraunces_700Bold",
    fontSize: 20,
    color: colors.ink,
    marginBottom: 14,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  modalOptionActive: {},
  modalOptionT: {
    fontFamily: "DMSans_500Medium",
    fontSize: 16,
    color: colors.ink,
  },
  modalOptionTActive: {
    fontFamily: "DMSans_700Bold",
    color: colors.forest,
  },
});
