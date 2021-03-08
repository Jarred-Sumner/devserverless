import type {
  ESBuildPackage,
  PackagerError,
  PackagerPermissionError,
} from "src/lib/ESBuildPackage";
import { ErrorCode } from "src/lib/ErrorCode";
import CSS_FILE from "./ErrorPage.css";
import REQUEST_PERMISSION_ERROR from "dist/requestPermissionRunner.jsfile";
import { BuildFailure, Location, Message, Note } from "esbuild";
import { IDLE_WORKER_CODE } from "src/htmlGenerator";

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
  return `<div class="__DevServer__Error-location"><span class="strong">${relative}${location.file}</span>:${location.line}:${location.column}</div>`;
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
  }">${error.text}<span class="__DevServer__Error-text-number">${
    index + 1
  }</span></div>
`;

  let lines: string[];

  if (error.location) {
    if (build) {
      try {
        let file = await build.getFileForLocation(error.location);
        lines = (await file.text()).split("\n");
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
export async function buildError(error: PackagerError) {
  switch (error.code) {
    case ErrorCode.requirePermission: {
      let _error = error as PackagerPermissionError;
      return `
      <div class="__DevServer__ErrorPage">
        <div class="__DevServer__ErrorPage-modal">
          <div class="__DevServer__ErrorPage-heading">
            PERMISSIONS REQUEST
          </div>
          <div class="__DevServer__ErrorPage-title __DevServer__ErrorPage-title--no-y">
            Allow DevServer to read <span class="__DevServer_Mono">${
              _error.directoryName
            }</span>?
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
            ${_error.directoryName}
            </div>
          </div>
    </div>
  </div>
    <script module type="application/javascript">
      globalThis.HANDLE_ID = "${_error.directoryName}";
      ${REQUEST_PERMISSION_ERROR}
    </script>
      `;
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
          ${error.build?.id}
          </div>
        </div>
      </div>
    </div>`;
      break;
    }
    default: {
      return `<div class="__DevServer__ErrorPage">
        <div class="__DevServer__ErrorPage-modal">
        <div class="__DevServer__ErrorPage-heading">
          ${MESSAGE[error.code] || ErrorCode[error.code]}
        </div>
        <div class="__DevServer__ErrorPage-title">${error.name}</div>

        <div class="__DevServer__ErrorPage-body">${error.message}</div>
        </div>
    </div>`;
    }
  }
}

export async function renderPackagerError(error) {
  return `<!DOCTYPE html><html><head><script>${IDLE_WORKER_CODE}</script><style>${CSS_FILE}</style></head><body>${await buildError(
    error
  )}</body></html>`;
}

export async function injectRenderPackagerError(error) {
  return [
    `<script module>${IDLE_WORKER_CODE}</script`,
    `<style>${CSS_FILE}</style>`,
    await buildError(error),
  ];
}
