import Constants from "expo-constants";

export type ExtractedFields = {
  fullName: string;
  passportNumber: string;
  nationality: string;
  dateOfBirth: string;
  expiryDate: string;
};

// On web, a relative path like '/ai/gemini' resolves fine against
// window.location. On native (iOS/Android), fetch has no origin to resolve
// against, so a relative path silently fails. We build an absolute URL:
// in dev, from the Expo dev server's host; in production, from your
// deployed domain (set EXPO_PUBLIC_API_URL as an env var for that build).
function getApiBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  // Dev fallback: derive from the Expo dev server host (e.g. 192.168.1.5:8081)
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    return `http://${hostUri.split(":")[0]}:${hostUri.split(":")[1] ?? "8081"}`;
  }
  throw new Error(
    "Could not determine API base URL — set EXPO_PUBLIC_API_URL for this build.",
  );
}

const API_ROUTE = "/ai/gemini";

async function uriToBase64(uri: string): Promise<string> {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      resolve(dataUrl.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function getDataFromImage(
  imageUri: string,
): Promise<ExtractedFields> {
  const base64 = await uriToBase64(imageUri);

  const url = `${getApiBaseUrl()}${API_ROUTE}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageBase64: base64, mimeType: "image/jpeg" }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(
      body.error ?? `Image extraction failed (${response.status})`,
    );
  }

  return response.json();
}
