export const EXPORT_FORMATS = {
  REACT_ZIP: "react-zip",
  HTML_STATIC: "html-static",
  SINGLE_COMPONENT: "single-component",
  JSON_BACKUP: "json-backup",
  COPY_FULL_CODE: "copy-full-code",
};

export const EXPORT_OPTION_CARDS = [
  {
    id: EXPORT_FORMATS.REACT_ZIP,
    title: "React Project ZIP",
    description: "Deploy-ready React + Tailwind + Vite project structure.",
  },
  {
    id: EXPORT_FORMATS.HTML_STATIC,
    title: "HTML/CSS Static Export",
    description: "Static index export for simple hosting workflows.",
  },
  {
    id: EXPORT_FORMATS.SINGLE_COMPONENT,
    title: "Single Component Export",
    description: "Download generated React component as ZIP.",
  },
  {
    id: EXPORT_FORMATS.JSON_BACKUP,
    title: "JSON Project Backup",
    description: "Portable JSON backup of project metadata and code.",
  },
  {
    id: EXPORT_FORMATS.COPY_FULL_CODE,
    title: "Copy Full Code",
    description: "Copy the latest generated/editable code to clipboard.",
  },
];
