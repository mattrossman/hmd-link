import "@twind/macro"

export default function RoomChip({ className = "" }) {
  return (
    <div tw={["bg-secondary shadow-primary rounded-full inline-block", className]}>
      <div tw="flex items-center gap-3 px-6 py-3">
        <span tw="inline-block w-2 h-2 rounded-full bg-green-500" />
        <span>some-room-name</span>
      </div>
    </div>
  )
}
