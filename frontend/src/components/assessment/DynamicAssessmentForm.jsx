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
  
  console.log("DynamicAssessmentForm received config:", config);

  // Extract the pure field key (after the dot if present)
  const getPureKey = (key) => (key.includes(".") ? key.split(".")[1] : key);

  // ---------------- STATE INIT ----------------
  const [values, setValues] = useState(() => {
    const initial = {};
    
    config.sections.forEach((section) => {
      // Use "id" property (backend standard) with fallback to "key" for compatibility
      const sectionKey = section.id || section.key;
      
      if (!sectionKey) {
        console.error("Section missing id/key:", section);
        return;
      }
      
      initial[sectionKey] = {};
      
      section.fields.forEach((field) => {
        const pureKey = getPureKey(field.key);
        initial[sectionKey][pureKey] =
          field.defaultValue ?? 
          field.default ?? 
          (field.type === "boolean" ? false : null);
      });
    });
    
    console.log("Initial form state (section-wise):", JSON.stringify(initial, null, 2));
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
      const sectionKey = section.id || section.key;
      
      section.fields.forEach((field) => {
        const pureKey = getPureKey(field.key);
        const value = values[sectionKey]?.[pureKey];
        const errorKey = `${sectionKey}.${pureKey}`;

        if (field.required && (value === null || value === "" || value === undefined)) {
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
    
    if (Object.keys(validationErrors).length) {
      console.log("Validation errors:", validationErrors);
      return setErrors(validationErrors);
    }
    
    console.log("Submitting section-wise data:", JSON.stringify(values, null, 2));
    onSubmit(values);
  };

  // ---------------- FIELD RENDER ----------------
  const renderField = (sectionKey, field) => {
    const pureKey = getPureKey(field.key);
    const label = field.label || pureKey;
    const value = values[sectionKey]?.[pureKey];
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
            <label className="text-sm font-medium text-gray-700">
              {label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              rows={4}
              value={value ?? ""}
              required={field.required}
              onChange={(e) => handleChange(sectionKey, pureKey, e.target.value)}
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
              onChange={(e) => handleChange(sectionKey, pureKey, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        {config.sections.map((section, idx) => {
          // Use "id" property (backend standard) with fallback to "key"
          const sectionKey = section.id || section.key;
          
          return (
            <div key={sectionKey} className="border border-gray-200 p-5 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">
                {idx + 1}. {section.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {section.fields.map((field) => (
                  <div key={`${sectionKey}-${field.key}`}>
                    {renderField(sectionKey, field)}
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