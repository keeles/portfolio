const emailIcon = document.querySelector(".email-icon");
const modal = document.getElementById("emailModal");
const closeBtn = document.querySelector(".close");
const emailForm = document.getElementById("emailForm");
const statusMessage = document.getElementById("status-message");
const submitBtn = document.querySelector(".submit-btn");

const LAMBDA_ENDPOINT = "https://375tddcdrazsbu3if6osiq3stq0ioksh.lambda-url.us-east-2.on.aws/";

emailIcon.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  closeModal();
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  emailForm.reset();
  statusMessage.textContent = "";
}

emailForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitBtn.disabled = true;
  statusMessage.textContent = "Sending...";

  const senderEmail = document.getElementById("senderEmail").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch(LAMBDA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderEmail,
        subject: subject,
        message: message,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      statusMessage.textContent = "Message sent successfully!";
      emailForm.reset();

      setTimeout(() => {
        closeModal();
      }, 2000);
    } else {
      throw new Error(data.message || "Error sending email");
    }
  } catch (error) {
    console.error("Error:", error);
    statusMessage.textContent = "Failed to send. Please try again.";
  } finally {
    submitBtn.disabled = false;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

emailIcon.style.cursor = "pointer";
