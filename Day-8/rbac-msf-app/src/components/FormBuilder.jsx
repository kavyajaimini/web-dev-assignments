import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import AccessibleField from "./AccessibleField";
import PasswordConfirmationField from "./PasswordConfirmationField";
import DateRangeField from "./DateRangeField";
import PerformanceOptimizedField from "./PerformanceOptimizedField";

const FormBuilder = ({ schema, onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {Object.entries(schema).map(([name, field]) => {
        if (field.type === "password" && name === "confirmPassword") {
          return (
            <AccessibleField
              key={name}
              label={field.label}
              id={name}
              error={errors[name]?.message}
            >
              <Controller
                name={name}
                control={control}
                rules={{
                  required: field.required ? "Required" : false,
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                }}
                render={({ field: f }) => (
                  <PasswordConfirmationField
                    {...f}
                    error={errors[name]?.message}
                  />
                )}
              />
            </AccessibleField>
          );
        }
        if (field.type === "dateRange") {
          return <DateRangeField key={name} {...field} />;
        }
        if (field.type === "file") {
          return (
            <AccessibleField
              key={name}
              label={field.label}
              id={name}
              error={errors[name]?.message}
            >
              <Controller
                name={name}
                control={control}
                rules={{ required: field.required ? "Required" : false }}
                render={({ field: f }) => (
                  <input
                    type="file"
                    id={name}
                    className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => f.onChange(e.target.files[0])}
                  />
                )}
              />
            </AccessibleField>
          );
        }
        return (
          <AccessibleField
            key={name}
            label={field.label}
            id={name}
            error={errors[name]?.message}
          >
            <Controller
              name={name}
              control={control}
              rules={{ required: field.required ? "Required" : false }}
              render={({ field: f }) => (
                <PerformanceOptimizedField
                  fieldProps={{ ...f, type: field.type, id: name }}
                />
              )}
            />
          </AccessibleField>
        );
      })}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default FormBuilder;
