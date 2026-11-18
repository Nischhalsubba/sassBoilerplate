/*
 * Example browser script for the archived Gulp starter kit.
 * Fetches a random color from the demo API on load and refreshes the page
 * background periodically so the JavaScript/Webpack pipeline has visible output.
 */

import axios from "axios";

const randomColorApi = "http://www.colr.org/json/color/random";
const pageBody = document.body;

/** Fetches one random color and applies it to the document background. */
function applyRandomBackgroundColor() {
  axios
    .get(randomColorApi)
    .then((response) => {
      const hex = response.data.colors[0]?.hex;
      if (!hex) {
        console.error("Random color could not be fetched.");
        return;
      }

      pageBody.style.backgroundColor = `#${hex}`;
    })
    .catch(() => {
      console.error("Random color could not be fetched.");
    });
}

/** Starts the demo color cycle after the page and its assets have loaded. */
function startColorDemo() {
  applyRandomBackgroundColor();
  window.setInterval(applyRandomBackgroundColor, 8000);
}

window.addEventListener("load", startColorDemo);
