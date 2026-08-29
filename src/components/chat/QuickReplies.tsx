import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { colors } from "@/lib/theme";

export const QUICK_REPLIES = [
  "Where should we meet?",
  "What time?",
  "What should I bring?",
];

/** Taps fill the composer rather than sending, so the traveller can edit first. */
export function QuickReplies({ onPick }: { onPick: (text: string) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={s.scroll}
      contentContainerStyle={s.row}
      keyboardShouldPersistTaps="handled"
    >
      {QUICK_REPLIES.map((q) => (
        <Pressable key={q} onPress={() => onPick(q)} style={s.chip}>
          <Text style={s.chipT}>{q}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
const s = StyleSheet.create({
  scroll: { flexGrow: 0, flexShrink: 0, backgroundColor: "#FFF9EF" },
  row: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  chip: {
    backgroundColor: colors.paper2,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  chipT: { fontFamily: "DMSans_500Medium", fontSize: 12, color: colors.forest },
});
