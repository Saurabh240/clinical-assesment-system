import { useState } from "react";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default function DynamicAssessmentForm({
  config,
  onSubmit,
  submitting = false,
}) {
  if (!config || !Array.isArray(config.sections)) {
    return null;
  }

  /**
   * Initialize NESTED state
   * Matches backend JSON structure exactly
   */
  const [values, setValues] = useState(() => {
  const initial = {};
  config.sections.forEach((section) => {
    initial[section.key] = {};
    section.fields.forEach((field) => {
      initial[section.key][field.key] = field.defaultValue ?? (field.type === "boolean" ? false : null);
    });
  });
  return initial;
});

  const [errors, setErrors] = useState({});

  
    // Nested-safe change handler
   
  const handleChange = (sectionKey, fieldKey, value) => {
    setValues((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [fieldKey]: value,
      },
    }));

    // Clear error when user edits field
    const errorKey = `${sectionKey}.${fieldKey}`;
    if (errors[errorKey]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[errorKey];
        return next;
      });
    }
  };

  /**
    Validation (nested-safe)
   */
  const validateForm = () => {
    const newErrors = {};

    config.sections.forEach((section) => {
      section.fields.forEach((field) => {
        const value = values[section.key]?.[field.key];
        const errorKey = `${section.key}.${field.key}`;

        if (field.required && (value === null || value === "")) {
          newErrors[errorKey] = `${formatLabel(field.key)} is required`;
        }

        if (field.type === "number" && value !== null && value !== "") {
          const num = Number(value);
          if (field.rules?.min !== undefined && num < field.rules.min) {
            newErrors[errorKey] = `Must be ≥ ${field.rules.min}`;
          }
          if (field.rules?.max !== undefined && num > field.rules.max) {
            newErrors[errorKey] = `Must be ≤ ${field.rules.max}`;
          }
        }
      });
    });

    return newErrors;
  };

  /**
   Submit EXACT backend-compatible JSON
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // DO NOT transform, DO NOT flatten
    onSubmit(values);
  };

  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase())
      .trim();

  /**
  Field renderer (nested-safe)
   */
  const renderField = (sectionKey, field) => {
    const label = formatLabel(field.key);
    const value = values[sectionKey][field.key];
    const error = errors[`${sectionKey}.${field.key}`];

    switch (field.type) {
      case "boolean":
        return (
          <Checkbox
            label={label}
            checked={!!value}
            required={field.required}
            onChange={(checked) =>
              handleChange(sectionKey, field.key, checked)
            }
            error={error}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            label={label}
            required={field.required}
            min={field.rules?.min}
            max={field.rules?.max}
            value={value ?? ""}
            onChange={(e) =>
              handleChange(sectionKey, field.key, e.target.value)
            }
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
            onChange={(e) =>
              handleChange(sectionKey, field.key, e.target.value)
            }
            error={error}
          />
        );

      case "textarea":
        return (
          <div className="space-y-1">
            <label className="text-sm text-gray-700">
              {label}
              {field.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            <textarea
              rows={4}
              value={value ?? ""}
              required={field.required}
              onChange={(e) =>
                handleChange(sectionKey, field.key, e.target.value)
              }
              className={`w-full p-3 border rounded-lg ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
          </div>
        );

      case "select":
        return (
          <div className="space-y-1">
            <label className="text-sm text-gray-700">
              {label}
              {field.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            <select
              value={value ?? ""}
              required={field.required}
              onChange={(e) =>
                handleChange(sectionKey, field.key, e.target.value)
              }
              className={`w-full p-3 border rounded-lg ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">-- Select --</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
          </div>
        );

      default:
        return (
          <Input
            type="text"
            label={label}
            required={field.required}
            value={value ?? ""}
            onChange={(e) =>
              handleChange(sectionKey, field.key, e.target.value)
            }
            error={error}
          />
        );
    }
  };

  return (
    <Card shadow="md" className="bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        {config.sections.map((section, idx) => (
          <div
            key={section.key}
            className="border border-gray-100 rounded-lg p-5"
          >
            <h3 className="text-base font-medium text-gray-800 mb-4">
              {idx + 1}. {section.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={field.key}>
                  {renderField(section.key, field)}
                </div>
              ))}
            </div>
          </div>
        ))}

        <Button
          type="submit"
          disabled={submitting}
          fullWidth
          variant="secondary"
        >
          {submitting ? "Submitting..." : "Submit Assessment"}
        </Button>
      </form>
    </Card>
  );
}
