import { DeleteNoteButton, NewNoteButton, ImportNoteButton, ExportNoteButton } from '@/components'
import { ComponentProps } from 'react'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div className="flex gap-2" {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
      <ExportNoteButton />
      <ImportNoteButton />
    </div>
  )
}
