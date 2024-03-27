import { useContextMenu } from './Utils/useContextMenu'
import './App.scss'
import FlexibleMenu from './Components/FlexibleMenu'


function App() {
  
  const {
    showContextMenu,
    contextMenuPosition,
    dropdownPosition,
    contextMenuRef,
  } = useContextMenu();
  
  return (

      <div className='app_container'>
      <FlexibleMenu showCheckbox={true} dropdownPosition='below' />

      {showContextMenu && (
        <div ref={contextMenuRef}>
          <FlexibleMenu
            menuType="context"
            showCheckbox={true}
            dropdownPosition={dropdownPosition}
            contextMenuX={contextMenuPosition.x}
            contextMenuY={contextMenuPosition.y}
          />
        </div>
      )}
    </div>
   
  )
}

export default App




