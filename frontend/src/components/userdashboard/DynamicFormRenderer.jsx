import Card from "../ui/Card";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";

const DynamicFormRenderer = ({ schema, formData, setFormData, errors }) => {
  // Fallback label if backend doesn't send one
  const getLabel = (field) =>
    field.label ||
    field.key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

  // Centralized updater
  const updateValue = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderField = (field) => {
    switch (field.type) {
      case "boolean":
        return (
          <Checkbox
            label={getLabel(field)}
            checked={Boolean(formData[field.key])}
            onChange={(v) => updateValue(field.key, v)}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            label={getLabel(field)}
            value={formData[field.key] ?? ""}
            error={errors[field.key]}
            onChange={(e) =>
              updateValue(field.key, e.target.value)
            }
          />
        );

      default:
        return (
          <p className="text-sm text-gray-500">
            Unsupported field type: {field.type}
          </p>
        );
    }
  };

  return (
    <div className="space-y-6">
      {schema.map((section) => (
        <Card key={section.title}>
          <Card.Title>{section.title}</Card.Title>

          <div className="space-y-4 mt-4">
            {section.fields.map((field) => (
              <div key={field.key}>
                {renderField(field)}

                {errors[field.key] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[field.key]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DynamicFormRenderer;
