export const DraggableTopBar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="absolute top-0 left-0 w-full h-10 bg-slate-900/40 backdrop-blur-3xl border-b border-blue-400/30 flex justify-end items-center z-50 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      <div className="relative z-10">{children}</div>
    </header>
  )
}
