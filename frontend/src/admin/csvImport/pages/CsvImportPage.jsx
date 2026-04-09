import CsvUploadCard from "../components/CsvUploadCard";
import ImportResultSummary from "../components/ImportResultSummary";
import RowErrorTable from "../components/RowErrorTable";
import { useCsvImport } from "../hooks/useCsvImport";
import CsvImportHeader from "../components/CsvImportHeader";
import CsvFormatHint from "../components/CsvFormatHint";

const CsvImportPage = () => {
  const {
    result,
    error,
    uploadFile,
    resetImport,
  } = useCsvImport();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      <CsvImportHeader />

      {/* Template download + column reference */}
      <CsvFormatHint />

      {/* File drop + upload button */}
      <CsvUploadCard
        onUpload={async (file) => {
          await uploadFile(file);
        }}
      />

      {/* API / network error */}
      {error && (
        <div className="p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <>
          <ImportResultSummary result={result} />

          {/* Backend returns rows[] — filter to only error rows inside RowErrorTable */}
          <RowErrorTable errors={result?.rows || []} />

          <div className="text-right">
            <button
              onClick={resetImport}
              className="px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Import Another File
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CsvImportPage;