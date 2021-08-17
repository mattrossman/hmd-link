import "@twind/macro"
import RoomChip from "./RoomChip"

export default function Layout({ children }) {
  return (
    <div tw="bg-primary text-primary h-screen w-screen">
      <div tw="flex flex-col h-full max-w-3xl mx-auto px-6">
        <header>
          <h1 tw="font-bold text-6xl my-4">hmd.link</h1>
          <p>Send links to your XR headset, hassle free.</p>
        </header>
        <main tw="flex-grow">{children}</main>
        <footer tw="grid place-content-center p-4">
          <RoomChip />
        </footer>
      </div>
    </div>
  )
}
