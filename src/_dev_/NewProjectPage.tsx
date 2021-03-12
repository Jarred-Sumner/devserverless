import "src/lib/launchIdleWorker";
import "src/lib/injectServiceWorker";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Database } from "src/lib/Database";
import { InitialPackager } from "src/lib/InitialPackager";
import "./NewProjectPage.css";
import { getPackageID } from "./getPackageID";
import { Route, RouterType } from "src/lib/Route";
import { GearIcon } from "src/icons/GearIcon";
import {
  PackageJSONEditor,
  getRouteFilesForHandle,
} from "docs/PackageJSONEditor";
import { PackageJSONFile } from "src/lib/PackageJSON";
import { NativeFS } from "src/lib/router/fs-native";
import { filetypes } from "src/icons/filetypes/filetypes";
import * as path from "path-browserify";
import { StoredPackage } from "src/lib/StoredPackage";
import { ErrorCode } from "src/lib/ErrorCode";
import { hasGestured } from "src/_dev_/hasGestured";
import { renderPermissionError } from "src/_dev_/ErrorPage";
import { CreateReactAppGenerator } from "src/lib/generators/CreateReactAppGenerator";
import { Portal } from "react-portal";
const packager = new InitialPackager();

enum DirectoryLoadState {
  loading,
  loaded,
}

const pkgJSON = new PackageJSONFile();
const PackageContext = React.createContext({
  directory: null,
  packager,
  id: getPackageID(),
  setDirectory: () => {},
  pkgJSON,
  directoryLoadingState: DirectoryLoadState.loading,
} as {
  directory: FileSystemDirectoryHandle;
  packager: InitialPackager;
  id: string;
  setDirectory: (dir: FileSystemDirectoryHandle) => void;
  pkgJSON: PackageJSONFile;
  directoryLoadingState: DirectoryLoadState;
});

const PackageProvider = ({ children }) => {
  const [directory, _setDirectory] = React.useState(null);
  const [directoryLoadingState, setDirectoryLoadState] = React.useState(
    DirectoryLoadState.loading
  );
  const setDirectory = React.useCallback(
    async (dirHandle) => {
      // (globalThis["IDLE_WORKER"] as SharedWorker).port.postMessage(dirHandle);
      if (dirHandle) {
        try {
          pkgJSON.handle = await dirHandle.getFileHandle("package.json");
        } catch (exception) {
          alert("Could not find package.json in " + dirHandle.name);
          return;
        }

        pkgJSON.process(await (await pkgJSON.handle.getFile()).text());

        if (pkgJSON.run?.router) {
          const fs = new NativeFS(dirHandle);
          const staticHandle = await fs.resolveDirectoryHandle(
            pkgJSON.staticPath,
            fs.root
          );

          const record = StoredPackage.fromRecord({
            id: getPackageID(),
            lastBuild: null,
            handle: dirHandle,
            staticHandle,
            routerType: path.extname(pkgJSON.run.router)
              ? RouterType.spa
              : RouterType.filesystem,
          });
          if (packager.storedPackage) {
            Object.assign(packager.storedPackage, record);
            await packager.database.savePackage(packager.storedPackage);
          } else {
            const storedPackage = StoredPackage.fromRecord(record);
            await packager.database.savePackage(storedPackage);
            packager.storedPackage = storedPackage;
          }

          await packager.database.saveDir(dirHandle, pkgJSON.handle);
        }
      }

      _setDirectory(dirHandle);
      setDirectoryLoadState(DirectoryLoadState.loaded);
    },
    [_setDirectory, setDirectoryLoadState]
  );
  React.useEffect(() => {
    packager.database
      .loadDir()
      .then(async ({ directory: dir, pkgHandle } = {}) => {
        if (dir) {
          // (globalThis["IDLE_WORKER"] as SharedWorker).port.postMessage(dir);

          if (
            hasGestured() &&
            (await dir.queryPermission({ mode: "read" })) !== "granted"
          ) {
            const res = await dir.requestPermission({ mode: "read" });
            if (res === "denied") return null;
          }
        }

        pkgJSON.handle = pkgHandle;

        if (pkgJSON.handle) {
          pkgJSON.process(await (await pkgJSON.handle.getFile()).text());
        }
        return dir;
      })
      .then(
        (dir) => {
          if (dir) {
            _setDirectory(dir);
          }
          setDirectoryLoadState(DirectoryLoadState.loaded);
        },
        (e) => {
          console.error(e);
          setDirectoryLoadState(DirectoryLoadState.loaded);
        }
      );
  }, [setDirectoryLoadState, packager, _setDirectory, pkgJSON]);

  const contextValue = React.useMemo(
    () => ({
      packager,
      directory,
      setDirectory,
      pkgJSON,
      id: getPackageID(),
      directoryLoadingState,
    }),
    [packager, directory, setDirectory, getPackageID, directoryLoadingState]
  );

  return (
    <PackageContext.Provider value={contextValue}>
      {children}
    </PackageContext.Provider>
  );
};

