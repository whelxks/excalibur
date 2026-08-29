import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useVerificationStore } from "@/store/verificationStore";
import { getDataFromImage } from "@/lib/gemini";

// Swap these for your actual theme import
const colors = {
  forest: "#1F4D3A",
  moss: "#6B8F71",
  ink: "#111318",
  textMuted: "#8A8F98",
  border: "#E6E8EB",
  bg: "#F7F8F6",
  card: "#FFFFFF",
  danger: "#C24444",
  warning: "#B8860B",
};

type Step =
  | "intro"
  | "capturing"
  | "processing"
  | "review"
  | "certifications"
  | "submitting"
  | "success";

type ExtractedFields = {
  fullName: string;
  passportNumber: string;
  nationality: string;
  dateOfBirth: string; // YYYY-MM-DD
  expiryDate: string; // YYYY-MM-DD
};

type CertFile = {
  uri: string;
  name: string;
  mimeType?: string;
};

async function extractPassportData(imageUri: string): Promise<ExtractedFields> {
  return getDataFromImage(imageUri);

  // return {
  //   fullName: "ALEX JORDAN RIVERA",
  //   passportNumber: "X1234567",
  //   nationality: "AUSTRALIA",
  //   dateOfBirth: "1994-03-12",
  //   expiryDate: "2031-07-19",
  // };
}

async function submitVerification(_payload: {
  passportUri: string;
  fields: ExtractedFields;
  certs: CertFile[];
}): Promise<void> {
  await new Promise((res) => setTimeout(res, 1500));
}
// -------------------------------------------------------------------------

const STEP_ORDER: Step[] = [
  "intro",
  "capturing",
  "processing",
  "review",
  "certifications",
  "submitting",
  "success",
];

function StepDots({ step }: { step: Step }) {
  const activeIndex = Math.min(STEP_ORDER.indexOf(step), 4);
  const visibleSteps = ["Scan", "Processing", "Review", "Certs", "Done"];
  return (
    <View style={s.dotsRow}>
      {visibleSteps.map((label, i) => (
        <View key={label} style={s.dotWrap}>
          <View
            style={[
              s.dot,
              i < activeIndex && s.dotDone,
              i === activeIndex && s.dotActive,
            ]}
          >
            {i < activeIndex ? (
              <Ionicons name="checkmark" size={12} color="#fff" />
            ) : (
              <Text style={[s.dotText, i === activeIndex && s.dotTextActive]}>
                {i + 1}
              </Text>
            )}
          </View>
          {i < visibleSteps.length - 1 && (
            <View style={[s.dotLine, i < activeIndex && s.dotLineDone]} />
          )}
        </View>
      ))}
    </View>
  );
}

