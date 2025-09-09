import { useTheme, useMediaQuery } from "@mui/material";
import type { Breakpoint } from "@mui/material";
import { useMemo } from "react";

export const useResponsive = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,

    isXs,
    isSm,
    isMd,
    isLg,
    isXl,

    isMobileOrTablet,
    isTabletOrDesktop,

    currentBreakpoint: isMobile ? "mobile" : isTablet ? "tablet" : "desktop",

    isBreakpoint: (breakpoint: Breakpoint) =>
      useMediaQuery(theme.breakpoints.only(breakpoint)),
  };
};

export const useResponsiveValue = <T>(values: {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  default: T;
}): T => {
  const { isMobile, isTablet } = useResponsive();

  return useMemo(() => {
    if (isMobile && values.mobile !== undefined) return values.mobile;
    if (isTablet && values.tablet !== undefined) return values.tablet;
    if (values.desktop !== undefined) return values.desktop;
    return values.default;
  }, [isMobile, isTablet, values]);
};

export const useResponsiveSize = () => {
  const { isMobile, isTablet } = useResponsive();

  return useMemo(
    () => ({
      // Icon sizes
      iconSize: isMobile ? ("small" as const) : ("medium" as const),
      iconPixels: isMobile ? "18px" : "20px",

      // Button sizes
      buttonSize: isMobile
        ? ("small" as const)
        : isTablet
        ? ("medium" as const)
        : ("large" as const),
      buttonPadding: isMobile ? 1 : isTablet ? 1.2 : 1.5,
      buttonMinWidth: isMobile ? "32px" : isTablet ? "40px" : "48px",
      buttonMinHeight: isMobile ? "32px" : isTablet ? "40px" : "48px",

      // Typography sizes
      h1Size: isMobile ? "24px" : isTablet ? "28px" : "32px",
      h2Size: isMobile ? "20px" : isTablet ? "24px" : "28px",
      bodySize: isMobile ? "14px" : isTablet ? "16px" : "18px",
      captionSize: isMobile ? "12px" : isTablet ? "13px" : "14px",

      // Spacing
      containerPadding: isMobile ? 1 : isTablet ? 2 : 3,
      sectionSpacing: isMobile ? 2 : isTablet ? 3 : 4,
      elementGap: isMobile ? 0.5 : isTablet ? 1 : 1.5,

      // Layout
      borderRadius: isMobile ? 1 : isTablet ? 1.5 : 2,
      maxWidth: isMobile ? "100%" : isTablet ? "90%" : "80%",
    }),
    [isMobile, isTablet]
  );
};

export const useResponsiveStyles = () => {
  return useMemo(
    () => ({
      // Common padding patterns
      containerPadding: { xs: 1, sm: 2, md: 3 },
      sectionPadding: { xs: 1.5, sm: 2, md: 2.5 },
      elementPadding: { xs: 0.5, sm: 1 },

      // Common margin patterns
      containerMargin: { xs: 1, sm: 2.5, md: 5 },
      sectionMargin: { xs: 1, sm: 2, md: 3 },
      elementMargin: { xs: 0.5, sm: 1, md: 1.5 },

      // Typography patterns
      headingFontSize: { xs: "24px", sm: "28px", md: "32px" },
      subheadingFontSize: { xs: "18px", sm: "22px", md: "26px" },
      bodyFontSize: { xs: "12px", sm: "13px", md: "15px" },
      captionFontSize: { xs: "12px", sm: "13px", md: "14px" },

      // Layout patterns
      flexDirection: { xs: "column" as const, md: "row" as const },
      maxWidth: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
      width: { xs: "100%", sm: "calc(100% - 40px)", md: "calc(100% - 80px)" },

      // Border radius patterns
      borderRadius: { xs: 1, sm: 1.5, md: 2, lg: 2.5 },

      // Height patterns
      buttonHeight: { xs: "36px", sm: "42px", md: "48px" },
      inputHeight: { xs: "40px", sm: "44px", md: "48px" },

      // Display patterns
      hideOnMobile: { xs: "none", md: "flex" },
      hideOnDesktop: { xs: "flex", md: "none" },
      showOnTabletUp: { xs: "none", sm: "flex" },
    }),
    []
  );
};
