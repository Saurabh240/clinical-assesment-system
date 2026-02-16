

import CustomSelect from "../ui/Select";

export default function AilmentSelect({
  ailments,
  value,
  onChange,
  loading,
}) {
  return (
    <CustomSelect
      label="Select Ailment"
      value={value}
      onChange={onChange}   
      disabled={loading}
     options={Array.isArray(ailments)
  ? ailments.map((a) => ({
      label: a.name,
      value: a.code,
    }))
  : []
}

      placeholder="-- Select Ailment --"
    />
  );
}
