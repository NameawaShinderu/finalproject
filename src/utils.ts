export const findMessageInput = (): HTMLElement | null => {
    const selectors = [
      '.msg-form__contenteditable',
      '[contenteditable="true"]',
      '[role="textbox"]',
      'div[data-placeholder]',
    ];
  
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
    
      const elementsArray = Array.from(elements); 
  
      for (const element of elementsArray) { 
        if (isVisible(element) && isLikelyMessageField(element)) {
          return element as HTMLElement;
        }
      }
    }
  
    return null;
  };
  
  const isVisible = (element: Element): boolean => {
    return !!(
      (element as HTMLElement).offsetWidth ||
      (element as HTMLElement).offsetHeight ||
      element.getClientRects().length
    );
  };
  
  const isLikelyMessageField = (element: Element): boolean => {
    const text = element.textContent?.toLowerCase() || '';
    const placeholder = element.getAttribute('data-placeholder')?.toLowerCase() || '';
    const ariaLabel = element.getAttribute('aria-label')?.toLowerCase() || '';
  
    return (
      text.includes('write a message') ||
      text.includes('send a message') ||
      text.includes('type a message') ||
      placeholder.includes('message') ||
      ariaLabel.includes('write a message')
    );
  };
  