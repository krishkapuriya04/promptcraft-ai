import Editor from "@monaco-editor/react";

export default function MonacoEditorPanel({
  file,
  onChange,
  onMount,
  showMinimap,
  height = "540px",
}) {
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <Editor
        height={height}
        language={file?.language || "javascript"}
        value={file?.content || ""}
        onChange={onChange}
        onMount={onMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: showMinimap },
          fontSize: 13,
          lineNumbers: "on",
          wordWrap: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          formatOnPaste: true,
          formatOnType: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}
