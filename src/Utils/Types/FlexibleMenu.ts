
export type Language = {
    name: string;
    icon?: string;
  };
  
  export interface FlexibleMenuProps {
    menuType?: "context" | "static";
    showCheckbox?: boolean;
    showSearchBar?: boolean;
    dropdownPosition?: "above" | "below";
    contextMenuX?: number;
    contextMenuY?: number;
  }