const Title = ({ children }) => {
  return <div className="Title">{children}</div>;
};

const Monospace = ({ children }) => {
  return <span className="Monospace">{children}</span>;
};

const Highlight = ({ children }) => {
  return <span className="Highlight">{children}</span>;
};

const Instructions = ({ children }) => (
  <div className="Paragraph">{children}</div>
);

const Dropbox = ({ children, dragState, onClick }) => {
  return (
    <div onClick={onClick} className={`Dropbox ${DragStateClasses[dragState]}`}>
      <div className="Dropbox-background">
        <svg width="100%" height="100%">
          <rect x="0" y="0" width="100%" height="100%" r="20" />
        </svg>
      </div>
      <div className="Dropbox-foreground">{children}</div>
    </div>
  );
};

const HelpText = ({ children }) => <div className="HelpText">{children}</div>;

enum StatusLightLevel {
  unknown,
  verifying,
  built,
  error,
}
const StatusLightLevelClassNames = [
  "StatusLightLevel--unknown",
  "StatusLightLevel--verifying",
  "StatusLightLevel--building",
  "StatusLightLevel--error",
];
const StatusLight = ({ level }) => (
  <span className={`StatusLight ${StatusLightLevelClassNames[level]}`} />
);

const AttachFolderStep = ({ dragState, onClickDropbox }) => {
  return (
    <main className="NewProjectPage">
      <div className="TitleContainer">
        <StatusLight level={StatusLightLevel.unknown} />
        <div className="TitleGroup">
          <Title>
            Start <Monospace>{getPackageID()}</Monospace>
          </Title>
          <Instructions>
            Drag and drop a <Highlight>📂 folder</Highlight> with a{" "}
            <Monospace>package.json</Monospace> inside.
          </Instructions>
        </div>
      </div>

      <Dropbox onClick={onClickDropbox} dragState={dragState}>
        Drop folder with a package.json in here
      </Dropbox>

      <HelpText>
        Code with your local editor, and your dev server syncs automatically.
        There's nothing to install. There are no commands to run. Your code
        stays on your local computer.
      </HelpText>
      <Footer />
    </main>
  );
};

const Footer = () => {
  return (
    <div className="Footer">
      <div>
        {new Intl.DateTimeFormat(["lookup"], {
          dateStyle: "short",
          timeStyle: "long",
        }).format(new Date())}
      </div>

      <div>{getPackageID()}</div>
    </div>
  );
};

enum ProjectStep {
  attach,
  verifyFolder,
  config,
  ready,
  loadFolder,
  petitionMozilla, // https://github.com/mozilla/standards-positions/issues/154
  petitionWebkit, // https://lists.webkit.org/pipermail/webkit-dev/2020-August/031362.html,
}

const PetitionMozilla = ({}) => {
  // https://github.com/mozilla/standards-positions/issues/154
  return (
    <div className="Petition">
      <Title>Firefox doesn't support the Filesystem Access API</Title>

      <Instructions>
        In the meantime, you'll have to use a Chromium-based browser. Voice your
        support for the Filesystem Access API.
      </Instructions>

      <GitHubButton href="https://github.com/mozilla/standards-positions/issues/154">
        Petition Mozilla
      </GitHubButton>
    </div>
  );
};

const GitHubButton = ({ children, href }) => (
  <a href={href} target="_blank" rel="noopener" className="GitHubButton">
    {children}
  </a>
);

const TweetButton = ({ children, href }) => (
  <a href={href} target="_blank" rel="noopener" className="TweetButton">
    {children}
  </a>
);

