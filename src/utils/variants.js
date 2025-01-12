export const fadeIn = (directionObj, delay, screenSize = "all") => {
  // Define breakpoints in pixels
  const breakpoints = {
    all: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };

  // Check if screen size matches or exceeds the specified breakpoint
  const isScreenUp =
    typeof window !== "undefined" &&
    window.innerWidth >= breakpoints[screenSize];

  if (!isScreenUp) return {};

  // Get the current screen width
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;

  // Determine the direction based on screen width
  let direction = directionObj.default; // fallback for small screens

  // Apply direction based on screen width and breakpoints
  if (screenWidth >= breakpoints.sm && directionObj.sm) {
    // md and larger (applies to sm, md, lg, xl)
    direction = directionObj.sm;
  } else if (screenWidth >= breakpoints.md && directionObj.md) {
    // md and larger (applies to md, lg, xl)
    direction = directionObj.md;
  } else if (screenWidth >= breakpoints.lg && directionObj.lg) {
    // lg and larger (applies to lg, xl)
    direction = directionObj.lg;
  }

  return {
    hidden: {
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
      opacity: 0,
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const zoomInOut = (scaleDirection, delay) => {
  return {
    hidden: {
      scale: scaleDirection === "in" ? 0.8 : 1.2,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };
};

export const rotate = (angleDirection, delay) => {
  return {
    hidden: {
      rotate: angleDirection,
      opacity: 0,
    },
    show: {
      rotate: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.2,
        delay: delay,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };
};

export const flipIn = (direction, delay) => {
  return {
    hidden: {
      rotateY: direction === "horizontal" ? 90 : 0,
      rotateX: direction === "vertical" ? 90 : 0,
      opacity: 0,
    },
    show: {
      rotateY: 0,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };
};

export const fadeOutUp = (delay) => {
  return {
    hidden: {
      opacity: 1,
      y: 0,
    },
    show: {
      opacity: 0,
      y: -50, // Slide up
      transition: {
        duration: 1,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

export const swing = (delay) => {
  return {
    hidden: {
      rotate: 0,
      opacity: 0,
    },
    show: {
      rotate: [-5, 5, -3, 3, 0], // Swing effect
      opacity: 1,
      transition: {
        duration: 1,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

export const bounceIn = (delay) => {
  return {
    hidden: {
      scale: 0.3,
      opacity: 0,
    },
    show: {
      scale: [1.2, 0.9, 1], // Creates a bouncy effect
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: delay,
      },
    },
  };
};

export const flipInOut = (direction, delay) => {
  return {
    hidden: {
      rotateY: direction === "horizontal" ? 90 : 0,
      rotateX: direction === "vertical" ? 90 : 0,
      opacity: 0,
    },
    show: {
      rotateY: 0,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      rotateY: direction === "horizontal" ? -90 : 0, // Flip out in the opposite direction
      rotateX: direction === "vertical" ? -90 : 0,
      opacity: 0,
      transition: {
        duration: 1,
        delay: delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };
};
