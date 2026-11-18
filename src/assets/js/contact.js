const requiredFields = {
  name: "Please enter your name.",
  email: "Please enter your work email.",
  message: "Please tell us what you're trying to achieve.",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailError = "That email doesn't look right — mind double-checking?";
const requestError = "Something went wrong on our end. Please email us directly.";

export function setupContact(form) {
  const fields = Object.keys(requiredFields).map((name) => form.elements.namedItem(name));
  const feedback = form.querySelector("[data-form-error]");
  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector('button[type="submit"]');
  const submitLabel = submit.querySelector("[data-submit-label]");
  const idleLabel = submitLabel.textContent;
  const successPanel = form.parentElement.querySelector("[data-form-success]");
  const touched = new Set();
  let pending = false;

  function fieldMessage(field, message) {
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
    form.querySelector(`[data-field-error="${field.name}"]`).textContent = message;
  }

  function check(field) {
    const value = field.value.trim();
    let message = value ? "" : requiredFields[field.name];
    if (value && field.name === "email" && !emailPattern.test(value)) message = emailError;
    fieldMessage(field, message);
    return !message;
  }

  for (const field of fields) {
    field.addEventListener("blur", () => {
      touched.add(field);
      check(field);
    });
    field.addEventListener("input", () => {
      if (touched.has(field)) check(field);
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (pending) return;
    feedback.textContent = "";

    const invalid = fields.filter((field) => {
      touched.add(field);
      return !check(field);
    });
    if (invalid.length) {
      status.textContent = "Check the marked fields.";
      invalid[0].focus();
      return;
    }

    const data = new FormData(form);
    const payload = {
      name: data.get("name").trim(),
      email: data.get("email").trim(),
      company: data.get("company").trim(),
      budget: data.get("budget") ?? "",
      message: data.get("message").trim(),
      services: data.getAll("services"),
    };

    pending = true;
    submit.disabled = true;
    submitLabel.textContent = "Sending…";
    status.textContent = "Sending your message.";

    try {
      const response = await fetch(form.getAttribute("action"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15_000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error(requestError);

      touched.clear();
      form.reset();
      form.hidden = true;
      successPanel.hidden = false;
      successPanel.querySelector("h3").focus();
    } catch {
      feedback.textContent = requestError;
    } finally {
      pending = false;
      submit.disabled = false;
      submitLabel.textContent = idleLabel;
      status.textContent = "";
    }
  });

  successPanel.querySelector("[data-form-restart]").addEventListener("click", () => {
    successPanel.hidden = true;
    form.hidden = false;
    fields[0].focus();
  });

  form.hidden = false;
}
