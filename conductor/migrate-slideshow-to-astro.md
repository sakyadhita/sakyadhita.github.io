# Plan: Replace Slideshow.jsx with native Astro component

This plan outlines the steps to replace the React-based `Slideshow.jsx` component with a native Astro component using Embla Carousel (Vanilla JS). This aligns with the project's goal of using Astro components where possible and reducing reliance on React for purely display-oriented components.

## Objective
- Create a reusable `Slideshow.astro` component that matches the functionality of `Slideshow.jsx`.
- Use `embla-carousel` (Vanilla JS) instead of `embla-carousel-react`.
- Convert key consumer components to Astro to leverage the new native component.

## Key Files & Context
- `src/components/Slideshow.jsx`: The existing React slideshow component.
- `src/components/Home/HomeSlideshow.jsx`: Main consumer for the home page.
- `src/components/Home/NewsSlideReact.jsx`: Slide component used by `HomeSlideshow`.
- `src/layouts/HomeLayout.astro`: Layout that uses `HomeSlideshow`.
- `src/components/Conference/ConferenceDesktop.jsx` & `MobileConference.jsx`: Other consumers.
- `src/components/Layouts/EPublications.jsx`: Another consumer.

## Implementation Steps

### 1. Research & Preparation
- Verify Embla Carousel vanilla initialization and plugin usage (Autoplay, Fade).
- Ensure `embla-carousel` package is correctly imported in Astro scripts.

### 2. Create native Astro Components
- **`src/components/Slideshow.astro`**:
    - HTML structure following Embla Carousel requirements.
    - Props: `height`, `width`, `isMobile`.
    - `<slot />` for slide content.
    - Custom Arrows and Indicators (dots) UI.
    - `<script>` tag to:
        - Select all `.embla` containers on the page.
        - Initialize Embla for each instance with `loop: true`, `duration: 30`.
        - Add `Autoplay` and `Fade` plugins.
        - Hook up arrow clicks and dot clicks.
        - Update active dot on slide change.
- **`src/components/Home/NewsSlide.astro`**:
    - Port logic from `NewsSlideReact.jsx`.
    - Use `CustomButton.astro`.

### 3. Refactor Consumers (Phase 1: Home Page)
- **`src/components/Home/HomeSlideshow.astro`**:
    - Port logic from `HomeSlideshow.jsx`.
    - Map `newsAndEvents` to `NewsSlide.astro` components.
    - Wrap slides in required Embla slide container classes.
- **`src/layouts/HomeLayout.astro`**:
    - Replace `<HomeSlideshow client:idle />` with `<HomeSlideshow />` (Astro component).

### 4. Refactor Consumers (Phase 2: Conference & EPublications)
- Evaluate and convert `ConferenceDesktop.jsx`, `MobileConference.jsx`, and `EPublications.jsx` to Astro components.
- Since these components have state (tabs, expanded sections), port the state logic to Vanilla JS or maintain hybrid React components if necessary (though the goal is native Astro).
- *Note*: If full conversion is too complex for this task, we will provide guidance on how to use `Slideshow.astro` in these contexts.

## Verification & Testing
- **Visual Verification**: Check slideshow functionality on Home page (Autoplay, Fade, Arrows, Dots).
- **Responsive Testing**: Verify behavior on mobile vs desktop (specifically arrow visibility).
- **Multiple Instances**: Ensure multiple slideshows on the same page do not interfere with each other.
- **Console Errors**: Check for any JS errors during Embla initialization.
