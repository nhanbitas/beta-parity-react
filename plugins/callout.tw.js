
const plugin = ({ addBase }) => {



  const addedCalloutStyles = {
    '.callout.danger::before': {
      height: '1.5rem',
      width: '1.5rem',
      pointerEvents: 'none',
      maskPosition: 'center center',
      maskRepeat: 'no-repeat',
      maskImage: `url("data:image/svg+xml;utf8,<svg height='22px' width='22px' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='none' d='M12 8v4m0 4h.01M2 8.52v6.96c0 .24 0 .36.03.48.02.1.06.2.12.29.06.1.15.19.32.36l4.92 4.92c.17.17.26.26.36.32a1 1 0 0 0 .3.12c.1.03.23.03.47.03h6.96c.24 0 .36 0 .48-.03a1 1 0 0 0 .29-.12c.1-.06.19-.15.36-.32l4.92-4.92c.17-.17.26-.26.32-.36a1 1 0 0 0 .12-.3c.03-.1.03-.23.03-.47V8.52c0-.24 0-.36-.03-.48a1 1 0 0 0-.12-.29c-.06-.1-.15-.19-.32-.36l-4.92-4.92a2.14 2.14 0 0 0-.36-.32 1 1 0 0 0-.3-.12c-.1-.03-.23-.03-.47-.03H8.52c-.24 0-.36 0-.48.03a1 1 0 0 0-.29.12c-.1.06-.19.15-.36.32L2.47 7.39c-.17.17-.26.26-.32.36a1 1 0 0 0-.12.3c-.03.1-.03.23-.03.47Z' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`
    },
  
    '.callout.note::before': {
      height: '1.5rem',
      width: '1.5rem',
      pointerEvents: 'none',
      maskPosition: 'center center',
      maskRepeat: 'no-repeat',
      maskImage: `url("data:image/svg+xml;utf8,<svg height='22px' width='22px' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='none' d='M12 16v-4m0-4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`
    },
  
    '.callout.tip::before': {
      height: '1.5rem',
      width: '1.5rem',
      pointerEvents: 'none',
      maskPosition: 'center center',
      maskRepeat: 'no-repeat',
      maskImage: `url("data:image/svg+xml;utf8,<svg height='22px' width='22px' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='none' d='M12 2v1m-9 9H2m3.5-6.5-.6-.6m13.6.6.6-.6M22 12h-1m-11 1.5h4m-2 0v5m3.5-1.63a6 6 0 1 0-7 0v1.93c0 1.12 0 1.68.22 2.1.19.38.5.69.87.88.43.22.99.22 2.11.22h.6c1.12 0 1.68 0 2.1-.22a2 2 0 0 0 .88-.87c.22-.43.22-.99.22-2.11v-1.93Z' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`
    },
  
    '.callout.caution::before': {
      height: '1.5rem',
      width: '1.5rem',
      pointerEvents: 'none',
      maskPosition: 'center center',
      maskRepeat: 'no-repeat',
      maskImage: `url("data:image/svg+xml;utf8,<svg height='22px' width='22px' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='none' d='M12 9v4m0 4h.01m-1.4-13.1L2.4 18.1c-.46.79-.68 1.18-.65 1.5a1 1 0 0 0 .4.7c.27.2.72.2 1.63.2h16.45c.92 0 1.37 0 1.63-.2a1 1 0 0 0 .41-.7c.03-.32-.2-.71-.65-1.5L13.38 3.9c-.45-.8-.68-1.19-.97-1.32a1 1 0 0 0-.82 0c-.3.13-.52.53-.97 1.31Z' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`
    },
  
    '.callout.experimental::before': {
      height: '1.5rem',
      width: '1.5rem',
      pointerEvents: 'none',
      maskPosition: 'center center',
      maskRepeat: 'no-repeat',
      maskImage: `url("data:image/svg+xml;utf8,<svg height='22px' width='22px' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='none' d='m9.75 20.75 1.47.82c.29.16.43.23.58.27a1 1 0 0 0 .4 0c.15-.04.3-.11.58-.27l1.47-.82m-9-2.5-1.43-.8c-.3-.16-.45-.24-.56-.36a1 1 0 0 1-.21-.36C3 16.57 3 16.4 3 16.06V14.5m0-5V7.94c0-.34 0-.51.05-.67a1 1 0 0 1 .21-.36c.11-.12.26-.2.56-.37l1.43-.79m4.5-2.5 1.47-.82c.29-.16.43-.23.58-.27a1 1 0 0 1 .4 0c.15.04.3.11.58.27l1.47.82m4.5 2.5 1.43.8c.3.16.45.24.56.36.1.1.16.23.21.36.05.16.05.33.05.67V9.5m0 5v1.56c0 .34 0 .51-.05.67a1 1 0 0 1-.21.36c-.11.12-.26.2-.56.37l-1.43.79m-9-7.5L12 12m0 0 2.25-1.25M12 12v2.5M3 7l2.25 1.25m13.5 0L21 7m-9 12.5V22' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`
    },
  
    '.callout': {
      '@apply relative border-dashed border-2 border-gray-500 bg-gray-50 px-6 pb-4 pt-12 rounded-2xl': {}
    },
    '.callout::before': {
      '@apply absolute left-5 top-4 content-[""]': {}
    },
    '.callout > p:first-of-type': {
      '@apply absolute left-[3.25rem] top-4 text-lg font-semibold leading-6 text-inherit': {}
    },
    '.callout > p:not(:first-of-type)': {
      '@apply text-black': {}
    },
    '.callout > p:only-of-type': {
      '@apply static text-black text-body-02 mb-6 mt-4': {}
    },
    '.callout.danger': {
      '@apply border-red-500 bg-red-50 text-inherit before:bg-red-500 after:bg-red-200 text-red-500': {}
    },
    '.callout.note': {
      '@apply border-blue-500 bg-blue-50 text-inherit before:bg-blue-500 after:bg-blue-200 text-blue-500': {}
    },
    '.callout.tip': {
      '@apply border-sky-500 bg-sky-50 text-inherit before:bg-sky-500 after:bg-sky-200 text-sky-500': {}
    },
    '.callout.caution': {
      '@apply border-yellow-500 bg-yellow-50 text-inherit before:bg-yellow-500 after:bg-yellow-200 text-yellow-500': {}
    },
    '.callout.experimental': {
      '@apply border-violet-500 bg-violet-50 text-inherit before:bg-violet-500 after:bg-violet-200 text-violet-500': {}
    }
  };

  addBase(addedCalloutStyles);
};

export default plugin;