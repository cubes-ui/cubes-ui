import { useState } from "react";
import { debounce } from "../../utils";
import { Input } from "../input";
import { ComboBoxProps } from "./combo-box.type";

export function ComboBox({
  options,
  selected,
  setSelected,
  placeholder = "Select or type...",
}: ComboBoxProps) {
  const [query, setQuery] = useState(selected || "");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const filteredOptions = options.filter((option) =>
    option?.toLowerCase()?.includes(query?.toLowerCase())
  );

  const handleSelect = (option: string) => {
    if (option) {
      setSelected(option);
      setQuery(option);
      setIsOpen(false);
      setHighlightedIndex(-1);
      return;
    }
    setSelected("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        Math.min(prev + 1, filteredOptions.length - 1)
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    }

    if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredOptions[highlightedIndex]);
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className="relative w-64">
      <Input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          setHighlightedIndex(0);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={debounce(() => setIsOpen(false), 100)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow max-h-60 overflow-auto">
          {filteredOptions.map((option, idx) => (
            <li
              key={option}
              className={`px-4 py-2 cursor-pointer first:rounded-t last:rounded-b ${
                idx === highlightedIndex
                  ? "bg-primary-100"
                  : "hover:bg-gray-100"
              }`}
              onMouseDown={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
