// Simulated API for form submission
export async function submitOnboardingForm(data) {
  return new Promise((resolve) => setTimeout(() => resolve({ success: true, data }), 1000));
}
