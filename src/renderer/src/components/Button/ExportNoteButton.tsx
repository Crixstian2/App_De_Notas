import { ActionButton, ActionButtonProps } from '@/components'
import { useAtomValue, useSetAtom } from 'jotai'
import { exportNoteAtom, selectedNoteAtom } from '@/store'
import { FaFileExport } from 'react-icons/fa6'

export const ExportNoteButton = ({ ...props }: ActionButtonProps) => {
  const exportNote = useSetAtom(exportNoteAtom)
  const selectedNote = useAtomValue(selectedNoteAtom)

  const handleExport = async () => {
    if (!selectedNote || !selectedNote.title) return
    await exportNote(selectedNote.title)
  }

  return (
    <ActionButton onClick={handleExport} {...props} disabled={!selectedNote?.title}>
      <FaFileExport className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
