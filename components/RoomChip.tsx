import "@twind/macro"

export default function RoomChip({ className = "" }) {
  return (
    <div tw={["bg-secondary shadow-primary rounded-full inline-block", className]}>
      <div tw="flex gap-3 items-center px-6 py-3">
        <span tw="w-2 h-2 rounded-full bg-status-ok" />
        <span>some-room-name</span>
      </div>
    </div>
  )
}
