import Select from "../ui/Select";

export default function AilmentSelect({
  ailments,
  value,
  onChange,
  loading,
}) {
  return (
    <Select
      label="Select Ailment"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
    >
      <option value="">-- Select Ailment --</option>

      {ailments.map((a) => (
        <option key={a.code} value={a.code}>
          {a.name}
        </option>
      ))}
    </Select>
  );
}
