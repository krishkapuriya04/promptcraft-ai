import Button from "../common/Button";

export default function DownloadButton({ onClick, isLoading, label = "Export & Download" }) {
  return (
    <Button onClick={onClick} isLoading={isLoading} disabled={isLoading} className="w-full" size="lg">
      {isLoading ? "Exporting..." : label}
    </Button>
  );
}
