/**
 * Dynamic Headline Rotator
 * 
 * A vanilla JavaScript implementation of the rotating headline functionality.
 * This can be used outside of React or in any HTML context.
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.targetSelector - CSS selector for the headline element
 * @param {string} options.baseText - The base text with [Name] and [Department] placeholders
 * @param {string[]} options.names - Array of names to rotate through
 * @param {string[]} options.departments - Array of departments to rotate through
 * @param {number} options.interval - Rotation interval in milliseconds (default: 2000)
 * @param {string} options.activeClass - CSS class to apply to rotating words (default: "dynamic-word")
 */
export function initDynamicHeadline(options) {
  const {
    targetSelector,
    baseText = "The financial compliance tool even [Name] in [Department] wants to use",
    names = ["Adeel", "Sana", "Usman", "Zara"],
    departments = ["Finance", "Audit", "Risk"],
    interval = 2000,
    activeClass = "dynamic-word"
  } = options;
  
  // Find the target element
  const targetElement = document.querySelector(targetSelector);
  if (!targetElement) {
    console.warn(`Element not found: ${targetSelector}`);
    return;
  }
  
  // Create static fallback for no-JS scenarios
  const fallbackText = `The financial compliance tool even ${names[0]} in ${departments[0]} wants to use`;
  const fallbackElement = document.createElement('noscript');
  fallbackElement.textContent = fallbackText;
  targetElement.parentNode.insertBefore(fallbackElement, targetElement);
  
  // Create spans for dynamic text parts
  const parts = baseText.split(/\[Name\]|\[Department\]/);
  if (parts.length <= 1) {
    targetElement.textContent = baseText;
    return;
  }
  
  // Clear the target element
  targetElement.innerHTML = '';
  
  // Create a containing span for the first part
  const firstPart = document.createElement('span');
  firstPart.textContent = parts[0];
  targetElement.appendChild(firstPart);
  
  // Create a span for the name
  const nameSpan = document.createElement('span');
  nameSpan.className = activeClass;
  nameSpan.textContent = names[0];
  nameSpan.setAttribute('aria-live', 'polite');
  targetElement.appendChild(nameSpan);
  
  // Create a span for the middle part
  const middlePart = document.createElement('span');
  middlePart.textContent = parts[1];
  targetElement.appendChild(middlePart);
  
  // Create a span for the department
  const deptSpan = document.createElement('span');
  deptSpan.className = activeClass;
  deptSpan.textContent = departments[0];
  deptSpan.setAttribute('aria-live', 'polite');
  targetElement.appendChild(deptSpan);
  
  // Add the final part if it exists
  if (parts[2]) {
    const lastPart = document.createElement('span');
    lastPart.textContent = parts[2];
    targetElement.appendChild(lastPart);
  }
  
  // Set up the rotation
  let currentIndex = 0;
  const maxItems = Math.min(names.length, departments.length);
  
  // Check if we should reduce motion based on user preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const actualInterval = prefersReducedMotion ? interval * 2 : interval;
  
  // Create the rotation interval
  const timer = setInterval(() => {
    // Only rotate if the page is visible
    if (document.visibilityState === 'visible') {
      currentIndex = (currentIndex + 1) % maxItems;
      nameSpan.textContent = names[currentIndex];
      deptSpan.textContent = departments[currentIndex];
    }
  }, actualInterval);
  
  // Clean up function
  function cleanup() {
    clearInterval(timer);
  }
  
  // Clean up when page is unloaded
  window.addEventListener('beforeunload', cleanup);
  
  // Return cleanup function for single-page apps
  return cleanup;
}

/**
 * Add the necessary CSS styles for the dynamic headline
 * 
 * @param {string} blueColor - The CSS color code for the blue text (default: "#01ab44")
 * @param {string} activeClass - The class name for active words (default: "dynamic-word")
 */
export function addDynamicHeadlineStyles(blueColor = "#01ab44", activeClass = "dynamic-word") {
  // Create a style element
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .${activeClass} {
      color: ${blueColor};
      text-decoration: underline;
      transition: color 0.3s ease, text-decoration 0.3s ease;
      display: inline-block;
    }
    
    @media (prefers-reduced-motion: reduce) {
      .${activeClass} {
        transition-duration: 0.5s;
      }
    }
  `;
  document.head.appendChild(styleElement);
}

/**
 * Example usage:
 * 
 * // In your JavaScript file:
 * import { initDynamicHeadline, addDynamicHeadlineStyles } from './dynamic-headline.js';
 * 
 * document.addEventListener('DOMContentLoaded', () => {
 *   // Add the necessary styles
 *   addDynamicHeadlineStyles('#01ab44', 'dynamic-word');  // Use your theme's blue color
 *   
 *   // Initialize the dynamic headline
 *   const cleanup = initDynamicHeadline({
 *     targetSelector: '#headline', // Replace with your headline element's selector
 *     baseText: "The financial compliance tool even [Name] in [Department] wants to use",
 *     names: ["Adeel", "Sana", "Usman", "Zara"],
 *     departments: ["Finance", "Audit", "Risk"],
 *     interval: 2000,
 *     activeClass: 'dynamic-word'
 *   });
 *   
 *   // Uncomment if using in a single-page application:
 *   // return () => cleanup();
 * }); 
 */ 