import type {
  ESBuildPackage,
  PackagerError,
  PackagerPermissionError,
} from "src/lib/ESBuildPackage";
import { ErrorCode } from "src/lib/ErrorCode";
import REQUEST_PERMISSION_ERROR from "src/_dev_/inline/requestPermissionRunner.jsinline";
import type { BuildFailure, Location, Message, Note } from "esbuild";
import { IDLE_WORKER_CODE } from "src/htmlGenerator";
import { getPackageID } from "src/_dev_/getPackageID";

const MESSAGE = {
  [ErrorCode.invalidPackageJSON]: "package.json invalid or missing?",
  [ErrorCode.emptyDir]: "The folder is empty.",
  [ErrorCode.missingEntryFiles]: "There are missing entry points",
  [ErrorCode.missing]: "Something is missing. Hopefully I write better copy.",
  [ErrorCode.errorFetchingPackageJSON]: "errorFetchingPackageJSON",
  [ErrorCode.errorGettingPackageJSONFile]: "errorGettingPackageJSONFile",
  [ErrorCode.parsingPackageJSON]: "package.json has a syntax error?",
  [ErrorCode.requirePermission]: "Please enable filesystem access.",
  [ErrorCode.noEntryPoints]: "Missing entry points",
  [ErrorCode.resolveFile]: "404 - File not found.",
  [ErrorCode.fileNotFound]: "404 - File not found.",
  [ErrorCode.fileAccessDenied]: "Filesystem access denied.",
  [ErrorCode.buildFailed]: "Build Error",
};

function renderLocation(location: Location, relative: string = "/") {
  return `<div class="__DevServer__Error-location"><span class="strong">${location.file}</span>:${location.line}:${location.column}</div>`;
}

function renderESBuildNote(note: Note) {
  if (note.text && !note.location) {
    return `<div class="__DevServer__ErrorPage-note-title">${note.text}</div>`;
  } else if (note.text) {
    return `<div class="__DevServer__ErrorPage-note-title">${
      note.text
    }</div> ${renderLocation(note.location)}`;
  } else {
    return renderLocation(note.location);
  }
}

function renderHighlightLine(location: Location, maxLine: number) {
  let content = location.lineText;
  return `${renderLineNumber(
    location.line,
    maxLine,
    true
  )}<div class="__DevServer__Error-line __DevServer__Error-line--highlight">${
    content.slice(0, location.column - 1) +
    `<span class="strong--caret">${content[location.column - 1]}</span>` +
    content.slice(location.column)
  }</div>`;
}

function renderLine(line: string) {
  return `<div class="__DevServer__Error-line ${
    line.trim().length === 0 ? "__DevServer__Error-line--empty" : ""
  }">${line}</div>`;
}

function renderLineNumber(
  line: number,
  max: number,
  highlight: boolean = false
) {
  return `<div class="__DevServer__Error-lineNumber ${
    highlight ? "__DevServer__Error-lineNumber--highlight" : ""
  }">${line.toString(10).padStart(max.toString(10).length, " ")}</div>`;
}

function renderLineWithNumber(
  line: string,
  lineNumber: number,
  maxLine: number
) {
  return `
    ${renderLineNumber(lineNumber, maxLine)}
    ${renderLine(line)}
  `;
}
async function renderESBuildError(
  error: Message,
  build?: ESBuildPackage,
  index: number
) {
  let body = `
  <div class="__DevServer__Error">
  <div class="__DevServer__Error-text ${
    !error.location ? "__DevServer__Error-text--no-location" : ""
  }">${
    error.text?.replace("[devserverless]", "")?.trim() ?? "Error"
  }<span class="__DevServer__Error-text-number">${index + 1}</span></div>
`;

  let lines: string[];

  if (error.location) {
    if (build) {
      try {
        let file = await build.getFileForLocation(error.location);
        if (file) {
          lines = escape(await file.text()).split("\n");
        }
      } catch (exception) {
        console.error(exception);
      }
    }

    body += renderLocation(error.location, build?.id + "/");
    let WIGGLE_ROOM = 6;
    const maxLine = Math.min(
      error.location.line + WIGGLE_ROOM,
      lines.length - 1
    );
    body += `<div class="__DevServer__Error-sourceCode">`;
    if (lines) {
      for (
        let i = Math.max(error.location.line - WIGGLE_ROOM, 0);
        i > -1 && i < error.location.line - 1;
        i++
      ) {
        body += renderLineWithNumber(lines[i], i + 1, maxLine);
      }
    }

    body += renderHighlightLine(error.location, maxLine);

    if (lines) {
      for (
        let i = error.location.line + 1;
        i < lines.length && i < error.location.line + WIGGLE_ROOM;
        i++
      ) {
        body += renderLineWithNumber(lines[i], i, maxLine);
      }
    }
    body += `</div>`;
  }

  if (error.notes?.length) {
    body += error.notes.map(renderESBuildNote).join("\n");
  }

  body += "</div>";

  return body;
}

