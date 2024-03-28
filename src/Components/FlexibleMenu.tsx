import "./FlexibleMenu.scss";
import { useEffect, useState, useRef } from "react";
import { programmingLanguages } from "../Utils/Data/dummyData";
import searchIcon from "../assets/search.svg";
import { FlexibleMenuProps, Language } from "../Utils/Types/FlexibleMenu";



const FlexibleMenu: React.FC<FlexibleMenuProps> = ({
  menuType = "static",
  showCheckbox = true,
  showSearchBar = true,
  dropdownPosition = "below",
  contextMenuX,
  contextMenuY,
}) => {
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const [filteredDropdownItems, setFilteredDropdownItems] =
    useState<Language[]>(programmingLanguages);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
  const [inputValue, setInputValue] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);

  const selectDropdownItem = (item: string) => {
    // if the user clicks on the same item, reset the input value and selected dropdown item
    if (item === selectedDropdownItem) {
      setInputValue("");
      setFilteredDropdownItems(programmingLanguages);
      setSelectedDropdownItem("");
      setDropdownMenu(false);
      return;
    }

    setInputValue(item);
    setSelectedDropdownItem(item);
    setDropdownMenu(false);
  };


  const handleUserInput = (enteredItem: string) => {
    const filteredItems = programmingLanguages.filter((language) => {
      return language.name.toLowerCase().includes(enteredItem.toLowerCase());
    });

    if (filteredItems.length === 0) {
      filteredItems.push({ name: "No results found!" });
    }
    setInputValue(enteredItem);
    setFilteredDropdownItems(filteredItems);
  };

  useEffect(() => {

    const handleMouseDown = (e: MouseEvent) => {
      if(menuRef.current && !menuRef.current.contains(e.target as Node)){
          setDropdownMenu(false);
      }
    }

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    }
  })

  return (
    <div
    ref={menuRef}
      style={
        menuType === "context"
          ? {
              position: "absolute",
              top: contextMenuY,
              left: contextMenuX,
              zIndex: 1000,
            }
          : {}
      }
      className="flexible_menu_container"
    >
      <div className="flexible_menu_title">
        <div className="flexible_menu_search">
          <div className="search_icon_container">
            {dropdownMenu && <img src={searchIcon} alt="search" />}
          </div>
          <input
            placeholder="Choose a language"
            value={inputValue}
            onFocus={() => setDropdownMenu(true)}
            onChange={(e) => handleUserInput(e.target.value)}
            className={`${showSearchBar ? '' : 'cursor_pointer'}`}
            type="text"
            readOnly = {!showSearchBar} // to disable the search functionality based on showSearchBar prop's value
          />
        </div>

        {/* change the direction of chevron icon based on dropdownMenu state */}
        <button
          className="dropdown_button"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          {dropdownMenu ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10L8 6L12 10"
                stroke="#CBCBCB"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#CBCBCB"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      {dropdownMenu && (
        <div
          className={`dynamic_menu_dropdown ${dropdownPosition}`}
        >
          {filteredDropdownItems.map((language, index) => (
            <div
              key={index}
              className={`dynamic_menu_dropdown_item ${
                language.name === "No results found!" ? "disabled" : ""
              }`}
              onMouseDown={(e) => {
                if (language.name === "No results found!") {
                  e.stopPropagation();
                  return; // Early return to prevent any further action
                }
                selectDropdownItem(language.name);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33334 8L6.66667 11.3333L13.3333 4.66667"
                  stroke={
                    showCheckbox && (selectedDropdownItem === language.name)
                      ? "#545454"
                      : "transparent"
                  }
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {language.icon && (
                <img
                  className="dynamic_menu_dropdown_item_icon"
                  src={language.icon}
                  alt={language.name}
                />
              )}

              <p className="dynamic_menu_dropdown_item_text">{language.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlexibleMenu;
