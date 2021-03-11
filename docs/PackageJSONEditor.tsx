import { PackageJSONFile } from "src/lib/PackageJSON";
import * as React from "react";
import "./PackageJSONEditor.css";
import { RouterType } from "src/lib/Route";
import { Portal } from "react-portal";
import { Folder } from "src/icons/Folder";

export enum PropertyBindingType {
  router,
}

const QuoteLiteral = ({}) => (
  <span className="CodeBox-token CodeBox-token--Quote">"</span>
);
const PropertyName = ({ children }) => (
  <span className="CodeBox-token CodeBox-token--PropertyName">{children}</span>
);

const StringKey = ({ name }) => (
  <div className="StringKey">
    <QuoteLiteral />
    <PropertyName>{`${name}`}</PropertyName>
    <QuoteLiteral />
    <Colon />
  </div>
);

const Colon = ({}) => (
  <span className="CodeBox-token CodeBox-token--Colon">:</span>
);

const OpeningBrace = ({}) => (
  <span className="CodeBox-token CodeBox-token--OpeningBrace">{"{"}</span>
);

const ClosingBrace = ({}) => (
  <span className="CodeBox-token CodeBox-token--ClosingBrace">{"}"}</span>
);

const AutoCompleter = React.forwardRef((props, ref) => {
  const _ref = React.useRef();
  React.useImperativeHandle(ref, () => _ref);
  React.useLayoutEffect(() => {
    _ref.current.innerText = props.defaultValue || "";
  }, [_ref, props.defaultValue]);
  return (
    <>
      <div
        ref={_ref}
        contentEditable
        data-focusable
        suppressContentEditableWarning
        className="AutoCompletePropertyValue"
      ></div>
    </>
  );
});

const AutocompleteListItem = ({ icon, label, value, selectedLength }) => {
  return (
    <div className="AutocompleteListItem" data-value={value}>
      {icon}
      <div className="AutocompleteListItem-label">
        <span className="AutocompleteListItem-highlight">
          {label.substring(0, selectedLength)}
        </span>

        {label.substring(selectedLength)}
      </div>
    </div>
  );
};

const HTMLIcon = (props) => {
  return (
    <svg viewBox="0 0 640 512" {...props}>
      <path
        fill="currentColor"
        d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"
      />
    </svg>
  );
};

const htmlIcon = <HTMLIcon width={18} />;
const folderIcon = <Folder width={18} />;

const BANNED_DIR_NAMES = [
  "node_modules",
  "bower_components",
  "test",
  "spec",
  "__test__",
  "__spec__",
  "vendor",
];

const routeTuple = [null, ""];
async function* walkRouteFiles(
  handle: FileSystemDirectoryHandle,
  parentName: string,
  isRoot: boolean = true
) {
  const relativeName = isRoot
    ? ""
    : parentName.length
    ? `${parentName}/${handle.name}`
    : handle.name;

  for await (let _entry of handle.values()) {
    const entry = _entry as FileSystemFileHandle | FileSystemDirectoryHandle;
    if (entry.name.startsWith(".")) continue;

    switch (entry.kind) {
      case "file": {
        if (entry.name.endsWith(".html")) {
          routeTuple[1] = `${relativeName}/${entry.name}`;
          routeTuple[0] = entry;
          yield routeTuple;
        }
        break;
      }

      case "directory": {
        if (!BANNED_DIR_NAMES.includes(entry.name)) {
          routeTuple[1] = `${relativeName}/${entry.name}/`;
          routeTuple[0] = entry;
          yield* await walkRouteFiles(
            entry as FileSystemDirectoryHandle,
            relativeName,
            false
          );
        }
        break;
      }
    }
  }

  routeTuple[1] = relativeName || "/";
  if (!routeTuple[1].endsWith("/")) routeTuple[1] += "/";
  routeTuple[0] = handle;
  yield routeTuple;
}

type UsableRoute = {
  icon: React.ReactElement;
  label: string;
  value: string;
  handle: FileSystemHandle;
  key: string;
  selectedLength: number;
};

