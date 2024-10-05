const sizesMap = {
    none: -9999,
    xs: -2,
    sm: -1,
    md: 0,
    '': 0,
    lg: 1,
    xl: 2,
    circle: 999,
  };
  
  // Coefficient for scaling the size values
  const coefficient = '0.35rem';
  
  // Function to compute the border-radius based on the size value and coefficient
  function computeBorderRadius(sizeValue) {
    return Math.pow(1.618, sizeValue) * parseFloat(coefficient) + 'rem';
  }
  
  // Extract the size names from the sizes map
  const sizes = Object.keys(sizesMap);
  
  // Define the statuses
  const statuses = [
    '',
    't',
    'r',
    'b',
    'l',
    's',
    'e',
    'tr',
    'tl',
    'br',
    'bl',
    'ss',
    'se',
    'ee',
    'es',
  ];
  
  // Map statuses to their corresponding CSS border-radius properties
  const statusProperties = {
    '': ['border-radius'],
    t: ['border-top-left-radius', 'border-top-right-radius'],
    r: ['border-top-right-radius', 'border-bottom-right-radius'],
    b: ['border-bottom-right-radius', 'border-bottom-left-radius'],
    l: ['border-top-left-radius', 'border-bottom-left-radius'],
    tr: ['border-top-right-radius'],
    tl: ['border-top-left-radius'],
    br: ['border-bottom-right-radius'],
    bl: ['border-bottom-left-radius'],
    s: ['border-start-start-radius', 'border-end-start-radius'],
    e: ['border-start-end-radius', 'border-end-end-radius'],
    ss: ['border-start-start-radius'],
    se: ['border-start-end-radius'],
    ee: ['border-end-end-radius'],
    es: ['border-end-start-radius'],
  };
  
  // Function to generate the CSS styles based on the sizes and statuses
  function generateStyles() {
    let styles = '';
  
    sizes.forEach((sizeName) => {
      statuses.forEach((status) => {
        const sizeValue = sizesMap[sizeName];
        const computedRadius = computeBorderRadius(sizeValue);
        let className = 'roundedd';
  
        if (status) {
          className += `-${status}`;
        }
  
        className += `-${sizeName}`;
  
        const properties = statusProperties[status] || ['border-radius'];
  
        styles += `.${className} {`;
        properties.forEach((property) => {
          styles += `${property}: ${computedRadius};`;
        });
        styles += '}';
      });
    });
  
    return styles;
  }
  
  // Immediately inject the generated styles when the module is imported
  (function injectGeneratedStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = generateStyles(); // Generate and inject styles
    document.head.appendChild(styleSheet);
  })();
  
