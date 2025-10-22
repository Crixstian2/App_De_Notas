const WindowButtons = () => {
    const handleMinimize = () => {
      window.electron?.minimizeWindow?.()
    }
  
    const handleMaximize = () => {
      window.electron?.maximizeWindow?.()
    }
  
    const handleClose = () => {
      window.electron?.closeWindow?.()
    }
  
    return (
      <div className="flex gap-2 pr-3">
        <button 
          onClick={handleMinimize} 
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-blue-500/30 text-blue-300 hover:text-blue-100 transition-all duration-300 backdrop-blur-xl border border-blue-400/30 hover:border-blue-400 shadow-lg hover:shadow-xl"
          title="Minimizar"
        >
          _
        </button>
  
        <button 
          onClick={handleMaximize} 
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-blue-500/30 text-blue-300 hover:text-blue-100 transition-all duration-300 backdrop-blur-xl border border-blue-400/30 hover:border-blue-400 shadow-lg hover:shadow-xl"
          title="Maximizar"
        >
          ☐
        </button>
  
        <button 
          onClick={handleClose} 
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-500/40 text-red-300 hover:text-red-100 transition-all duration-300 backdrop-blur-xl border border-red-400/30 hover:border-red-400 shadow-lg hover:shadow-xl"
          title="Cerrar"
        >
          ✕
        </button>
      </div>
    )
  }
  
  export default WindowButtons
  