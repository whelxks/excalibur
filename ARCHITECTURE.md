# Every Tourist — architecture snapshot

## Mobile
Expo / React Native / Expo Router / TypeScript

## Backend
Supabase Auth + Postgres + Storage + Realtime + Edge Functions (when needed)

## Main state transitions

`tourist chooses activity → swipes host right → activity_request created → host accepts/rejects → accepted count reaches max_pax → booking confirmed → booking_members created → chat created → clients distribute wrapped chat key → encrypted messages begin → activity completed → badge granted + journal note`

## Firefly
`online seed/cache → local AsyncStorage → compact QR payload → camera scan → merge → persist → re-share`

## Production Firefly upgrade
- signed resource reports
- trust/provenance per report instead of only aggregate confidence
- confidence decay over time
- geospatial filtering
- chunked QR exchange for larger datasets
- duplicate-device / Sybil mitigation
- Bluetooth / Nearby / MultipeerConnectivity transport as an optional second carrier
- CRDT or append-only event log for deterministic merging
