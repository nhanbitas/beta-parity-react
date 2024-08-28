const typography = ({ addUtilities }) => {
  const typographyStyles = {
    '.text-code-01': {
      '@apply font-mono text-xs font-normal tracking-wider': {}
    },
    '.text-code-02': {
      '@apply font-mono text-sm font-normal tracking-wider': {}
    },
    '.text-label-01': {
      '@apply font-sans text-xs font-normal tracking-wider': {}
    },
    '.text-label-02': {
      '@apply font-sans text-sm font-normal leading-[1.125rem] tracking-wide': {}
    },
    '.text-helper-01': {
      '@apply font-sans text-xs font-normal tracking-wider': {}
    },
    '.text-helper-02': {
      '@apply font-sans text-sm font-normal leading-[1.125rem] tracking-wide': {}
    },
    '.text-legal-01': {
      '@apply font-sans text-xs font-normal tracking-wider': {}
    },
    '.text-legal-02': {
      '@apply font-sans text-sm font-normal leading-[1.125rem] tracking-wide': {}
    },
    '.text-body-compact-01': {
      '@apply font-sans text-sm font-normal leading-[1.125rem] tracking-wide': {}
    },
    '.text-body-compact-02': {
      '@apply font-sans text-base font-normal leading-[1.375rem]': {}
    },
    '.text-body-01': {
      '@apply font-sans text-sm font-normal tracking-wide': {}
    },
    '.text-body-02': {
      '@apply font-sans text-base font-normal': {}
    },
    '.text-heading-compact-01': {
      '@apply font-sans text-sm font-semibold leading-[1.125rem] tracking-wide': {}
    },
    '.text-heading-compact-02': {
      '@apply font-sans text-base font-semibold leading-[1.375rem]': {}
    },
    '.text-heading-01': {
      '@apply font-sans text-sm font-medium tracking-wide': {}
    },
    '.text-heading-02': {
      '@apply font-sans text-base font-medium': {}
    },
    '.text-heading-03': {
      '@apply font-sans text-xl font-text': {}
    },
    '.text-heading-04': {
      '@apply font-sans text-[1.5rem] font-text leading-[2rem]': {}
    },
    '.text-heading-05': {
      '@apply font-sans text-[2.25rem] font-normal leading-[2.75rem]': {}
    },
    '.text-heading-06': {
      '@apply font-sans text-[2.625rem] font-normal leading-[3.125rem]': {}
    },
    '.text-heading-07': {
      '@apply font-sans text-[3.375rem] font-light leading-[4rem]': {}
    }
  };
  addUtilities(typographyStyles);
};

export default typography;
