import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type ActionButtonProps = ComponentProps<'button'>

export const ActionButton = ({ className, children, ...props }: ActionButtonProps) => {
  return (
    <button
      className={twMerge(
        'px-4 py-3 rounded-2xl border border-blue-400/30 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-500 backdrop-blur-xl shadow-lg hover:shadow-2xl text-white font-semibold relative overflow-hidden group',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">{children}</div>
    </button>
  )
}