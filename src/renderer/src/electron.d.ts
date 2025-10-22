// electron.d.ts
export {}

declare global {
  interface Window {
    electron?: {
      minimizeWindow: () => void
      maximizeWindow: () => void
      closeWindow: () => void
    }
  }
}
