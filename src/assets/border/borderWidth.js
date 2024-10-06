export function applyDynamicClass() {
  const elements = document.querySelectorAll('*');

  elements.forEach(element => {
    const classNames = element.className.split(' ');

    classNames.forEach(className => {
      const match = className.match(/^border-(\d+)-(solid|dashed|dotted|double|hidden|none)?$/); 
      if (match) {
        const value = match[1]; 
        const styleValue = match[2] || 'solid'; 

        if (!document.querySelector(`style[data-class="border-${value}-${styleValue}"]`)) {
          const style = document.createElement('style');
          style.setAttribute('data-class', `border-${value}-${styleValue}`);
          style.innerHTML = `.border-${value}-${styleValue} { 
                                border-width: ${value}px; 
                                border-color: black;
                                border-style: ${styleValue};
                              }`;
          document.head.appendChild(style);
        }

        element.classList.add(className);
      }
    });
  });
}