export async function getRouteFilesForHandle(
  handle: FileSystemDirectoryHandle
) {
  const handles: UsableRoute[] = [];

  for await (let [route, value] of walkRouteFiles(handle, "")) {
    handles.push({
      handle: route as FileSystemHandle,
      label: value as string,
      value: value as string,
      key: value as string,
      selectedLength: 0,
      icon: route.kind === "file" ? htmlIcon : folderIcon,
    });
  }

  return handles;
}

function viewSorter({ props: aProps }, { props: bProps }) {
  return aProps.label === bProps.label
    ? 0
    : aProps.label > bProps.label
    ? 1
    : -1;
}

const AutoCompleteBox = React.forwardRef(
  ({ editRef, values, query = "" }, ref) => {
    const container = React.useRef<HTMLDivElement>();
    React.useImperativeHandle(ref, () => container.current);

    let views: Array<React.ReactElement>;

    if (!query.length) {
      const count = Math.min(values.length, 14);
      views = new Array(values.length);
      for (let i = 0; i < values.length; i++) {
        values[i].selectedLength = 0;
        views[i] = React.createElement(AutocompleteListItem, values[i]);
      }
      views.sort(viewSorter);
      if (views.length > count) {
        views.length = count;
      }
    } else {
      const selectedLength = query.length;

      const count = Math.min(values.length, 14);

      // TODO: use quickselect instead of sort
      views = [];
      for (let i = 0; i < values.length; i++) {
        if (values[i].label.startsWith(query)) {
          values[i].selectedLength = selectedLength;
          views.push(React.createElement(AutocompleteListItem, values[i]));
        } else if (
          query.startsWith("/") &&
          !values[i].label.startsWith("/") &&
          values[i].label.startsWith(query.substring(1))
        ) {
          values[i].selectedLength = selectedLength - 1;
          views.push(React.createElement(AutocompleteListItem, values[i]));
        }
      }
      views.sort(viewSorter);
      if (views.length > count) {
        views.length = count;
      }
    }

    return (
      <div ref={container} className="AutoCompleteBox">
        {views}
      </div>
    );
  }
);

function setCaretToEnd(target: HTMLDivElement) {
  const range = document.createRange();
  const sel = window.getSelection();
  sel.removeAllRanges();
  range.setStart(target, 0);
  sel.addRange(range);
  target.focus();
  range.detach(); // optimization

  // set scroll to the end if multiline
  target.scrollTop = target.scrollHeight;
}

function blur(content: HTMLDivElement) {
  content.blur();
  content.dispatchEvent(new Event("blur", { bubbles: true }));
}

function setSelectedIndex(container: HTMLDivElement, index: number, ref) {
  ref.current = index;
  const node = container.childNodes.item(index);
  let selected = container.querySelector("[data-selected]");
  if (selected !== node && selected) {
    selected.removeAttribute("data-selected");
  } else if (selected === node) {
    return;
  }

  (node as HTMLDivElement).setAttribute("data-selected", "true");
}

