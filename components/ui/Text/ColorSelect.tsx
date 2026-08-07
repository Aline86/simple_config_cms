import { useCallback, useEffect, useId, useRef, useState } from "react";
import { colorValue, Shade, TAILWIND_COLORS,  tokenName } from "./TailwindPalette";


type ColorSelectProps = {
  /** Valeur contrôlée. Laisser vide pour un usage non contrôlé. */
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  /** Nuance affichée dans les pastilles. */
  shade?: Shade;
  /** Nom du champ pour la soumission du formulaire. */
  name?: string;
  label?: string;
  disabled?: boolean;
    className?: string;
  field: string
};

export default function ColorSelect({
  value,

  onChange,
  shade = 500,
  name,
  label = "Couleur",
  disabled = false,
  className = "",

}: ColorSelectProps) {

  const [internal, setInternal] = useState<string>(value);

  const [selected, setSelected] = useState(internal ?? value);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, TAILWIND_COLORS.indexOf(selected)),
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ query: "", timer: 0 });

  const listboxId = useId();
  const optionId = useCallback(
    (color: string) => `${listboxId}-${color}`,
    [listboxId],
  );

  const select = useCallback(
    (index: number) => {
      const color = TAILWIND_COLORS[index];
      if (value === undefined) setInternal(color);
      setSelected(color);
      onChange(color);
      setOpen(false);
      buttonRef.current?.focus();
    },
    [onChange, value],
  );

  const openList = useCallback(() => {
    setActiveIndex(Math.max(0, TAILWIND_COLORS.indexOf(selected)));
    setOpen(true);
  }, [selected]);

  /* Fermeture au clic extérieur */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  /* Suivi de l'option active au clavier */
  useEffect(() => {
    if (!open) return;
    const id = optionId(TAILWIND_COLORS[activeIndex]);
    listRef.current
      ?.querySelector<HTMLLIElement>(`#${CSS.escape(id)}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex, optionId]);

  const move = (delta: number) =>
    setActiveIndex((index) => {
      const next = index + delta;
      return (next + TAILWIND_COLORS.length) % TAILWIND_COLORS.length;
    });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        if (!open) return openList();
        return move(event.key === "ArrowDown" ? 1 : -1);
      case "Home":
        if (!open) return;
        event.preventDefault();
        return setActiveIndex(0);
      case "End":
        if (!open) return;
        event.preventDefault();
        return setActiveIndex(TAILWIND_COLORS.length - 1);
      case "Enter":
      case " ":
        event.preventDefault();
        return open ? select(activeIndex) : openList();
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        return;
      case "Tab":
        setOpen(false);
        return;
      default: {
        /* Recherche par frappe : « sl » saute à slate */
        if (event.key.length !== 1 || event.metaKey || event.ctrlKey) return;
        const state = typeahead.current;
        window.clearTimeout(state.timer);
        state.query += event.key.toLowerCase();
        state.timer = window.setTimeout(() => (state.query = ""), 600);

        const match = TAILWIND_COLORS.findIndex((color) =>
          color.startsWith(state.query),
        );
        if (match === -1) return;
        if (open) setActiveIndex(match);
        else select(match);
      }
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* Valeur envoyée avec le formulaire */}
      {name && <input type="hidden" name={name} value={selected} />}

      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={`${label} : ${selected}`}
        aria-activedescendant={
          open ? optionId(TAILWIND_COLORS[activeIndex]) : undefined
        }
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className="flex w-full items-center gap-2.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-900 hover:border-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-600"
      >
        <span
          aria-hidden
          className="size-5 shrink-0 rounded-md ring-1 ring-black/10 dark:ring-white/15"
          style={{ backgroundColor: colorValue(selected, shade) }}
        />
        <span className="font-mono">{selected}</span>
        <span
          aria-hidden
          className={`ml-auto text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute z-20 mt-1.5 max-h-72 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 shadow-xl dark:border-gray-700 dark:bg-gray-900"
        >
          {TAILWIND_COLORS.map((color, index) => {
            const isSelected = color === selected;
            return (
              <li
                key={color}
                id={optionId(color)}
                role="option"
                aria-selected={isSelected}
                onClick={() => select(index)}
                onPointerMove={() => setActiveIndex(index)}
                className={`flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm ${
                  index === activeIndex
                    ? "bg-gray-100 dark:bg-gray-800"
                    : isSelected
                      ? "bg-gray-50 dark:bg-gray-800/50"
                      : ""
                }`}
              >
                <span
                  aria-hidden
                  className="h-5 w-14 shrink-0 rounded-md ring-1 ring-black/10 dark:ring-white/15"
                  style={{ backgroundColor: colorValue(color, shade) }}
                />
                <span className="font-mono text-gray-900 dark:text-gray-100">
                  {color}
                </span>
                <span className="ml-auto font-mono text-xs text-gray-400">
                  {tokenName(color, shade)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
