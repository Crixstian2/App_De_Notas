import { NoteContent, NoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

/**
 * Carga la lista de notas y las ordena por última edición.
 */
const loadNotes = async () => {
  const notes = await window.context.getNotes()
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

/**
 * Átomo para importar una nueva nota desde un archivo .md o .txt.
 */
export const importNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  if (!notes) return

  // Llama a la función de importación expuesta en preload.ts
  const importedNote = await window.context.importNote?.()
  if (!importedNote) return // Usuario canceló o algo falló

  // Creamos el NoteInfo a partir de la respuesta
  const newNote: NoteInfo = {
    title: importedNote.title,
    lastEditTime: Date.now()
  }

  // Insertamos la nota al inicio, filtrando si ya existía
  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

  // Seleccionamos la nota recién importada (índice 0)
  set(selectedNoteIndexAtom, 0)
})

/**
 * Átomo asíncrono para cargar la lista inicial de notas.
 */
const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

/**
 * Envuelve el átomo asíncrono para exponer la lista de notas de forma reactiva.
 */
export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

/**
 * Átomo para manejar el índice de la nota seleccionada en la lista.
 */
export const selectedNoteIndexAtom = atom<number | null>(null)

/**
 * Átomo asíncrono para obtener la nota seleccionada, incluyendo su contenido.
 */
const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null || !notes) return null

  const selectedNote = notes[selectedNoteIndex]
  const noteContent = await window.context.readNote(selectedNote.title)

  return {
    ...selectedNote,
    content: noteContent
  }
})

/**
 * Envuelve el átomo asíncrono de la nota seleccionada para exponerlo de forma reactiva.
 */
export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEditTime: Date.now()
    }
)

/**
 * Átomo para guardar la nota seleccionada.
 */
export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote || !notes) return

  // Guarda en disco
  await window.context.writeNote(selectedNote.title, newContent)

  // Actualiza la hora de edición de la nota
  set(
    notesAtom,
    notes.map((note) => {
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }
      return note
    })
  )
})

/**
 * Átomo para crear una nota nueva y vacía.
 */
export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  if (!notes) return

  const title = await window.context.createNote()
  if (!title) return

  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now()
  }

  // Agrega la nueva nota y elimina duplicados por título
  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

  // Selecciona la nota recién creada
  set(selectedNoteIndexAtom, 0)
})

/**
 * Átomo para eliminar la nota seleccionada.
 */
export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote || !notes) return

  const isDeleted = await window.context.deleteNote(selectedNote.title)
  if (!isDeleted) return

  // Filtra la nota borrada
  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )

  // Des-selecciona cualquier nota
  set(selectedNoteIndexAtom, null)
})

export const exportNoteAtom = atom(null, async (get, set, noteTitle: string) => {
  const notes = get(notesAtom)
  if (!notes) return

  const selectedNote = notes.find((note) => note.title === noteTitle)
  if (!selectedNote) return

  const noteContent = await window.context.readNote?.(selectedNote.title)
  if (!noteContent) return
  await window.context.exportNote?.(selectedNote.title, noteContent)
})