const AutoCompletePropertyValue = ({ values, onChange, defaultValue }) => {
  const [hasFocus, setHasFocus] = React.useState(false);
  const [route, setRoute] = React.useState(defaultValue);
  const editRef = React.useRef<HTMLDivElement>();
  const boxRef = React.useRef<HTMLElement>();
  const selectedIndex = React.useRef<number>(0);

  const currentValue = React.useRef<string>(defaultValue);

  React.useLayoutEffect(() => {
    const becomeFocus = () => setHasFocus(true);
    const resignFocus = () => {
      console.trace("t");
      if (!document.activeElement?.hasAttribute("contenteditable")) {
        setHasFocus(false);
        onChange(currentValue.current);
        if (boxRef?.current) {
          boxRef.current.hidden = true;
        }
      }
    };
    function checkClickOutside(event: MouseEvent) {
      if (event.defaultPrevented) return;

      setHasFocus(false);

      // if (!el.closest(".AutoCompleteBox") && !el.closest("[contenteditable]")) {
      //   event.preventDefault();
      //   if (document.activeElement === editRef?.current) {
      //     editRef?.current?.blur();
      //   }
      //   resignFocus();
      // }
    }
    editRef.current.addEventListener("focusin", becomeFocus);
    editRef.current.addEventListener("focusout", resignFocus);
    return () => {
      editRef.current.removeEventListener("focusin", becomeFocus);
      editRef.current.removeEventListener("focusout", resignFocus);
    };
  }, [editRef, setHasFocus, boxRef, onChange, currentValue]);
  const frameRef = React.useRef();

  React.useLayoutEffect(() => {
    if (boxRef.current) setSelectedIndex(boxRef.current, 0, selectedIndex);
  }, [route, boxRef, values]);

  React.useLayoutEffect(() => {
    if (!boxRef.current || !editRef.current) return;

    function onSelectionChange(event: Event) {
      let selection = getSelection();
      let boundingRectEl = event.currentTarget.querySelector(
        "[contenteditable]"
      );
      const text = boundingRectEl.innerText;
      if (!text) {
        setRoute("");
        currentValue.current = "";
      } else {
        setRoute((currentValue.current = text));
      }

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      // updateFilterList(currentValue);

      frameRef.current = requestAnimationFrame(() => {
        setSelectedIndex(boxRef.current, 0, selectedIndex);

        const rect = boundingRectEl.getBoundingClientRect();
        boxRef.current.style.setProperty("--offset-x", `${rect.right}px`);
        boxRef.current.style.setProperty("--offset-y", `${rect.bottom}px`);
      });
    }

    const el = editRef.current.querySelector("[contenteditable]");
    setCaretToEnd(el);
    console.log(el);

    if (el.innerText) {
      const rect = el.getBoundingClientRect();
      boxRef.current.style.setProperty("--offset-x", `${rect.right}px`);
      boxRef.current.style.setProperty("--offset-y", `${rect.bottom}px`);
    } else {
      const rect = el.getBoundingClientRect();
      boxRef.current.style.setProperty("--offset-x", `${rect.right}px`);
      boxRef.current.style.setProperty("--offset-y", `${rect.bottom}px`);
    }

    function onMouseOver(event: MouseEvent) {
      const orig = event.target as HTMLElement;

      const listItem = orig.closest(".AutoCompleteListItem");
      if (!listItem) {
        return;
      }

      const index = Array.prototype.indexOf.call(
        listItem.parentElement.childNodes,
        listItem
      );

      setSelectedIndex(boxRef.current, index, selectedIndex);
      return listItem;
    }

    function onKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowUp": {
          let newIndex = selectedIndex.current - 1;
          newIndex =
            newIndex < 0 ? boxRef.current.childElementCount - 1 : newIndex;
          event.preventDefault();
          setSelectedIndex(boxRef.current, newIndex, selectedIndex);
          break;
        }

        case "ArrowDown": {
          event.preventDefault();
          let newIndex = selectedIndex.current + 1;
          newIndex =
            newIndex > boxRef.current.childElementCount - 1 ? 0 : newIndex;
          setSelectedIndex(boxRef.current, newIndex, selectedIndex);
          break;
        }

        case "Escape": {
          event.preventDefault();
          const content = editRef.current.querySelector("[contenteditable]");
          blur(content);
          break;
        }

        case "Enter": {
          event.preventDefault();
          const content = editRef.current.querySelector("[contenteditable]");
          onSelectValue(
            content,
            boxRef.current.childNodes
              .item(selectedIndex.current)
              .getAttribute("data-value")
          );
          break;
        }
      }
    }
    function doFocus(event: MouseEvent) {
      event.preventDefault();
      editRef.current.querySelector("[contenteditable]").focus();
    }

    function onSelectValue(content: HTMLDivElement, value: string) {
      currentValue.current = content.innerText = value;
      getSelection().modify("move", "right", "line");
      blur(content);
    }

    function onClickItem(event: MouseEvent) {
      const item = onMouseOver(event);

      if (item) {
        event.preventDefault();
        const content = editRef.current.querySelector("[contenteditable]");
        onSelectValue(content, item.getAttribute("data-value"));
      }
    }

    editRef.current.addEventListener("keydown", onKeyDown);
    editRef.current.addEventListener("click", doFocus);

    // document.addEventListener("selectionchange", onSelectionChange);
    editRef.current.addEventListener("input", onSelectionChange);
    boxRef.current.addEventListener("mouseover", onMouseOver);
    boxRef.current.addEventListener("mousedown", onClickItem);
    return () => {
      cancelAnimationFrame(frameRef.current);
      if (editRef.current) {
        // document.removeEventListener("selectionchange", onSelectionChange);
        editRef.current.removeEventListener("input", onSelectionChange);
        editRef.current.removeEventListener("click", doFocus);
        editRef.current.removeEventListener("keydown", onKeyDown);
      }

      if (boxRef.current) {
        boxRef.current.removeEventListener("mousedown", onClickItem);
        boxRef.current.removeEventListener("mouseover", onMouseOver);
      }
    };
  }, [
    editRef,
    boxRef,
    frameRef,
    selectedIndex,
    currentValue,
    hasFocus,
    setRoute,
  ]);

  React.useLayoutEffect(() => {
    if (hasFocus) {
      editRef.current.querySelector("[contenteditable]").innerText =
        currentValue.current;
      setSelectedIndex(boxRef.current, 0, selectedIndex);
    }
  }, [currentValue, hasFocus, editRef, boxRef]);

  return (
    <div ref={editRef} className="AutoCompleteContainer">
      <QuoteLiteral />
      <AutoCompleter defaultValue={defaultValue} />
      <QuoteLiteral />

      {hasFocus && (
        <Portal>
          <AutoCompleteBox query={route} values={values} ref={boxRef} />
        </Portal>
      )}
    </div>
  );
};

