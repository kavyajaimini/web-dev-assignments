import React, { useState, useEffect } from "react";
import MultiStepWizard from "../components/MultiStepWizard";
import FileUpload from "../components/FileUpload";
import FormAutoSaveIndicator from "../components/FormAutoSaveIndicator";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    label: "Personal Info",
    fields: ["firstName", "lastName", "email", "photo"],
  },
  {
    label: "Account",
    fields: ["username", "password", "confirmPassword", "role"],
  },
  { label: "Documents", fields: ["resume", "idProof"] },
  { label: "Review & Submit", fields: [] },
];

const schema = {
  firstName: { type: "text", label: "First Name", required: true },
  lastName: { type: "text", label: "Last Name", required: true },
  email: { type: "email", label: "Email", required: true },
  photo: { type: "file", label: "Photo", required: true },
  username: { type: "text", label: "Username", required: true },
  password: { type: "password", label: "Password", required: true },
  confirmPassword: {
    type: "password",
    label: "Confirm Password",
    required: true,
  },
  role: {
    type: "select",
    label: "Role",
    required: true,
    options: ["HR", "Employee"],
  },
  resume: { type: "file", label: "Resume", required: true },
  idProof: { type: "file", label: "ID Proof", required: false },
};

function OnboardingFormPage() {
  const methods = useForm({ mode: "onBlur" });
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data) => {
      localStorage.setItem("onboardingData", JSON.stringify(data));
      return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
    },
    onSuccess: () => {
      localStorage.removeItem("onboardingFormState");
      navigate("/dashboard");
    },
  });

  const stepFields = steps[currentStep].fields;
  const filteredSchema = Object.fromEntries(
    Object.entries(schema).filter(([key]) => stepFields.includes(key))
  );
  const values = methods.watch();
  const isStepValid = stepFields.every((name) => {
    const field = schema[name];
    if (!field) return true;
    if (!field.required) return true;
    if (field.type === "file") {
      return !!values[name];
    }
    return values[name] && values[name].toString().trim() !== "";
  });

  useEffect(() => {
    const saved = localStorage.getItem("onboardingFormState");
    if (saved) {
      const { values, step, files } = JSON.parse(saved);
      Object.entries(values || {}).forEach(([k, v]) => methods.setValue(k, v));
      setCurrentStep(step || 0);
      setUploadedFiles(files || {});
    }
  }, []);

  useEffect(() => {
    const subscription = methods.watch((values) => {
      localStorage.setItem(
        "onboardingFormState",
        JSON.stringify({
          values,
          step: currentStep,
          files: uploadedFiles,
        })
      );
    });
    return () => subscription.unsubscribe();
  }, [methods, currentStep, uploadedFiles]);

  const handleFileUpload = (name, file) => {
    setUploadedFiles((prev) => ({ ...prev, [name]: file }));
    methods.setValue(name, file);
  };

  const handleSubmit = (data) => {
    const all = JSON.parse(localStorage.getItem("employees") || "[]");
    const newEmployee = {
      ...data,
      ...uploadedFiles,
      status: "pending",
      id: Date.now(),
    };
    localStorage.setItem("employees", JSON.stringify([...all, newEmployee]));
    mutation.mutate(newEmployee);
  };

  const reviewData = methods.getValues();

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center py-6 px-2 sm:py-8 md:py-10">
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl rounded-2xl shadow bg-white border border-blue-100 p-0 md:p-0 overflow-hidden">
        <div className="bg-white border-b border-blue-100 py-6 px-3 sm:py-7 sm:px-4 md:px-8 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-900 tracking-tight">
            Employee Onboarding
          </h1>
          <p className="mt-1 text-gray-500 text-sm sm:text-base">
            Welcome! Please complete the steps below to get started.
          </p>
        </div>
        <div className="p-3 sm:p-5 md:p-8">
          <FormProvider {...methods}>
            <MultiStepWizard
              steps={steps}
              currentStep={currentStep}
              onStepChange={(idx) => {
                if (idx > currentStep && !isStepValid) return;
                setCurrentStep(idx);
              }}
              isStepValid={isStepValid}
              onNextStep={() => {
                methods.trigger().then((valid) => {
                  if (valid) setCurrentStep(currentStep + 1);
                });
              }}
            >
              {currentStep < steps.length - 1 && (
                <form className="space-y-4 sm:space-y-5" autoComplete="off">
                  {Object.entries(filteredSchema).map(([name, field]) => (
                    <div key={name}>
                      {field.type === "select" ? (
                        <div className="mb-4 sm:mb-5">
                          <label
                            className="block font-medium text-gray-700 mb-1 text-sm sm:text-base"
                            htmlFor={name}
                          >
                            {field.label}
                          </label>
                          <select
                            id={name}
                            {...methods.register(name, {
                              required: field.required,
                            })}
                            className="border border-blue-100 bg-blue-50 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-sm sm:text-base"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select a role
                            </option>
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          {methods.formState.errors[name] && (
                            <span className="text-red-600 ml-2 text-xs">
                              Required
                            </span>
                          )}
                        </div>
                      ) : field.type === "file" ? (
                        <div className="mb-4 sm:mb-5">
                          <label
                            className="block font-medium text-gray-700 mb-1 text-sm sm:text-base"
                            htmlFor={name}
                          >
                            {field.label}{" "}
                            <span className="text-xs text-gray-400">
                              (Upload {field.label.toLowerCase()})
                            </span>
                          </label>
                          <FileUpload
                            onUpload={(file) => handleFileUpload(name, file)}
                          />
                        </div>
                      ) : (
                        <div className="mb-4 sm:mb-5">
                          <label
                            className="block font-medium text-gray-700 mb-1 text-sm sm:text-base"
                            htmlFor={name}
                          >
                            {field.label}
                          </label>
                          <input
                            id={name}
                            type={field.type}
                            {...methods.register(name, {
                              required: field.required,
                            })}
                            className="border border-blue-100 bg-blue-50 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-sm sm:text-base"
                          />
                          {methods.formState.errors[name] && (
                            <span className="text-red-600 ml-2 text-xs">
                              Required
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </form>
              )}
              {currentStep === steps.length - 1 && (
                <div className="bg-white rounded-xl border border-blue-100 p-4 sm:p-6 md:p-8">
                  <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 text-blue-900">
                    Review Your Details
                  </h2>
                  <div className="divide-y divide-blue-50 mb-6 sm:mb-8">
                    {Object.entries(schema).map(([name, field]) => (
                      <div
                        key={name}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 py-2 sm:py-3"
                      >
                        <span className="font-medium text-gray-700 w-36 sm:w-44 shrink-0 text-sm sm:text-base">
                          {field.label}:
                        </span>
                        {field.type === "file" && reviewData[name] ? (
                          <span>
                            {name === "photo" ? (
                              typeof reviewData[name] === "string" ? (
                                <img
                                  src={reviewData[name]}
                                  alt="Profile"
                                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-blue-100"
                                />
                              ) : (
                                <img
                                  src={URL.createObjectURL(reviewData[name])}
                                  alt="Profile"
                                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-blue-100"
                                />
                              )
                            ) : (
                              <a
                                href={
                                  typeof reviewData[name] === "string"
                                    ? reviewData[name]
                                    : URL.createObjectURL(reviewData[name])
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 underline hover:text-blue-900 text-xs sm:text-sm font-medium"
                              >
                                View
                              </a>
                            )}
                          </span>
                        ) : (
                          <span className="text-gray-600 text-xs sm:text-sm">
                            {reviewData[name]}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3">
                    <button
                      type="button"
                      className="px-4 sm:px-5 py-2 rounded bg-gray-100 text-gray-700 font-medium border border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm sm:text-base"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="px-4 sm:px-5 py-2 rounded bg-blue-700 text-white font-medium border border-blue-800 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
                      onClick={methods.handleSubmit(handleSubmit)}
                      disabled={mutation.isLoading}
                    >
                      {mutation.isLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                  <div className="flex justify-end mt-4 sm:mt-5">
                    <FormAutoSaveIndicator
                      status={mutation.isLoading ? "Saving..." : "Saved"}
                    />
                  </div>
                </div>
              )}
            </MultiStepWizard>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default OnboardingFormPage;