export function renderPermissionError(directoryName: string) {
  return `<div class="__DevServer__ErrorPage">
<div class="__DevServer__ErrorPage-modal">
  <div class="__DevServer__ErrorPage-heading">
    PERMISSIONS REQUEST
  </div>
  <div class="__DevServer__ErrorPage-title __DevServer__ErrorPage-title--no-y">
    Allow DevServer to read <span class="__DevServer_Mono">${directoryName}</span>?
  </div>
  <div class="__DevServer__ErrorPage-subtitle">
    DevServer uses the filesystem API to compile, bundle, serve assets.
  </div>
  <div class="__DevServer__ErrorPage-button" id="button">Allow access</div>


  <div class="__DevServer__ErrorPage-footer">
    <div>
      ${new Intl.DateTimeFormat(["lookup"], {
        dateStyle: "short",
        timeStyle: "long",
      }).format(new Date())}
    </div>

    <div>
    ${directoryName}
    </div>
  </div>
</div>
<div class="__DevServer__ErrorPage-footerText">If you see this often, <a target="_blank" href="/_dev_/config">keep a separate tab open</a>.</div>
</div>
<script module type="application/javascript">
globalThis.HANDLE_ID = "${directoryName}";
${REQUEST_PERMISSION_ERROR}
</script>`;
}

export async function buildError(error: PackagerError) {
  switch (error.code) {
    case ErrorCode.requirePermission: {
      let _error = error as PackagerPermissionError;
      return renderPermissionError(_error.directoryName);
      break;
    }
    case ErrorCode.buildFailed: {
      let _error = error as PackagerError & BuildFailure;
      let renderCount = _error.errors.length;

      let errorText = "";
      for (let i = 0; i < renderCount; i++) {
        errorText += await renderESBuildError(_error.errors[i], error.build, i);
      }

      return `<div class="__DevServer__ErrorPage">
      <div class="__DevServer__ErrorPage-modal">
        <div class="__DevServer__ErrorPage-heading">
          Build failed with ${_error.errors.length} errors
        </div>

        ${errorText}

        <div class="__DevServer__ErrorPage-footer">
            <div>
            ${new Intl.DateTimeFormat(["lookup"], {
              dateStyle: "short",
              timeStyle: "long",
            }).format(new Date())}
            </div>

            <div>
            ${getPackageID()}
            </div>
          </div>
      </div>
      <a class="__DevServer__ErrorPage-footerText" target="_blank" href="/_dev_/config">Configure devserver</a>
    </div>`;
      break;
    }
    default: {
      return `<div class="__DevServer__ErrorPage">
        <div class="__DevServer__ErrorPage-modal">
          <div class="__DevServer__ErrorPage-heading">
            ${MESSAGE[error.code] || ErrorCode[error.code]} (${error.code})
          </div>
          <div class="__DevServer__ErrorPage-title">${error.name.replace(
            "[devserverless] ",
            ""
          )}</div>

          <div class="__DevServer__ErrorPage-body">${error.message}</div>
        </div>
        <a class="__DevServer__ErrorPage-footerText" target="_blank" href="/_dev_/config">Configure devserver</a>
    </div>`;
    }
  }
}

export async function renderRuntimeError(error: Error) {
  //   return `
  // <link href="/_dev_/ErrorPage.css" rel="stylesheet" />
  // <div class="__DevServer__Error">
  // <div class="__DevServer__Error-text ${
  //     !error.location ? "__DevServer__Error-text--no-location" : ""
  //   }">${error.text
  //     .replace("[devserverless]", "")
  //     .trim()}<span class="__DevServer__Error-text-number">${
  //     index + 1
  //   }</span></div>
  // `;
}

export async function renderPackagerError(error) {
  try {
    return `<!DOCTYPE html><html><head><script module>${IDLE_WORKER_CODE}</script><link href="/_dev_/ErrorPage.css" rel="stylesheet" /></head><body>${await buildError(
      error
    )}</body></html>`;
  } catch (exception) {
    console.error("Error building the error page...lol", exception);
    return `${error.name.replace("[devserverless]", "")} - ${error.message}`;
  }
}

export async function injectRenderPackagerError(error) {
  return [
    `<script type="module" module>${IDLE_WORKER_CODE}</script>`,
    ``,
    await buildError(error),
  ];
}
