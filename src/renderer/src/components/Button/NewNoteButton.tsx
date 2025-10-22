import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { LiaFileSignatureSolid } from 'react-icons/lia'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = async () => {
    await createEmptyNote()
  }

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LiaFileSignatureSolid className="w-4 h-4 text-cyan-300 hover:text-cyan-100 transition-colors" />
    </ActionButton>
  )
}
