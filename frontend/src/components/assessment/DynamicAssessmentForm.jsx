import { useState } from "react";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default function DynamicAssessmentForm({ config, onSubmit, submitting = false }) {
  if (!config || !Array.isArray(config.sections)) {
    console.error("Invalid config:", config);
    return null;
  }

  // ─── Key helpers ────────────────────────────────────────────────────────────
  //
  // Field keys follow the pattern  "<sectionId>.<remainingPath>"
  //   e.g.  "assessment.notes"                       → remainingPath = "notes"
  //         "ailment.clinicalBlock.symptoms.dysuria" → remainingPath = "clinicalBlock.symptoms.dysuria"
  //
  // We keep state flat per section using the full remainingPath as the key so
  // every field is uniquely addressable:
  //
  //   values["ailment"]["clinicalBlock.symptoms.dysuria"] = true
  //   values["ailment"]["clinicalBlock.symptoms.frequency"] = false
  //
  // On submit we deep-build the nested object expected by Thymeleaf.

  /**
   * Strip the leading section prefix from a field key.
   * "ailment.clinicalBlock.symptoms.dysuria" → "clinicalBlock.symptoms.dysuria"
   * "assessment.notes"                       → "notes"
   */
  const getFieldPath = (sectionId, fieldKey) => {
    const prefix = sectionId + ".";
    return fieldKey.startsWith(prefix) ? fieldKey.slice(prefix.length) : fieldKey;
  };

  /**
   * Set a value at an arbitrary dotted path inside an object, creating
   * intermediate objects as needed.
   *
   *   setNested({}, "clinicalBlock.symptoms.dysuria", true)
   *   → { clinicalBlock: { symptoms: { dysuria: true } } }
   */
  const setNested = (obj, path, value) => {
    const parts = path.split(".");
    const result = { ...obj };
    let cursor = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      cursor[part] = cursor[part] ? { ...cursor[part] } : {};
      cursor = cursor[part];
    }
    cursor[parts[parts.length - 1]] = value;
    return result;
  };

  /**
   * Build the deeply-nested output object from the flat state map for one section.
   *
   *   flatSection = { "clinicalBlock.symptoms.dysuria": true, "code": "UTI" }
   *   → { clinicalBlock: { symptoms: { dysuria: true } }, code: "UTI" }
   */
  const buildNestedSection = (flatSection) => {
    let result = {};
    for (const [path, value] of Object.entries(flatSection)) {
      result = setNested(result, path, value);
    }
    return result;
  };

  // ─── State initialisation ────────────────────────────────────────────────────
  const [values, setValues] = useState(() => {
    const initial = {};
    config.sections.forEach((section) => {
      const sectionId = section.id || section.key;
      if (!sectionId) { console.error("Section missing id/key:", section); return; }

      initial[sectionId] = {};
      section.fields.forEach((field) => {
        const path = getFieldPath(sectionId, field.key);
        initial[sectionId][path] =
          field.defaultValue ??
          field.default ??
          (field.type === "boolean" ? false : null);
      });
    });
    return initial;
  });

  const [errors, setErrors] = useState({});

  // ─── Change handler ──────────────────────────────────────────────────────────
  const handleChange = (sectionId, fieldPath, value) => {
    setValues((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [fieldPath]: value },
    }));
    const errKey = `${sectionId}.${fieldPath}`;
    if (errors[errKey]) {
      setErrors((prev) => { const next = { ...prev }; delete next[errKey]; return next; });
    }
  };

  // ─── Validation ──────────────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors = {};
    config.sections.forEach((section) => {
      const sectionId = section.id || section.key;
      section.fields.forEach((field) => {
        const path = getFieldPath(sectionId, field.key);
        const value = values[sectionId]?.[path];
        if (field.required && (value === null || value === "" || value === undefined)) {
          newErrors[`${sectionId}.${path}`] = `${field.label || path} is required`;
        }
      });
    });
    return newErrors;
  };

  // ─── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      return setErrors(validationErrors);
    }

    // Convert every section's flat map → properly nested object
    const nestedOutput = {};
    for (const [sectionId, flatSection] of Object.entries(values)) {
      nestedOutput[sectionId] = buildNestedSection(flatSection);
    }

    onSubmit(nestedOutput);
  };

  // ─── Field renderer ──────────────────────────────────────────────────────────
  const renderField = (sectionId, field) => {
    const path  = getFieldPath(sectionId, field.key);
    const label = field.label || path;
    const value = values[sectionId]?.[path];
    const error = errors[`${sectionId}.${path}`];

    switch (field.type) {
      case "boolean":
        return (
          <Checkbox
            label={label}
            checked={!!value}
            required={field.required}
            onChange={(v) => handleChange(sectionId, path, v)}
            error={error}
          />
        );

      case "date":
        return (
          <Input
            type="date"
            label={label}
            required={field.required}
            value={value ?? ""}
            onChange={(e) => handleChange(sectionId, path, e.target.value)}
            error={error}
          />
        );

      case "textarea":
        return (
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              {label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              rows={4}
              value={value ?? ""}
              required={field.required}
              onChange={(e) => handleChange(sectionId, path, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {error && <p className="text-red-600 text-xs">{error}</p>}
          </div>
        );

      case "select":
        return (
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              {label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={value ?? ""}
              required={field.required}
              onChange={(e) => handleChange(sectionId, path, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- Select --</option>
              {Array.isArray(field.options) &&
                field.options.map((opt, i) => {
                  const val = typeof opt === "object" ? opt.value : opt;
                  const lbl = typeof opt === "object" ? opt.label : opt;
                  return (
                    <option key={`${path}-${i}`} value={val ?? ""}>
                      {lbl}
                    </option>
                  );
                })}
            </select>
            {error && <p className="text-red-600 text-xs">{error}</p>}
          </div>
        );

      // medicationList type — rendered as a read-only note for now;
      // replace with a proper repeating-row component when available
      case "medicationList":
        return (
          <div className="space-y-1 col-span-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            <MedicationListField
              value={value ?? []}
              onChange={(v) => handleChange(sectionId, path, v)}
            />
          </div>
        );

      default:
        return (
          <Input
            type="text"
            label={label}
            required={field.required}
            value={value ?? ""}
            onChange={(e) => handleChange(sectionId, path, e.target.value)}
            error={error}
          />
        );
    }
  };

  // ─── UI ──────────────────────────────────────────────────────────────────────
  return (
    <Card shadow="md" className="bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        {config.sections.map((section, idx) => {
          const sectionId = section.id || section.key;
          return (
            <div key={sectionId} className="border border-gray-200 p-5 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">
                {idx + 1}. {section.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {section.fields.map((field) => (
                  <div
                    key={`${sectionId}-${field.key}`}
                    className={field.type === "medicationList" ? "col-span-2" : ""}
                  >
                    {renderField(sectionId, field)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <Button type="submit" fullWidth disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Assessment"}
        </Button>
      </form>
    </Card>
  );
}

// ─── Inline medication list component ────────────────────────────────────────
function MedicationListField({ value, onChange }) {
  const empty = { name: "", strength: "", quantity: "", direction: "" };

  const addRow = () => onChange([...value, { ...empty }]);

  const updateRow = (i, field, val) => {
    const next = value.map((row, idx) => idx === i ? { ...row, [field]: val } : row);
    onChange(next);
  };

  const removeRow = (i) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      {value.map((row, i) => (
        <div key={i} className="grid grid-cols-4 gap-2 items-end border border-gray-200 rounded-lg p-3 bg-white">
          <div>
            <label className="text-xs font-medium text-gray-600">Name</label>
            <input
              className="w-full mt-1 p-2 border border-gray-300 rounded text-sm"
              value={row.name}
              onChange={(e) => updateRow(i, "name", e.target.value)}
              placeholder="e.g. Nitrofurantoin"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Strength</label>
            <input
              className="w-full mt-1 p-2 border border-gray-300 rounded text-sm"
              value={row.strength}
              onChange={(e) => updateRow(i, "strength", e.target.value)}
              placeholder="e.g. 100mg"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Quantity</label>
            <input
              className="w-full mt-1 p-2 border border-gray-300 rounded text-sm"
              value={row.quantity}
              onChange={(e) => updateRow(i, "quantity", e.target.value)}
              placeholder="e.g. 10 capsules"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Direction</label>
            <input
              className="w-full mt-1 p-2 border border-gray-300 rounded text-sm"
              value={row.direction}
              onChange={(e) => updateRow(i, "direction", e.target.value)}
              placeholder="e.g. 1 cap BID x 5 days"
            />
          </div>
          <button
            type="button"
            onClick={() => removeRow(i)}
            className="col-span-4 text-xs text-red-500 hover:text-red-700 text-right mt-1"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        + Add Medication
      </button>
    </div>
  );
}