const PetitionWebkit = ({}) => {
  // https://lists.webkit.org/pipermail/webkit-dev/2020-August/031362.html
  return (
    <div className="Petition">
      <Title>Apple won't let you do that.</Title>

      <Instructions>
        By{" "}
        <a
          target="_blank"
          rel="noopener"
          href="https://lists.webkit.org/pipermail/webkit-dev/2020-August/031362.html"
        >
          refusing
        </a>{" "}
        to support the filesystem access API, Apple is holding back the free and
        open internet.
      </Instructions>

      <Instructions>
        20% of Apple's revenue comes from Software &amp; Services. Apple's
        stance on the filesystem access API helps ensure a future where only
        software Apple can monetize runs on devices you own.
      </Instructions>

      <TweetButton>Tweet</TweetButton>
    </div>
  );
};

enum BrowserType {
  unknown,
  firefox,
  webkit,
}

enum DragState {
  none,
  drag,
  drop,
  success,
}

const DragStateClasses = [
  "DragState--none",
  "DragState--drag",
  "DragState--drop",
  "DragState--success",
];

const getBrowserType = () => {
  if (typeof InstallTrigger !== "undefined") return BrowserType.firefox;

  if (
    navigator?.userAgent?.toLowerCase()?.includes("webkit") &&
    !navigator?.userAgent?.toLowerCase()?.includes("chrome")
  )
    return BrowserType.webkit;

  return BrowserType.unknown;
};

const FileSystemRouteDescriptor = ({ router, values }) => {
  console.log(router, values);
  return null;
};

const EntryPoint = ({
  entryPoint,
  route,
}: {
  route: Route;
  entryPoint: string;
}) => {
  const IconComponent = filetypes[path.extname(entryPoint)];
  const [errorCode, setErrorCode] = React.useState(-1);

  React.useEffect(() => {
    let didClose = false;
    async function doesFileExist() {
      if (didClose) return;
      const doesExist = await route.root.exists(entryPoint);
      if (didClose) return;

      if (!doesExist) {
        setErrorCode(ErrorCode.missingEntryFiles);
      }
    }
    doesFileExist();
    return () => {
      didClose = true;
    };
  }, [route, entryPoint, setErrorCode]);

  return (
    <div
      className={`EntryPoint ${IconComponent ? "EntryPoint--withIcon" : ""} ${
        ErrorCode.missingEntryFiles === errorCode ? "EntryPoint--withError" : ""
      }`}
    >
      <div className="EntryPoint-icon">
        {IconComponent && <IconComponent width={24} height={24} />}
      </div>
      <div className="EntryPoint-label">{entryPoint}</div>
      {errorCode === ErrorCode.missingEntryFiles && (
        <div className="EntryPoint-error">Missing file</div>
      )}
    </div>
  );
};

const Lowercase = ({ children }) => (
  <span className="Lowercase">{children}</span>
);

const SPARouteDescriptor = ({
  router: { handle, value: filepath, icon },
  values: tree,
}) => {
  const route = React.useRef<Route>();
  const { directory } = React.useContext(PackageContext);
  const [entryPoints, setEntryPoints] = React.useState([]);
  const [errorCode, setErrorCode] = React.useState<ErrorCode>(-1);

  React.useEffect(() => {
    let didCancel = false;
    if (!route.current) {
      route.current = Route.from(new NativeFS(directory), filepath);
    }

    async function load() {
      if (didCancel) return;

      const _route = route.current;
      await _route.generateConfig(await handle.getFile());
      setEntryPoints(_route.entryPoints);
    }

    load();

    return () => {
      didCancel = true;
    };
  }, [route, handle, filepath, setEntryPoints, directory]);

  const entryPointViews = new Array(entryPoints.length);
  for (let i = 0; i < entryPointViews.length; i++) {
    entryPointViews[i] = (
      <EntryPoint
        entryPoint={entryPoints[i]}
        key={entryPoints[i] + (route?.current?.absWorkingDirectory ?? "")}
        route={route.current}
      />
    );
  }

  return (
    <div className="SPARouteDescriptor">
      <a href="/" target="_blank" className="Section-label Section-label--url">
        <span className="Section-label--url-indicator">{location.origin}/</span>
        *
      </a>
      <div className="Routing-explanation">
        Navigation requests route to&nbsp;
        <Monospace>{filepath}</Monospace>. Open any url in {location.origin}/
        from your browser to bundle &amp; render.
      </div>

      <div className="Section-label Section-label--level-2">
        Entry points{" "}
        <Lowercase>
          <Monospace>&lt;script&gt;</Monospace> &amp;{" "}
          <Monospace>&lt;link&gt;</Monospace> in{" "}
          <Monospace>{filepath}</Monospace>
        </Lowercase>
      </div>

      <div className="EntryPointList">{entryPointViews}</div>
    </div>
  );
};

