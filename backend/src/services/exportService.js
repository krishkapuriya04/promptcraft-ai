const JSZip = require("jszip");
const AppError = require("../utils/AppError");
const { EXPORT_FORMATS } = require("../constants/exportFormats");
const {
  buildComponentFiles,
  buildHtmlFiles,
  buildJsonBackup,
  buildReactProjectFiles,
  safeProjectName,
} = require("../utils/exportTemplates");

function filterFiles(fileMap, selectedFiles = []) {
  if (!selectedFiles || selectedFiles.length === 0) return fileMap;
  const set = new Set(selectedFiles);
  return Object.fromEntries(Object.entries(fileMap).filter(([path]) => set.has(path)));
}

function selectExportFileMap(project, format) {
  switch (format) {
    case EXPORT_FORMATS.REACT_ZIP:
      return buildReactProjectFiles(project);
    case EXPORT_FORMATS.HTML_STATIC:
      return buildHtmlFiles(project);
    case EXPORT_FORMATS.SINGLE_COMPONENT:
      return buildComponentFiles(project);
    case EXPORT_FORMATS.JSON_BACKUP:
      return buildJsonBackup(project);
    default:
      throw new AppError("Unsupported export format.", 400, "VALIDATION_ERROR");
  }
}

async function createProjectArchive({ project, format, selectedFiles }) {
  const fileMap = filterFiles(selectExportFileMap(project, format), selectedFiles);
  if (Object.keys(fileMap).length === 0) {
    throw new AppError("No files selected for export.", 400, "VALIDATION_ERROR");
  }

  const zip = new JSZip();
  for (const [path, content] of Object.entries(fileMap)) {
    zip.file(path, content);
  }

  const buffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  const filename = `${safeProjectName(project.name)}-${format}.zip`;
  return { buffer, filename, files: Object.keys(fileMap) };
}

function listExportFiles(project) {
  return {
    [EXPORT_FORMATS.REACT_ZIP]: Object.keys(buildReactProjectFiles(project)),
    [EXPORT_FORMATS.HTML_STATIC]: Object.keys(buildHtmlFiles(project)),
    [EXPORT_FORMATS.SINGLE_COMPONENT]: Object.keys(buildComponentFiles(project)),
    [EXPORT_FORMATS.JSON_BACKUP]: Object.keys(buildJsonBackup(project)),
  };
}

module.exports = { createProjectArchive, listExportFiles };
