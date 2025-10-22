import {
  ActionButtonsRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar // Importa el nuevo componente
} from '@/components'
import WindowButtons from '@/components/WindowButtons';
import { useRef } from 'react'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <>
      <DraggableTopBar>
        <WindowButtons /> {/* Agrega los botones de la ventana */}
      </DraggableTopBar>
      <RootLayout className="bg-transparent">
        
        <Sidebar className="p-2 bg-slate-900/30 backdrop-blur-3xl border-r border-blue-400/20 shadow-2xl">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>

        <Content ref={contentContainerRef} className="border-l bg-slate-800/20 backdrop-blur-2xl border-l-blue-400/30 shadow-inner">
          <div className="w-full">
            <FloatingNoteTitle className="pt-8 bg-transparent" />
          </div>
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App