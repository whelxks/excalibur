import { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { LocalMessage } from "stream-chat";
import { MessageBubble } from "./MessageBubble";
import { colors } from "@/lib/theme";

export function MessageList({
  messages,
  currentUserId,
}: {
  messages: LocalMessage[];
  currentUserId: string;
}) {
  const ref = useRef<ScrollView>(null);
  useEffect(() => {
    const t = setTimeout(
      () => ref.current?.scrollToEnd({ animated: false }),
      50,
    );
    return () => clearTimeout(t);
  }, [messages.length]);

  if (!messages.length)
    return (
      <View style={s.empty}>
        <Text style={s.emptyBig}>You matched.</Text>
        <Text style={s.emptySub}>Say hello — your host is expecting you.</Text>
      </View>
    );

  return (
    <ScrollView
      ref={ref}
      contentContainerStyle={s.list}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={() => ref.current?.scrollToEnd({ animated: false })}
    >
      {messages.map((m) => (
        <MessageBubble
          key={m.id}
          message={m}
          mine={m.user?.id === currentUserId}
        />
      ))}
    </ScrollView>
  );
}
const s = StyleSheet.create({
  list: { padding: 16, paddingBottom: 26, gap: 18 },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  emptyBig: { fontFamily: "Fraunces_700Bold", fontSize: 27, color: colors.ink },
  emptySub: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    color: colors.muted,
    marginTop: 6,
    textAlign: "center",
  },
});
