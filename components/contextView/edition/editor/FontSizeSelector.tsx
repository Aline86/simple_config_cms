// ============================================
// 5. components/editor/FontSizeSelector.tsx
// ============================================

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { Editor } from "@tiptap/react";
import { FONT_SIZES } from "../../../../lib/config/editorTypesConfig";

interface FontSizeSelectorProps {
  editor: Editor;
}

export const FontSizeSelector = ({ editor }: FontSizeSelectorProps) => (
  <Listbox>
    <div className="relative mt-2 w-20 inline">
      <ListboxButton className="grid w-20 cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
          Taille
        </span>
        <ChevronUpDownIcon
          aria-hidden="true"
          className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
      </ListboxButton>

      <ListboxOptions
        transition
        className="absolute z-10 mt-1 max-h-56 w-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
      >
        {FONT_SIZES.map((size, index) => (
          <ListboxOption
            key={index}
            onClick={() =>
              editor
                .chain()
                .focus()
                .setMark("textStyle", { fontSize: size.value })
                //.setFontSize(size.value)
                .run()
            }
            value={size.value}
            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
          >
            <div className="flex items-center">{size.label}</div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </div>
  </Listbox>
);
