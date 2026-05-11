const MAX_VERSION_HISTORY = 80;

function summarizeDiff(beforeCode = "", afterCode = "") {
  const beforeLines = beforeCode.split("\n");
  const afterLines = afterCode.split("\n");
  const max = Math.max(beforeLines.length, afterLines.length);
  let changedLines = 0;

  for (let index = 0; index < max; index += 1) {
    if ((beforeLines[index] || "") !== (afterLines[index] || "")) {
      changedLines += 1;
    }
  }

  return `Updated ${changedLines} line${changedLines === 1 ? "" : "s"} (${beforeLines.length} -> ${afterLines.length} total lines).`;
}

function shouldCreateSnapshot(previousCode = "", nextCode = "") {
  return previousCode.trim() !== nextCode.trim();
}

function createVersionSnapshot({
  code,
  summary,
  label = "",
  note = "",
  isCheckpoint = false,
  isFavorite = false,
}) {
  return {
    code,
    summary,
    label,
    note,
    isCheckpoint,
    isFavorite,
    createdAt: new Date(),
  };
}

function pruneVersions(versions = []) {
  return versions.slice(0, MAX_VERSION_HISTORY);
}

module.exports = {
  MAX_VERSION_HISTORY,
  summarizeDiff,
  shouldCreateSnapshot,
  createVersionSnapshot,
  pruneVersions,
};
