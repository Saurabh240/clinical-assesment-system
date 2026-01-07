export default function Placeholder({ title }) {
  return (
    <div className="rounded border border-dashed border-gray-300 bg-white p-10 text-center">
      <h2 className="mb-2 text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500">
        This page will be implemented in a future milestone.
      </p>
    </div>
  );
}
