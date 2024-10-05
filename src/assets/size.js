const sizesMap = {
    xs: 30,
    sm: 35,
    md: 45,
    '': 45,
    lg: 55,
    xl: 65,
  };
  
function generateStyles() {
let styles = '';

for (const [sizeName, sizeValue] of Object.entries(sizesMap)) {
    const className = `size-${sizeName}`.trim();

    styles += `
    .${className} {
        width: ${sizeValue}px !important;
        height: ${sizeValue}px !important;
        font-size: ${sizeValue / 3}px !important;
    }
    `;
}

return styles;
}
  (function injectGeneratedStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = generateStyles(); 
    document.head.appendChild(styleSheet);
  })();
  
