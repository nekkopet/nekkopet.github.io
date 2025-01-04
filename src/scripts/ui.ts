/**
 *
 */
export const ProductSlideshow = function () {
  // Front matter TS is executed in the ~server during the build process
  // import confetti from 'canvas-confetti';

  const buttons = document.querySelectorAll("[data-astro-image]");

  // Add event listeners to fire confetti when a button is clicked.
  buttons.forEach(button => {
    button.addEventListener("click", e => {
      const jsonData = e.target?.getAttribute('data-astro-image');

      try {
        const jsonObject = JSON.parse(jsonData || ''); // Parse the JSON string
        const heroImage = document.querySelector(".hero-image");
        console.log({ heroImage })

        if (heroImage) {
          heroImage.src = jsonObject.url;
        }

        console.log({ e, jsonData, jsonObject });
      } catch (error) {
        console.error("Error parsing JSON", error);
      }
    });
  });
};