const Unimportant = ({ children }) => (
  <span className="CodeBox-token CodeBox-token--unimportant">{children}</span>
);

function lineFocuser(event: React.SyntheticEvent<MouseEvent>) {
  const el = event.target as HTMLElement;

  const focusLine = el.closest(".CodeBox-line");
  if (focusLine) {
    const focusable = focusLine.querySelector("[data-focusable]");
    if (focusable && document.activeElement !== focusable) {
      focusable.focus();
    }
  }
}

export const PackageJSONEditor = ({
  pkg,
  folderName,
  values,
  onChange,
  defaultValue,
  onSave,
  hasChanged,
  propertyBinding = PropertyBindingType.router,
}: {
  pkg: PackageJSONFile;
  folderName: string;
  onChange: (value: string) => void;
  propertyBinding: PropertyBindingType;
}) => {
  const [isExpanded, setExpanded] = React.useState(false);
  if (!pkg.name) return null;

  return (
    <div className="CodeBox-container">
      <div className="CodeBox-heading">
        <div className={"CodeBox-filename"}>
          <Unimportant>{folderName}/</Unimportant>package.json
        </div>
      </div>

      <div onClick={lineFocuser} className="CodeBox">
        <div className="CodeBox-line CodeBox-Indent">
          <div className="Ellipsis">...</div>
        </div>

        <div className="CodeBox-line CodeBox-Indent">
          <StringKey name="run" />
          <OpeningBrace />
        </div>

        <div
          className={`CodeBox-line CodeBox-line--enabled ${
            !defaultValue ? "CodeBox-line--enabled--invalid" : ""
          } CodeBox-line--flex CodeBox-Indent CodeBox-Indent--2`}
        >
          <StringKey name="router" />

          <AutoCompletePropertyValue
            values={values}
            onChange={onChange}
            defaultValue={defaultValue}
          />
        </div>
        <div className="CodeBox-line CodeBox-Indent">
          <ClosingBrace />
        </div>

        <div className="CodeBox-line CodeBox-Indent">
          <div className="Ellipsis">...</div>
        </div>
      </div>

      <div className="CodeBox-heading CodeBox-heading--footer">
        <div
          onClick={hasChanged ? onSave : undefined}
          data-disabled={!hasChanged}
          className="CodeBox-action"
        >
          Save changes
        </div>
      </div>
    </div>
  );
};