export default function VerifyIdentityScreen() {
  const router = useRouter();
  const setVerified = useVerificationStore((s) => s.setVerified);
  const [step, setStep] = useState<Step>("intro");
  const [passportUri, setPassportUri] = useState<string | null>(null);
  const [fields, setFields] = useState<ExtractedFields | null>(null);
  const [certs, setCerts] = useState<CertFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const pickPassportImage = useCallback(
    async (source: "camera" | "library") => {
      setError(null);
      const perm =
        source === "camera"
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!perm.granted) {
        setError(
          "Permission needed to continue. Enable camera/photo access in Settings.",
        );
        return;
      }

      const result =
        source === "camera"
          ? await ImagePicker.launchCameraAsync({
              quality: 0.8,
              allowsEditing: true,
              aspect: [4, 3],
            })
          : await ImagePicker.launchImageLibraryAsync({
              quality: 0.8,
              allowsEditing: true,
              aspect: [4, 3],
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });

      if (result.canceled) return;

      const uri = result.assets[0].uri;
      setPassportUri(uri);
      setStep("processing");

      try {
        const data = await extractPassportData(uri);
        setFields(data);
        setStep("review");
      } catch (e) {
        console.log(e);
        setError(
          "Couldn't read the passport. Try a clearer, well-lit photo of the photo page.",
        );
        setStep("capturing");
      }
    },
    [],
  );

  const pickCertification = useCallback(async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      multiple: true,
      copyToCacheDirectory: true,
    });
    if (result.canceled) return;
    const newCerts = result.assets.map((a) => ({
      uri: a.uri,
      name: a.name,
      mimeType: a.mimeType,
    }));
    setCerts((prev) => [...prev, ...newCerts]);
  }, []);

  const removeCert = (uri: string) =>
    setCerts((prev) => prev.filter((c) => c.uri !== uri));

  const handleSubmit = useCallback(async () => {
    if (!fields || !passportUri) return;
    setStep("submitting");
    try {
      await submitVerification({ passportUri, fields, certs });
      setStep("success");
      setVerified(true);
    } catch {
      setError("Submission failed. Check your connection and try again.");
      setStep("certifications");
    }
  }, [fields, passportUri, certs]);

  return (
    <View style={s.screen}>
      {/* Header */}
      <View style={s.header}>
        <Pressable
          onPress={() => router.replace("/profile")}
          hitSlop={12}
          style={s.headerBtn}
        >
          <Ionicons name="close" size={24} color={colors.ink} />
        </Pressable>
        <Text style={s.headerTitle}>Verify your identity</Text>
        <View style={{ width: 24 }} />
      </View>

      {step !== "intro" && step !== "success" && (
        <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
          <StepDots step={step} />
        </View>
      )}

      <ScrollView
        contentContainerStyle={s.body}
        keyboardShouldPersistTaps="handled"
      >
        {step === "intro" && (
          <View style={s.centerBlock}>
            <View style={s.iconCircle}>
              <Ionicons
                name="shield-checkmark"
                size={36}
                color={colors.forest}
              />
            </View>
            <Text style={s.title}>Quick, one-time check</Text>
            <Text style={s.subtitle}>
              Scan your passport's photo page and we'll pull your details
              automatically — no forms to fill in. Hosts only ever see a
              "Verified" badge, never your document.
            </Text>

            <View style={s.infoCard}>
              <InfoRow
                icon="camera-outline"
                text="Have your passport's photo page ready"
              />
              <InfoRow
                icon="flash-outline"
                text="Good lighting, flat surface, no glare"
              />
              <InfoRow
                icon="lock-closed-outline"
                text="Encrypted and only used for verification"
              />
            </View>

            <Pressable
              style={s.primaryBtn}
              onPress={() => setStep("capturing")}
            >
              <Text style={s.primaryBtnText}>Start verification</Text>
            </Pressable>
          </View>
        )}

        {step === "capturing" && (
          <View style={s.centerBlock}>
            <Text style={s.title}>Scan your passport</Text>
            <Text style={s.subtitle}>
              Line up the photo page inside the frame. Avoid glare on the
              laminated area.
            </Text>

            <View style={s.scanFrame}>
              <Ionicons
                name="scan-outline"
                size={48}
                color={colors.textMuted}
              />
              <Text style={s.scanHint}>Photo page preview</Text>
            </View>

            {error && (
              <View style={s.errorBanner}>
                <Ionicons name="alert-circle" size={16} color={colors.danger} />
                <Text style={s.errorText}>{error}</Text>
              </View>
            )}

            <Pressable
              style={s.primaryBtn}
              onPress={() => pickPassportImage("camera")}
            >
              <Ionicons
                name="camera"
                size={18}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text style={s.primaryBtnText}>Take a photo</Text>
            </Pressable>
            <Pressable
              style={s.secondaryBtn}
              onPress={() => pickPassportImage("library")}
            >
              <Text style={s.secondaryBtnText}>Choose from library</Text>
            </Pressable>
          </View>
        )}

        {step === "processing" && (
          <View style={s.centerBlock}>
            {passportUri && (
              <Image source={{ uri: passportUri }} style={s.passportPreview} />
            )}
            <ActivityIndicator
              size="large"
              color={colors.forest}
              style={{ marginTop: 24 }}
            />
            <Text style={[s.title, { marginTop: 16 }]}>
              Reading your passport…
            </Text>
            <Text style={s.subtitle}>
              This takes a few seconds. Don't close the app.
            </Text>
          </View>
        )}

        {step === "review" && fields && (
          <View style={{ width: "100%" }}>
            <Text style={s.title}>Check your details</Text>
            <Text style={s.subtitle}>
              We pulled this from your passport automatically. Fix anything
              that's off before continuing.
            </Text>

            {passportUri && (
              <View style={s.thumbRow}>
                <Image source={{ uri: passportUri }} style={s.passportThumb} />
                <Pressable
                  onPress={() => setStep("capturing")}
                  style={s.rescanBtn}
                >
                  <Ionicons
                    name="camera-reverse-outline"
                    size={14}
                    color={colors.forest}
                  />
                  <Text style={s.rescanText}>Rescan</Text>
                </Pressable>
              </View>
            )}

            <FormField
              label="Full name"
              value={fields.fullName}
              onChangeText={(v) => setFields({ ...fields, fullName: v })}
            />
            <FormField
              label="Passport number"
              value={fields.passportNumber}
              onChangeText={(v) => setFields({ ...fields, passportNumber: v })}
              autoCapitalize="characters"
            />
            <FormField
              label="Nationality"
              value={fields.nationality}
              onChangeText={(v) => setFields({ ...fields, nationality: v })}
            />
            <View style={s.rowTwo}>
              <FormField
                label="Date of birth"
                value={fields.dateOfBirth}
                onChangeText={(v) => setFields({ ...fields, dateOfBirth: v })}
                style={{ flex: 1, marginRight: 8 }}
                placeholder="YYYY-MM-DD"
              />
              <FormField
                label="Passport expiry"
                value={fields.expiryDate}
                onChangeText={(v) => setFields({ ...fields, expiryDate: v })}
                style={{ flex: 1, marginLeft: 8 }}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <Pressable
              style={s.primaryBtn}
              onPress={() => setStep("certifications")}
            >
              <Text style={s.primaryBtnText}>Looks right, continue</Text>
            </Pressable>
          </View>
        )}

        {step === "certifications" && (
          <View style={{ width: "100%" }}>
            <Text style={s.title}>Add certifications</Text>
            <Text style={s.subtitle}>
              Optional — dive, first-aid, or guiding certifications help hosts
              trust you faster.
            </Text>

            {certs.map((c) => (
              <View key={c.uri} style={s.certRow}>
                <Ionicons
                  name={
                    c.mimeType?.includes("pdf")
                      ? "document-text-outline"
                      : "image-outline"
                  }
                  size={20}
                  color={colors.forest}
                />
                <Text style={s.certName} numberOfLines={1}>
                  {c.name}
                </Text>
                <Pressable onPress={() => removeCert(c.uri)} hitSlop={8}>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={colors.textMuted}
                  />
                </Pressable>
              </View>
            ))}

            <Pressable style={s.uploadBox} onPress={pickCertification}>
              <Ionicons
                name="cloud-upload-outline"
                size={22}
                color={colors.forest}
              />
              <Text style={s.uploadBoxText}>Upload PDF or image</Text>
            </Pressable>

            {error && (
              <View style={s.errorBanner}>
                <Ionicons name="alert-circle" size={16} color={colors.danger} />
                <Text style={s.errorText}>{error}</Text>
              </View>
            )}

            <Pressable style={s.primaryBtn} onPress={handleSubmit}>
              <Text style={s.primaryBtnText}>Submit for verification</Text>
            </Pressable>
            <Pressable style={s.secondaryBtn} onPress={handleSubmit}>
              <Text style={s.secondaryBtnText}>Skip certifications</Text>
            </Pressable>
          </View>
        )}

        {step === "submitting" && (
          <View style={s.centerBlock}>
            <ActivityIndicator size="large" color={colors.forest} />
            <Text style={[s.title, { marginTop: 16 }]}>Submitting…</Text>
          </View>
        )}

        {step === "success" && (
          <View style={s.centerBlock}>
            <View style={[s.iconCircle, { backgroundColor: "#EAF4EC" }]}>
              <Ionicons
                name="checkmark-circle"
                size={40}
                color={colors.forest}
              />
            </View>
            <Text style={s.title}>You're verified</Text>
            <Text style={s.subtitle}>
              Hosts will now see a verified badge on your profile. This usually
              takes effect immediately.
            </Text>
            <Pressable
              style={s.primaryBtn}
              onPress={() => router.replace("/profile")}
            >
              <Text style={s.primaryBtnText}>Done</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function InfoRow({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={s.infoRow}>
      <Ionicons name={icon} size={16} color={colors.forest} />
      <Text style={s.infoRowText}>{text}</Text>
    </View>
  );
}

function FormField({
  label,
  value,
  onChangeText,
  style,
  autoCapitalize,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  style?: any;
  autoCapitalize?: "characters" | "none" | "words" | "sentences";
  placeholder?: string;
}) {
  return (
    <View style={[s.fieldWrap, style]}>
      <Text style={s.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={s.fieldInput}
        autoCapitalize={autoCapitalize ?? "words"}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
      />
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 54 : 20,
    paddingBottom: 12,
  },
  headerBtn: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: "600", color: colors.ink },
  body: { padding: 20, alignItems: "center", flexGrow: 1 },
  centerBlock: { alignItems: "center", width: "100%", paddingTop: 8 },

  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dotWrap: { flexDirection: "row", alignItems: "center" },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  dotDone: { backgroundColor: colors.forest },
  dotActive: { backgroundColor: colors.moss },
  dotText: { fontSize: 11, color: colors.textMuted, fontWeight: "600" },
  dotTextActive: { color: "#fff" },
  dotLine: {
    width: 20,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 2,
  },
  dotLineDone: { backgroundColor: colors.forest },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EEF3EF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.ink,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 8,
  },

  infoCard: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  infoRowText: { marginLeft: 10, fontSize: 13, color: colors.ink, flex: 1 },

  primaryBtn: {
    marginTop: 24,
    backgroundColor: colors.forest,
    paddingVertical: 15,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  secondaryBtn: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
  },
  secondaryBtnText: { color: colors.forest, fontWeight: "600", fontSize: 14 },

  scanFrame: {
    marginTop: 20,
    width: "100%",
    height: 200,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
  },
  scanHint: { marginTop: 8, fontSize: 12, color: colors.textMuted },

  passportPreview: {
    width: "100%",
    height: 190,
    borderRadius: 14,
    resizeMode: "cover",
  },
  thumbRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  passportThumb: {
    width: 64,
    height: 44,
    borderRadius: 6,
    resizeMode: "cover",
  },
  rescanBtn: { flexDirection: "row", alignItems: "center", marginLeft: 12 },
  rescanText: {
    color: colors.forest,
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 4,
  },

  fieldWrap: { marginBottom: 14 },
  fieldLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 6,
    fontWeight: "600",
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.ink,
    backgroundColor: colors.card,
  },
  rowTwo: { flexDirection: "row" },

  certRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  certName: { flex: 1, marginHorizontal: 10, fontSize: 13, color: colors.ink },
  uploadBox: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: "dashed",
    borderRadius: 14,
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  uploadBoxText: {
    marginTop: 8,
    fontSize: 13,
    color: colors.forest,
    fontWeight: "600",
  },

  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBEAEA",
    borderRadius: 10,
    padding: 10,
    marginTop: 14,
    width: "100%",
  },
  errorText: { color: colors.danger, fontSize: 12, marginLeft: 6, flex: 1 },
});
