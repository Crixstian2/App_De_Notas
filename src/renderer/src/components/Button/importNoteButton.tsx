import { ActionButton, ActionButtonProps } from '@/components'
import { useSetAtom } from 'jotai'
import { importNoteAtom } from '@/store' // Deberás crear este átomo
import { FaFileImport } from 'react-icons/fa6'

export const ImportNoteButton = ({ ...props }: ActionButtonProps) => {
  const importNote = useSetAtom(importNoteAtom)

  const handleImport = async () => {
    await importNote()
  }

  return (
    <ActionButton onClick={handleImport} {...props}>
      <FaFileImport className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
