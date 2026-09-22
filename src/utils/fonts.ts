import localFont from 'next/font/local';

export const avantGarde = localFont({
  src: [
    { path: '../app/fonts/ITCAvantGardeStd-XLt.woff', weight: '200', style: 'normal' },
    { path: '../app/fonts/ITCAvantGardeStd-XLtObl.woff', weight: '200', style: 'oblique' },
    { path: '../app/fonts/ITCAvantGardeStd-Bk.woff', weight: '300', style: 'normal' },
    { path: '../app/fonts/ITCAvantGardeStd-BkObl.woff', weight: '300', style: 'oblique' },
    { path: '../app/fonts/ITCAvantGardeStd-Md.woff', weight: '500', style: 'normal' },
    { path: '../app/fonts/ITCAvantGardeStd-MdObl.woff', weight: '500', style: 'oblique' },
    { path: '../app/fonts/ITCAvantGardeStd-Demi.woff', weight: '600', style: 'normal' },
    { path: '../app/fonts/ITCAvantGardeStd-DemiObl.woff', weight: '600', style: 'oblique' },
    { path: '../app/fonts/ITCAvantGardeStd-Bold.woff', weight: '700', style: 'normal' },
    { path: '../app/fonts/ITCAvantGardeStd-BoldObl.woff', weight: '700', style: 'oblique' },  
  ],
  variable: '--font-avant-garde', // This creates the CSS variable
});