export const responsivePatterns = {
  // Typography patterns
  typography: {
    hero: { xs: "32px", sm: "48px", md: "64px", lg: "72px" },
    h1: { xs: "24px", sm: "28px", md: "32px", lg: "36px" },
    h2: { xs: "20px", sm: "24px", md: "28px", lg: "32px" },
    h3: { xs: "18px", sm: "20px", md: "24px", lg: "28px" },
    body: { xs: "14px", sm: "16px", md: "18px", lg: "20px" },
    caption: { xs: "12px", sm: "13px", md: "14px", lg: "15px" },
  },

  // Spacing patterns
  spacing: {
    containerPadding: { xs: 1, sm: 2, md: 3, lg: 4 },
    sectionPadding: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
    elementPadding: { xs: 0.5, sm: 1, md: 1.5, lg: 2 },
    containerMargin: { xs: 1, sm: 2.5, md: 5, lg: 6 },
    sectionMargin: { xs: 1, sm: 2, md: 3, lg: 4 },
    elementMargin: { xs: 0.5, sm: 1, md: 1.5, lg: 2 },
    gap: {
      small: { xs: 0.5, sm: 1, md: 1.5 },
      medium: { xs: 1, sm: 2, md: 3 },
      large: { xs: 2, sm: 3, md: 4 },
    },
  },

  // Layout patterns
  layout: {
    maxWidth: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
    width: {
      full: { xs: "100%", sm: "100%", md: "100%" },
      withPadding: {
        xs: "calc(100% - 20px)",
        sm: "calc(100% - 40px)",
        md: "calc(100% - 80px)",
      },
      form: { xs: "100%", sm: "400px", md: "480px", lg: "520px" },
      modal: { xs: "90%", sm: "500px", md: "600px", lg: "700px" },
    },
    flexDirection: {
      mobileStack: { xs: "column", md: "row" },
      tabletStack: { xs: "column", sm: "column", md: "row" },
    },
    borderRadius: { xs: 1, sm: 1.5, md: 2, lg: 2.5 },
  },

  // Component sizes
  components: {
    button: {
      height: { xs: "36px", sm: "42px", md: "48px", lg: "52px" },
      padding: {
        xs: "6px 12px",
        sm: "8px 16px",
        md: "10px 20px",
        lg: "12px 24px",
      },
      fontSize: { xs: "13px", sm: "14px", md: "15px", lg: "16px" },
    },
    input: {
      height: { xs: "40px", sm: "44px", md: "48px", lg: "52px" },
      fontSize: { xs: "14px", sm: "16px", md: "17px", lg: "18px" },
    },
    icon: {
      small: { xs: "16px", sm: "18px", md: "20px" },
      medium: { xs: "20px", sm: "22px", md: "24px" },
      large: { xs: "24px", sm: "28px", md: "32px" },
    },
  },

  // Display patterns
  display: {
    hideOnMobile: { xs: "none", sm: "flex" },
    hideOnTablet: { sm: "none", md: "flex" },
    hideOnDesktop: { xs: "flex", md: "none" },
    showOnMobileOnly: { xs: "flex", sm: "none" },
    showOnTabletUp: { xs: "none", sm: "flex" },
    showOnDesktopUp: { xs: "none", md: "flex" },
  },
} as const;

export const createResponsiveValue = <T>(
  mobile: T,
  tablet?: T,
  desktop?: T,
  largeDesktop?: T
) => ({
  xs: mobile,
  sm: tablet ?? mobile,
  md: desktop ?? tablet ?? mobile,
  lg: largeDesktop ?? desktop ?? tablet ?? mobile,
});

export const getNavigationStyles = () => ({
  mobile: {
    fontSize: "11px",
    padding: "6px 12px",
    minWidth: "60px",
    margin: "0 2px",
    letterSpacing: "0.5px",
  },
  tablet: {
    fontSize: "12px",
    padding: "8px 16px",
    minWidth: "80px",
    margin: "0 4px",
    letterSpacing: "0.8px",
  },
  desktop: {
    fontSize: "14px",
    padding: "12px 24px",
    minWidth: "100px",
    margin: "0 8px",
    letterSpacing: "1px",
  },
});

export const getChatStyles = () => ({
  container: {
    padding: responsivePatterns.spacing.containerPadding,
    gap: responsivePatterns.spacing.gap.medium,
  },
  input: {
    fontSize: responsivePatterns.components.input.fontSize,
    padding: responsivePatterns.spacing.sectionPadding,
    width: responsivePatterns.layout.width.withPadding,
  },
  message: {
    fontSize: responsivePatterns.typography.body,
    maxWidth: responsivePatterns.layout.maxWidth,
  },
  sidebar: {
    display: responsivePatterns.display.hideOnMobile,
  },
});

export const getFormStyles = () => ({
  container: {
    maxWidth: responsivePatterns.layout.width.form,
    padding: responsivePatterns.spacing.containerPadding,
    gap: responsivePatterns.spacing.gap.medium,
  },
  input: {
    height: responsivePatterns.components.input.height,
    fontSize: responsivePatterns.components.input.fontSize,
    borderRadius: responsivePatterns.layout.borderRadius,
  },
  button: {
    height: responsivePatterns.components.button.height,
    fontSize: responsivePatterns.components.button.fontSize,
    borderRadius: responsivePatterns.layout.borderRadius,
  },
});

export type ResponsiveValue<T = string | number> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

export type DeviceType = "mobile" | "tablet" | "desktop" | "largeDesktop";

export type ResponsiveConfig<T> = {
  mobile: T;
  tablet?: T;
  desktop?: T;
  largeDesktop?: T;
};
