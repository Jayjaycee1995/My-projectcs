document.addEventListener("DOMContentLoaded", function () {
  const rosePetalsContainer = document.querySelector(".rose-petals");
  const steps = document.querySelectorAll(".step");
  const nextButtons = document.querySelectorAll(".next-btn");
  let currentStep = 0;

  // Create 1000 petals
  for (let i = 0; i < 100; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    // Randomize petal position and animation
    petal.style.left = `${Math.random() * 100}%`; // Random horizontal position
    petal.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random duration (5-10s)
    petal.style.animationDelay = `${Math.random() * 5}s`; // Random delay (0-5s)
    petal.style.width = `${Math.random() * 20 + 10}px`; // Random size (10-30px)
    petal.style.height = petal.style.width; // Keep petals circular
    petal.style.backgroundColor = `rgba(255, 77, 77, ${
      Math.random() * 0.5 + 0.3
    })`; // Random opacity

    // Add slight horizontal movement for a natural effect
    petal.style.animationName = `fall-${i % 2 === 0 ? "left" : "right"}`;

    rosePetalsContainer.appendChild(petal);
  }

  // Add dynamic keyframes for natural movement
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(
    `
        @keyframes fall-left {
            0% {
                transform: translate(-10%, -10%) rotate(0deg);
                opacity: 0.8;
            }
            100% {
                transform: translate(10%, 110vh) rotate(360deg);
                opacity: 0;
            }
        }
    `,
    styleSheet.cssRules.length
  );

  styleSheet.insertRule(
    `
        @keyframes fall-right {
            0% {
                transform: translate(10%, -10%) rotate(0deg);
                opacity: 0.8;
            }
            100% {
                transform: translate(-10%, 110vh) rotate(360deg);
                opacity: 0;
            }
        }
    `,
    styleSheet.cssRules.length
  );

  // Show the first step
  steps[currentStep].classList.add("active");

  // Handle "Next" button clicks
  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      steps[currentStep].classList.remove("active");
      currentStep++;
      if (currentStep < steps.length) {
        steps[currentStep].classList.add("active");
      }
    });
  });

  // Confetti effect on "Yes" button click
  document
    .getElementById("valentine-yes")
    .addEventListener("click", function () {
      // Full-screen confetti
      confetti({
        particleCount: 1000,
        spread: 360,
        startVelocity: 60,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#ff4d4d", "#ff7eb9", "#ffffff"], // Red, pink, and white
      });

      // Play romantic music
      document.getElementById("romantic-music").play();

      // Move to the final step
      steps[currentStep].classList.remove("active");
      currentStep = steps.length - 1; // Go to the last step
      steps[currentStep].classList.add("active");
    });

  // Fun effect on "No" button click
  document
    .getElementById("valentine-no")
    .addEventListener("click", function () {
      this.textContent = "Think again!";
      this.style.position = "absolute";
      this.style.left = `${Math.random() * 90}%`;
      this.style.top = `${Math.random() * 90}%`;
    });

  // WhatsApp Sharing Button
  document
    .getElementById("share-whatsapp")
    .addEventListener("click", function () {
      const message = encodeURIComponent(
        "I said YES to being your Valentine! 💖 Will you be mine?"
      );
      const whatsappUrl = `https://wa.me/2348105335578?text=${message}`;
      window.open(whatsappUrl, "_blank");
    });
});
