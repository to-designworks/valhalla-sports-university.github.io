const targets = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-show");
      observer.unobserve(entry.target);
    }
  });
});

targets.forEach((target) => observer.observe(target));

const form = document.querySelector("form");
const errorMessage = document.querySelector(".form-error-message");

if (form && errorMessage) {
  form.addEventListener("submit", function (e) {
    const requiredFields = form.querySelectorAll("[required]");
    let hasError = false;

    requiredFields.forEach((field) => {
      if (field.type === "radio") {
        const checked = form.querySelector(`input[name="${field.name}"]:checked`);
        const group = field.closest(".radio-group");

        if (!checked) {
          hasError = true;
          if (group) group.classList.add("error");
        } else {
          if (group) group.classList.remove("error");
        }
      } else {
        const isEmpty = !field.value.trim();

        if (isEmpty) {
          hasError = true;
          field.classList.add("error");
        } else {
          field.classList.remove("error");
        }
      }
    });

    if (hasError) {
      e.preventDefault();
      errorMessage.textContent = "未入力の項目があります";
    } else {
      errorMessage.textContent = "";
    }
  });
}