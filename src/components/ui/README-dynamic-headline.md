# Dynamic Headline Implementation

This guide explains how to implement the dynamic headline that shows rotating names and departments in the hero section.

## Implementation Options

### 1. React Component Implementation (Recommended)

If you're using this within a React component, use the `RotatingHeadline` component:

```tsx
import RotatingHeadline from '@/components/ui/rotating-headline';

// In your component's JSX:
<h1 className="text-4xl font-bold">
  <RotatingHeadline 
    baseText="The financial compliance tool even [Name] in [Department] wants to use"
    rotatingWords={{
      names: ["Adeel", "Sana", "Usman", "Zara"],
      departments: ["Finance", "Audit", "Risk"]
    }}
    className="text-aes-navy" // Inherits the heading text color
    interval={2000} // Optional, defaults to 2000ms (2 seconds)
  />
</h1>
```

### 2. Vanilla JavaScript Implementation

For non-React contexts or when you need to add this to a static HTML page:

```js
import { initDynamicHeadline, addDynamicHeadlineStyles } from '@/lib/dynamic-headline';

// Add the necessary styles
addDynamicHeadlineStyles('#01ab44'); // Use your theme's blue color

// Initialize the dynamic headline
const cleanup = initDynamicHeadline({
  targetSelector: '#heroHeadline', // The CSS selector for your headline
  baseText: "The financial compliance tool even [Name] in [Department] wants to use",
  names: ["Adeel", "Sana", "Usman", "Zara"],
  departments: ["Finance", "Audit", "Risk"],
  interval: 2000
});

// Important for single-page apps:
// Make sure to clean up when the component unmounts
// For example, in a custom hook:
// useEffect(() => {
//   const cleanup = initDynamicHeadline({...});
//   return cleanup;
// }, []);
```

In your HTML:

```html
<h1 id="heroHeadline" class="text-4xl font-bold">
  The financial compliance tool even Adeel in Finance wants to use
</h1>
```

## Customization Options

### Styling

The rotating words are styled with:
1. Text color using the site's `aes-green` color (which serves as the "blue" in the requirements)
2. Underline text decoration
3. Same typography (font size, weight, etc.) as the rest of the headline

To customize:
- **React version**: Modify the styles in `rotating-headline.tsx`
- **Vanilla JS version**: Pass a different color to `addDynamicHeadlineStyles()` or modify the CSS in `dynamic-headline.js`

### Accessibility Features

Both implementations include:
1. `aria-live="polite"` for screen readers to announce changes
2. Respecting user's motion preferences via `prefers-reduced-motion` media query
3. Static fallback for users with JavaScript disabled
4. Performance optimization (pauses when tab not visible)

## Integration Notes

- The implementation preserves all existing styling and only changes the headline text
- The headline component is responsive and works on all screen sizes
- No additional dependencies are required

## Testing

Test the implementation by:
1. Viewing on different screen sizes to ensure proper layout
2. Disabling JavaScript to verify the static fallback appears
3. Testing with a screen reader to ensure changes are announced appropriately
4. Enabling "Reduce motion" in your OS accessibility settings to verify slower transitions 