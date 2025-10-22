import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  if (!selectedNote) return null

  return (
    <div className={twMerge('title-container', className)} {...props}>
      <div className="floating-title relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-xl"></div>
        <div className="relative bg-black/70 backdrop-blur-2xl px-8 py-4 rounded-2xl border-2 border-yellow-400 shadow-2xl">
          <span className="text-yellow-300 text-2xl font-black drop-shadow-lg">
            {selectedNote.title}
          </span>
        </div>
      </div>
    </div>
  )
}
