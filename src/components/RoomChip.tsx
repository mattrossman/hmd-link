type Props = {
  room?: string
}

export default function RoomChip({ room }: Props) {
  return (
    <div tw={['bg-secondary rounded-full shadow-primary inline-block transition-opacity', room ? 'opacity-100' : 'opacity-0']}>
      <div tw="flex gap-3 items-center px-6 py-3">
        <span tw="w-2 h-2 rounded-full transition-colors bg-status-ok" />
        <span>{room || '-'}</span>
      </div>
    </div>
  )
}
