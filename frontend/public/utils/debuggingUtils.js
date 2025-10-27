// Global debugging utilities for horizontal scroll issues
(function() {
  'use strict';
  
  // Function to log horizontal overflow issues
  function checkHorizontalOverflow() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const docWidth = document.documentElement.scrollWidth;
    const winWidth = window.innerWidth;
    
    if (docWidth > winWidth) {
      console.warn('⚠️ HORIZONTAL SCROLL DETECTED - Document is wider than viewport!');
      console.log('- Document scrollWidth:', docWidth);
      console.log('- Window innerWidth:', winWidth);
      console.log('- Overflow amount:', docWidth - winWidth, 'px');
      
      // Find elements causing overflow
      findOverflowingElements();
    }
  }
  
  // Function to find elements causing horizontal overflow
  function findOverflowingElements() {
    if (typeof document === 'undefined') return;
    
    const allElements = document.querySelectorAll('*');
    const overflowingElements = [];
    
    allElements.forEach((element, index) => {
      try {
        const rect = element.getBoundingClientRect();
        if (rect.width + rect.left > window.innerWidth) {
          overflowingElements.push({
            element: element,
            tagName: element.tagName,
            className: element.className,
            id: element.id,
            width: rect.width,
            left: rect.left,
            right: rect.right,
            overflowAmount: (rect.width + rect.left) - window.innerWidth
          });
        }
      } catch (e) {
        // Ignore elements that cause errors when getting bounding rect
      }
    });
    
    if (overflowingElements.length > 0) {
      console.log('⚠️ Elements causing horizontal overflow:');
      overflowingElements.forEach((item, i) => {
        console.log(`${i + 1}. ${item.tagName} ${item.id ? '#' + item.id : ''} ${item.className ? '.' + item.className.replace(/\s+/g, '.') : ''}`);
        console.log(`   Width: ${item.width}px, Left: ${item.left}px, Right: ${item.right}px`);
        console.log(`   Overflow: ${item.overflowAmount}px`);
      });
    }
  }
  
  // Function to monitor specific elements (tables, grids, etc.)
  function monitorSpecificElements() {
    if (typeof document === 'undefined') return;
    
    // Monitor tables
    const tables = document.querySelectorAll('table, .overflow-x-auto');
    tables.forEach((table, index) => {
      try {
        const rect = table.getBoundingClientRect();
        console.log(`Table/Grid ${index + 1} - Width: ${rect.width}px, Left: ${rect.left}px, Right: ${rect.right}px`);
        
        // Check if table extends beyond viewport
        if (rect.width + rect.left > window.innerWidth) {
          console.log(`⚠️ Table/Grid ${index + 1} extends beyond viewport by ${(rect.width + rect.left) - window.innerWidth}px`);
        }
      } catch (e) {
        // Ignore errors
      }
    });
  }
  
  // Initialize debugging when DOM is ready
  function initDebugging() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          console.log('🔍 Debugging utils initialized - checking for horizontal overflow...');
          checkHorizontalOverflow();
          monitorSpecificElements();
        }, 500); // Small delay to ensure all elements are rendered
      });
    } else {
      setTimeout(() => {
        console.log('🔍 Debugging utils initialized - checking for horizontal overflow...');
        checkHorizontalOverflow();
        monitorSpecificElements();
      }, 500);
    }
    
    // Also check on window resize
    window.addEventListener('resize', () => {
      setTimeout(checkHorizontalOverflow, 100);
    });
  }
  
  // Export functions for manual debugging if needed
  window.debuggingUtils = {
    checkHorizontalOverflow: checkHorizontalOverflow,
    findOverflowingElements: findOverflowingElements,
    monitorSpecificElements: monitorSpecificElements
  };
  
  // Initialize debugging
  initDebugging();
  
  console.log('📊 Global debugging utilities loaded');
})();