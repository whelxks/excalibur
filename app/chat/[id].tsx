import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import type { Channel, MessageResponse } from "stream-chat";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { Composer } from "@/components/chat/Composer";
import { MessageList } from "@/components/chat/MessageList";
import { QuickReplies } from "@/components/chat/QuickReplies";
import { currentUser, ensureMatchChannel, matchFromId } from "@/lib/matches";
import { connectStreamUser, hasStream, streamClient } from "@/lib/stream";
import { colors } from "@/lib/theme";

export default function Chat() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const match = matchFromId(id || "");
  const [channel, setChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    let live = true;
    (async () => {
      if (!hasStream) {
        setError("Add EXPO_PUBLIC_STREAM_API_KEY to .env to enable chat.");
        return;
      }
      if (!match) {
        setError("This match no longer exists.");
        return;
      }
      try {
        await connectStreamUser(currentUser);
        if (!live) return;
        const ch = await ensureMatchChannel(match);
        if (!live || !ch) return;
        setChannel(ch);
        setMessages([...ch.state.messages] as MessageResponse[]);
        await ch.markRead();
      } catch (e: any) {
        if (live) setError(e?.message ?? "Could not open this conversation.");
      }
    })();
    return () => {
      live = false;
    };
  }, [id]);

  // Live updates. Stream pushes new messages over the websocket connection.
  useEffect(() => {
    if (!channel) return;
    const handler = () => {
      setMessages([...channel.state.messages] as MessageResponse[]);
      channel.markRead().catch(() => {});
    };
    channel.on("message.new", handler);
    channel.on("message.updated", handler);
    channel.on("message.deleted", handler);
    return () => {
      channel.off("message.new", handler);
      channel.off("message.updated", handler);
      channel.off("message.deleted", handler);
    };
  }, [channel]);

  async function send() {
    const value = text.trim();
    if (!value || !channel) return;
    setText("");
    try {
      await channel.sendMessage({ text: value });
    } catch (e: any) {
      setError(e?.message ?? "Message failed to send.");
    }
  }

  if (error)
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.errorWrap}>
          <Text style={s.errorBig}>Chat unavailable</Text>
          <Text style={s.errorSub}>{error}</Text>
        </View>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={s.safe} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <ChatHeader
          name={match?.host.name ?? ""}
          image={match?.host.image}
          activityName={match?.activityName ?? ""}
          city={match?.city ?? ""}
          onBack={() => router.back()}
          onPressProfile={() => match && router.push(`/host/${match.host.id}`)}
        />
        <MessageList
          messages={messages}
          currentUserId={streamClient?.userID ?? currentUser.id}
        />
        <QuickReplies
          onPick={(t) => {
            setText(t);
            inputRef.current?.focus();
          }}
        />
        <Composer
          ref={inputRef}
          value={text}
          onChangeText={setText}
          onSend={send}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  errorWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  errorBig: { fontFamily: "Fraunces_700Bold", fontSize: 26, color: colors.ink },
  errorSub: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
  },
});
