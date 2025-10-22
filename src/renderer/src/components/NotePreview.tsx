import { cn, formatDateFromMs } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const date = formatDateFromMs(lastEditTime)

  return (
    <div
      className={cn(
        'cursor-pointer px-4 py-3 rounded-2xl transition-all duration-500 backdrop-blur-xl border relative overflow-hidden',
        {
          'bg-blue-500/20 shadow-2xl border-blue-400 text-white': isActive,
          'hover:bg-slate-700/30 hover:border-blue-400/50 hover:shadow-xl text-slate-200': !isActive
        },
        className
      )}
      {...props}
    >
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
      )}
      <div className="relative z-10">
        <h3 className="mb-1 font-bold truncate text-lg">{title}</h3>
        <span className="inline-block w-full mb-2 text-xs font-light text-left opacity-70">{date}</span>
      </div>
    </div>
  )
}