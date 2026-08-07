import {
  useCallback,
  useEffect,
  useId,

  useRef,
  useState,
} from "react";

export const FONT_STACKS = [
  {
    id: "system-sans",
    label: "Système (sans)",
    category: "Sans-serif",
    stack: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  {
    id: "grotesk",
    label: "Helvetica / Arial",
    category: "Sans-serif",
    stack: '"Helvetica Neue", Helvetica, "Liberation Sans", Arial, sans-serif',
  },
  {
    id: "humanist",
    label: "Optima / Candara",
    category: "Sans-serif",
    stack: 'Optima, Candara, "Gill Sans", "Gill Sans MT", sans-serif',
  },
  {
    id: "geometric",
    label: "Futura / Century Gothic",
    category: "Sans-serif",
    stack:
      'Futura, "Century Gothic", "Twentieth Century", "Trebuchet MS", sans-serif',
  },
  {
    id: "rounded",
    label: "Arrondie",
    category: "Sans-serif",
    stack:
      'ui-rounded, "SF Pro Rounded", "Segoe UI Variable", Avenir, sans-serif',
  },
  {
    id: "screen-sans",
    label: "Verdana / Tahoma",
    category: "Sans-serif",
    stack: 'Verdana, Tahoma, "DejaVu Sans", "Segoe UI", sans-serif',
  },
  {
    id: "old-style",
    label: "Iowan / Palatino",
    category: "Serif",
    stack:
      '"Iowan Old Style", "Palatino Linotype", Palatino, Charter, Georgia, serif',
  },
  {
    id: "transitional",
    label: "Baskerville / Hoefler",
    category: "Serif",
    stack: 'Baskerville, "Hoefler Text", Cambria, "Times New Roman", serif',
  },
  {
    id: "didone",
    label: "Didot / Bodoni",
    category: "Serif",
    stack: 'Didot, "Bodoni 72", "Bodoni MT", "Playfair Display", serif',
  },
  {
    id: "slab",
    label: "Rockwell / American Typewriter",
    category: "Serif",
    stack:
      'Rockwell, "American Typewriter", "Roboto Slab", "Courier New", serif',
  },
  {
    id: "mono",
    label: "Monospace système",
    category: "Monospace",
    stack:
      'ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace',
  },
];

export const DEFAULT_FONT_ID = "system-sans";

export function resolveFont(value) {
  if (!value) return null;
  console.log("FONT_STACKS.values[value]", FONT_STACKS[value]);
  return (
    FONT_STACKS.find((f) => f.id === value) ||
    FONT_STACKS.find((f) => f.stack === value) ||
    FONT_STACKS[value] ||
    null
  );
}

export function isValidFontValue(value) {
  return resolveFont(value) !== null;
}

export function fontStackFor(value) {
  return (resolveFont(value) || resolveFont(DEFAULT_FONT_ID)).stack;
}

export default function FontSelect({
  value = DEFAULT_FONT_ID,
  onChange,
  name = "font",
  label = "Police",
  hint = "Polices déjà installées sur l'appareil, aucun chargement réseau.",
  sampleText = "Titre / TITRE",
  disabled = false,
  className = "",


}) {
  console.log("value", value)
  const listId = useId();
  const labelId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(Number(value) || 0);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const [selected, setSelected] = useState(
    FONT_STACKS[value] || resolveFont(DEFAULT_FONT_ID),
  );
  
  const selectedIndex =
    FONT_STACKS[value] || FONT_STACKS.indexOf(resolveFont(DEFAULT_FONT_ID));
  console.log("selected", selected);
  const close = useCallback(({ refocus = true } = {}) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  }, []);

  const pick = useCallback(
    (selected: { id: string, label: string, category: string, stack: string }) => {
      setActiveIndex(FONT_STACKS.indexOf(selected));
      setSelected(selected);
      console.log("field", FONT_STACKS.indexOf(selected));
      onChange(String(activeIndex));
      close();
    },
    [onChange, close, selected],
  );

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setActiveIndex(selectedIndex < 0 ? 0 : selectedIndex);
      listRef.current?.focus();
      console.log("selectedIndex", selectedIndex);
  }, [open, selectedIndex]);

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const onListKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, FONT_STACKS.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(FONT_STACKS.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        close({ refocus: false });
        break;
      default:
        break;
    }
  };

  const onButtonKeyDown = (event) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-md ${className}`}>
      <span id={labelId} className="block text-sm font-medium text-slate-800">
        {label}
      </span>

      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onButtonKeyDown}
        className="mt-1.5 flex w-full items-center justify-between gap-3 rounded-md border border-slate-300 bg-white px-3 py-2 text-left focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50"
      >
        <span className="min-w-0">
          <span className="block truncate text-xs text-slate-500">
            {selected.label}
          </span>
          <span
            className="block truncate text-slate-900"
            style={{
              fontFamily: selected.stack,
              fontSize: "18px",
              lineHeight: 1.4,
            }}
          >
            {sampleText}
          </span>
        </span>
        <span aria-hidden="true" className="shrink-0 text-slate-400">
          ▾
        </span>
      </button>

      {hint ? <p className="mt-1.5 text-xs text-slate-500">{hint}</p> : null}

      <input type="hidden" name={name} value={selected.id} />

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-activedescendant={`${listId}-${activeIndex}`}
          onKeyDown={onListKeyDown}
          className="absolute z-20 mt-1 max-h-80 w-full overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg focus:outline-none"
        >
          {FONT_STACKS.map((font, index) => {
            const isActive = index === activeIndex;
            const isSelected = font.id === selected.id;
            return (
              <li
                key={font.id}
                id={`${listId}-${index}`}
                data-index={index}
                role="option"
                aria-selected={isSelected}
                onClick={() => { pick(font) }}
                onMouseEnter={() => setActiveIndex(index)}
                className={`cursor-pointer px-3 py-2 ${isActive ? "bg-slate-100" : ""}`}
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-xs text-slate-500">{font.label}</span>
                  {isSelected ? (
                    <span aria-hidden="true" className="text-xs text-slate-900">
                      ✓
                    </span>
                  ) : null}
                </span>
                <span
                  className="mt-0.5 block truncate text-slate-900"
                  style={{
                    fontFamily: font.stack,
                    fontSize: "20px",
                    lineHeight: 1.4,
                  }}
                >
                  {sampleText}
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