const NewProjectPage = () => {
  const [step, setStep] = React.useState(() =>
    location.pathname.endsWith("/setup")
      ? ProjectStep.attach
      : ProjectStep.verifyFolder
  );
  const {
    directory,
    directoryLoadingState,
    packager,
    pkgJSON,
    id,
    setDirectory: _setDirectory,
  } = React.useContext(PackageContext);
  const [dragState, setDragState] = React.useState(DragState.none);

  React.useEffect(() => {
    function onPopState(event: PopStateEvent) {
      const question = location.pathname.indexOf("?");
      switch (
        location.pathname.substring(0, question > -1 ? question : undefined)
      ) {
        case "/_dev_/config": {
          setStep(ProjectStep.verifyFolder);
          break;
        }
        case "/_dev_/setup": {
          setStep(ProjectStep.attach);
          break;
        }

        default: {
          location.reload();
        }
      }
    }

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [setStep]);

  const setDirectory = React.useCallback(
    async (handle: FileSystemDirectoryHandle) => {
      try {
        const file = await handle.getFileHandle("package.json");
        if (!file) return false;
        pkgJSON.process(await (await file.getFile()).text());
      } catch (exception) {
        console.error(exception);
        alert(
          "Please choose a folder with a valid package.json inside. More specific exception is in the console"
        );
        return false;
      }

      _setDirectory(handle);
      setStep(ProjectStep.verifyFolder);
      return true;
    },
    [_setDirectory, setStep, pkgJSON]
  );

  const handleClick = React.useCallback(
    async (evt) => {
      evt.preventDefault();
      if (typeof window.showDirectoryPicker !== "function") {
        switch (getBrowserType()) {
          case BrowserType.firefox: {
            setStep(ProjectStep.petitionMozilla);
            break;
          }
          case BrowserType.webkit: {
            setStep(ProjectStep.petitionWebkit);
            break;
          }

          default: {
            alert(
              "Your browser doesn't support the Filesystem Access API. Sorry."
            );
          }
        }
        return;
      }
      const handle = await window.showDirectoryPicker();
      await navigator.storage.persist();
      if (await setDirectory(handle)) {
        history.pushState({}, document.title, "/_dev_/config");
      }
    },
    [setDirectory, setStep]
  );

  React.useLayoutEffect(() => {
    const onDragOver = (e) => {
      setDragState(DragState.drag);
      e.preventDefault();
    };

    const onDragEnd = (e) => {
      setDragState(DragState.none);
    };

    document.body.addEventListener("dragover", onDragOver);
    document.body.addEventListener("dragend", onDragEnd);
    document.body.addEventListener("dragleave", onDragEnd);
    document.body.addEventListener("dragexit", onDragEnd);
    return () => {
      document.body.removeEventListener("dragover", onDragOver);
      document.body.removeEventListener("dragend", onDragEnd);
      document.body.removeEventListener("dragleave", onDragEnd);
      document.body.removeEventListener("dragexit", onDragEnd);
    };
  }, [setDragState]);

  React.useLayoutEffect(() => {
    const onDrop = async (e) => {
      e.preventDefault();

      let filesCount = 0;
      let directory;
      for (const item of e.dataTransfer.items) {
        // Careful: `kind` will be 'file' for both file
        // _and_ directory entries.
        if (item.kind === "file") {
          if (!item.getAsFileSystemHandle) {
            switch (getBrowserType()) {
              case BrowserType.firefox: {
                setDragState(DragState.none);
                setStep(ProjectStep.petitionMozilla);
                break;
              }
              case BrowserType.webkit: {
                setDragState(DragState.none);
                setStep(ProjectStep.petitionWebkit);
                break;
              }

              default: {
                alert(
                  "Your browser doesn't support the Filesystem Access API. Sorry."
                );
              }
            }

            return;
          }

          const entry = await item.getAsFileSystemHandle();

          if (entry.kind === "directory") {
            directory = entry;
          } else {
            setDragState(DragState.none);
            alert(
              "Please drop the folder instead of files in the folder (it needs folder access)"
            );
            return;
          }
        }

        if (directory) {
          setDirectory(directory);
          setDragState(DragState.success);
        }
      }
    };

    document.body.addEventListener("drop", onDrop);
    return () => {
      document.body.removeEventListener("drop", onDrop);
    };
  }, [setDirectory, setStep, setDragState]);

  switch (step) {
    case ProjectStep.attach: {
      return (
        <AttachFolderStep dragState={dragState} onClickDropbox={handleClick} />
      );
    }

    case ProjectStep.petitionMozilla: {
      return <PetitionMozilla />;
    }

    case ProjectStep.petitionWebkit: {
      return <PetitionWebkit />;
    }

    case ProjectStep.verifyFolder: {
      return <VerifyFolder packager={packager} directory={directory} />;
    }
  }
};

enum GeneratorModalState {
  pending,
  checking,
  visible,
  dismissed,
}

const RoutingSection = ({}) => {
  const { directory, directoryLoadingState, pkgJSON } = React.useContext(
    PackageContext
  );

  const [generatorModal, setGeneratorModalState] = React.useState(
    !localStorage["hasDismissedCRA"]
      ? GeneratorModalState.pending
      : GeneratorModalState.dismissed
  );

  const [route, setRoute] = React.useState(() => {
    if (pkgJSON?.run?.router) {
      return pkgJSON?.run?.router;
    } else {
      return "";
    }
  });
  const [savedRoute, setSavedRoute] = React.useState(route);

  React.useEffect(() => {
    if (directoryLoadingState === DirectoryLoadState.loaded) {
      const _route = pkgJSON?.run?.router ?? "";
      setRoute(_route);
      setSavedRoute(_route);

      if (directory && pkgJSON && !_route) {
        setGeneratorModalState((state) => {
          if (
            state === GeneratorModalState.dismissed ||
            state === GeneratorModalState.checking ||
            state === GeneratorModalState.visible
          ) {
            return state;
          }

          return GeneratorModalState.checking;
        });
      }
    }
  }, [
    directoryLoadingState,
    pkgJSON,
    directory,
    setRoute,
    setSavedRoute,
    setGeneratorModalState,
  ]);

  React.useEffect(() => {
    if (
      !pkgJSON?.run?.router?.length &&
      directoryLoadingState === DirectoryLoadState.loaded &&
      directory
    ) {
      setGeneratorModalState((state) => {
        switch (state) {
          case GeneratorModalState.dismissed: {
            return state;
          }

          case GeneratorModalState.visible: {
            return state;
          }

          case GeneratorModalState.checking:
          case GeneratorModalState.pending: {
            CreateReactAppGenerator.isGeneratable(directory, pkgJSON).then(
              (isGeneratable) => {
                setGeneratorModalState((state) => {
                  if (isGeneratable && state === GeneratorModalState.checking) {
                    return GeneratorModalState.visible;
                  } else {
                    return GeneratorModalState.dismissed;
                  }
                });
              },
              console.error
            );

            return GeneratorModalState.checking;
          }
        }
      });
    }
  }, [
    setGeneratorModalState,
    pkgJSON?.run?.router,
    directoryLoadingState,
    directory,
    directory?.name,
  ]);

  const onCloseModal = async (confirm: boolean) => {
    try {
      if (confirm) {
        await CreateReactAppGenerator.run(
          directory,
          pkgJSON,
          packager.database
        );
        location.pathname = "/";
      }
    } catch (exception) {
      console.error(exception);
      alert("That didn't work. Check the console for more details");
    } finally {
      setGeneratorModalState(GeneratorModalState.dismissed);
    }

    if (!confirm) {
      localStorage["hasDismissedCRA"] = true;
    }
  };

  const [values, setValues] = React.useState([]);
  const routeValue = React.useMemo(() => {
    for (let value of values) {
      if (value.value === route) {
        return value;
      }
    }
    return null;
  }, [route, values]);

  const staticHandle = React.useMemo(() => {
    if (!routeValue) return;
    const _route = routeValue.value;

    if (_route.endsWith("/")) {
      return routeValue.handle;
    }

    const parentDir = path.join(_route, "../");
    for (let v of values) {
      if (v.value === parentDir) {
        return v.handle;
      }
    }

    return null;
  }, [routeValue, values]);

  const routeType = React.useMemo(() => {
    if (routeValue) {
      switch (routeValue.handle.kind) {
        case "file": {
          return RouterType.spa;
        }

        case "directory": {
          return RouterType.filesystem;
        }
      }
    }

    return RouterType.unknown;
  }, [routeValue]);

  React.useEffect(() => {
    async function loadValues() {
      try {
        const list = await getRouteFilesForHandle(directory);
        setValues(list);
      } catch (exception) {
        if (
          typeof exception === "object" &&
          exception instanceof DOMException
        ) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "/_dev_/ErrorPage.css";
          document.head.appendChild(link);
          link.addEventListener("load", () => {
            document.body.innerHTML = renderPermissionError(directory.name);

            document
              .querySelector("#button")
              .addEventListener("click", async () => {
                await directory.requestPermission({ mode: "read" });
                location.pathname = location.pathname;
              });
          });
        }
      }
    }

    if (directory) {
      loadValues();
    }
  }, [setValues, directory, getRouteFilesForHandle]);

  let routeDescriptor;

  switch (routeType) {
    case RouterType.filesystem: {
      routeDescriptor = (
        <FileSystemRouteDescriptor router={routeValue} values={values} />
      );
      break;
    }

    case RouterType.spa: {
      routeDescriptor = (
        <SPARouteDescriptor router={routeValue} values={values} />
      );
      break;
    }

    default: {
    }
  }

  const handleSave = async () => {
    if (pkgJSON.run) {
      pkgJSON.run.router = route;
      pkgJSON.run.isRouterUnset = false;
    } else {
      pkgJSON.run = { router: route, isRouterUnset: false };
    }
    setSavedRoute(pkgJSON.run.router);

    if (!pkgJSON.handle) {
      pkgJSON.handle = await directory.getFileHandle("package.json");
    }
    await pkgJSON.handle.requestPermission({ mode: "readwrite" });
    await pkgJSON.save();
    const record = StoredPackage.fromRecord({
      id: getPackageID(),
      lastBuild: null,
      handle: directory,
      staticHandle,
      routerType:
        path.extname(pkgJSON.run.router) === ".html"
          ? RouterType.spa
          : RouterType.filesystem,
    });
    if (packager.storedPackage) {
      Object.assign(packager.storedPackage, record);
      await packager.database.savePackage(packager.storedPackage);
    } else {
      const storedPackage = StoredPackage.fromRecord(record);
      await packager.database.savePackage(storedPackage);
      packager.storedPackage = storedPackage;
    }
  };

  return (
    <>
      <section className="Section Routing">
        <PackageJSONEditor
          pkg={pkgJSON}
          key={savedRoute}
          values={values}
          onChange={setRoute}
          onSave={handleSave}
          hasChanged={route && route !== savedRoute}
          defaultValue={route}
          folderName={directory?.name ?? "Loading..."}
        />

        {routeDescriptor}
      </section>
      {generatorModal === GeneratorModalState.visible && (
        <Portal>
          <div className="GeneratorModal-container">
            <div className="GeneratorModal">
              <div className="GeneratorModal-title">
                Auto-configure as Create React App?
              </div>
              <div className="GeneratorModal-buttons">
                <div
                  onClick={() => onCloseModal(false)}
                  className="GeneratorModal-button GeneratorModal-button--cancel"
                >
                  No
                </div>

                <div
                  onClick={() => onCloseModal(true)}
                  className="GeneratorModal-button GeneratorModal-button--confirm"
                >
                  Yes
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

const VerifyFolder = ({}) => {
  const { directoryLoadingState, directory } = React.useContext(PackageContext);
  return (
    <main className="NewProjectPage">
      <div className="TitleContainer">
        <GearIcon
          width={64}
          height={64}
          fill="white"
          stroke="rgb(64, 2, 209)"
        />

        <div className="TitleGroup">
          <Title>Configure dev server</Title>
          <Instructions>
            Your configuration will save to <Monospace>package.json</Monospace>
          </Instructions>
        </div>
      </div>

      <RoutingSection />

      <Footer />
    </main>
  );
};

export const Page = () => {
  return (
    <PackageProvider>
      <NewProjectPage />
    </PackageProvider>
  );
};

export function render() {
  ReactDOM.render(<Page />, document.body.querySelector("#root"));
}

window.addEventListener("unhandledRejection", console.error);
