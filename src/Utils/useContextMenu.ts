
import { useState, useEffect, useRef } from 'react';

export function useContextMenu() {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [dropdownPosition, setDropdownPosition] = useState<'above' | 'below'>('below');
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextMenuClick = (e: MouseEvent) => {
      e.preventDefault();
      let x = e.clientX;
      let y = e.clientY;
      let position: 'above' | 'below' = 'below';

      if (x + 210 > window.innerWidth) {
        x = window.innerWidth - 230;
      } else {
        x += 10;
      }

      if (y + 100 > window.innerHeight) {
        y = window.innerHeight - 50;
        position = 'above';
      } else {
        y += 10;
      }

      setContextMenuPosition({ x, y });
      setDropdownPosition(position);
      setShowContextMenu(true);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setShowContextMenu(false);
      }
    };

    document.addEventListener('contextmenu', handleContextMenuClick);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenuClick);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return {
    showContextMenu,
    contextMenuPosition,
    dropdownPosition,
    contextMenuRef,
  };
}