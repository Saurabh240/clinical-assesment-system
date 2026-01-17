import { useState } from "react";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default function DynamicAssessmentForm({ config, onSubmit, submitting = false }) {
  if (!config || !Array.isArray(config.sections)) return null;

  const getPureKey = (key) => (key.includes(".") ? key.split(".")[1] : key);

  // ---------------- STATE INIT ----------------
  const [values, setValues] = useState(() => {
    const initial = {};
    config.sections.forEach((section) => {
      initial[section.key] = {};
      section.fields.forEach((field) => {
        const pureKey = getPureKey(field.key);
        initial[section.key][pureKey] =
          field.defaultValue ?? (field.type === "boolean" ? false : null);
      });
    });
    return initial;
  });

  const [errors, setErrors] = useState({});

  // ---------------- CHANGE HANDLER ----------------
  const handleChange = (sectionKey, fieldKey, value) => {
    setValues((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], [fieldKey]: value },
    }));

    const errKey = `${sectionKey}.${fieldKey}`;
    if (errors[errKey]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[errKey];
        return next;
      });
    }
  };

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const newErrors = {};
    config.sections.forEach((section) => {
      section.fields.forEach((field) => {
        const pureKey = getPureKey(field.key);
        const value = values[section.key]?.[pureKey];
        const errorKey = `${section.key}.${pureKey}`;

        if (field.required && (value === null || value === "")) {
          newErrors[errorKey] = `${field.label || pureKey} is required`;
        }
      });
    });
    return newErrors;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) return setErrors(validationErrors);
    onSubmit(values);
  };

  // ---------------- FIELD RENDER ----------------
  const renderField = (sectionKey, field) => {
    const pureKey = getPureKey(field.key);
    const label = field.label || pureKey;
    const value = values[sectionKey][pureKey];
    const error = errors[`${sectionKey}.${pureKey}`];

    switch (field.type) {
      case "boolean":
        return (
          <Checkbox
            label={label}
            checked={!!value}
            required={field.required}
            onChange={(v) => handleChange(sectionKey, pureKey, v)}
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
            onChange={(e) => handleChange(sectionKey, pureKey, e.target.value)}
            error={error}
          />
        );

      case "textarea":
        return (
          <div className="space-y-1">
            <label>{label}</label>
            <textarea
              rows={4}
              value={value ?? ""}
              required={field.required}
              onChange={(e) => handleChange(sectionKey, pureKey, e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            {error && <p className="text-red-600 text-xs">{error}</p>}
          </div>
        );

      case "select":
        return (
          <div className="space-y-1">
            <label>{label}</label>
            <select
              value={value ?? ""}
              required={field.required}
              onChange={(e) => handleChange(sectionKey, pureKey, e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">-- Select --</option>
              {Array.isArray(field.options) &&
                field.options.map((opt, i) => {
                  const val = typeof opt === "object" ? opt.value : opt;
                  const lbl = typeof opt === "object" ? opt.label : opt;
                  return (
                    <option key={`${pureKey}-${i}`} value={val ?? ""}>
                      {lbl}
                    </option>
                  );
                })}
            </select>
            {error && <p className="text-red-600 text-xs">{error}</p>}
          </div>
        );

      default:
        return (
          <Input
            type="text"
            label={label}
            required={field.required}
            value={value ?? ""}
            onChange={(e) => handleChange(sectionKey, pureKey, e.target.value)}
            error={error}
          />
        );
    }
  };

  // ---------------- UI ----------------
  return (
    <Card shadow="md" className="bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        {config.sections.map((section, idx) => (
          <div key={section.key} className="border p-5 rounded-lg">
            <h3 className="font-medium mb-4">
              {idx + 1}. {section.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={`${section.key}-${field.key}`}>
                  {renderField(section.key, field)}
                </div>
              ))}
            </div>
          </div>
        ))}
        <Button type="submit" fullWidth disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Assessment"}
        </Button>
      </form>
    </Card>
  );
}
