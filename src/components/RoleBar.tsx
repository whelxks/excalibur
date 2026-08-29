import { useAppState } from "@/lib/app-state";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export default function DebugBar() {
  const { role, clearRole } = useAppState();

  return (
    <View style={styles.bar}>
      <Text style={styles.label}>role: {role ?? "none"}</Text>
      <Pressable onPress={clearRole} style={styles.button}>
        <Text style={styles.buttonText}>Clear role</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#FDECEC",
    borderBottomWidth: 1,
    borderBottomColor: "#F3B6B6",
  },
  label: {
    fontSize: 12,
    fontFamily: "Courier",
    color: "#7A1F1F",
  },
  button: {
    backgroundColor: "#101B2D",
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});