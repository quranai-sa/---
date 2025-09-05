/**
 * Performance optimization utilities
 */

// Lazy Loading for Images
export const lazyLoadImage = (img: HTMLImageElement, src: string) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = src;
        observer.unobserve(img);
      }
    });
  });
  observer.observe(img);
};

// Debounce function for search
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Virtual Scrolling for large lists
export class VirtualScroller {
  private container: HTMLElement;
  private itemHeight: number;
  private visibleItems: number;
  private totalItems: number;
  private scrollTop: number = 0;
  private startIndex: number = 0;
  private endIndex: number = 0;

  constructor(
    container: HTMLElement,
    itemHeight: number,
    visibleItems: number,
    totalItems: number
  ) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.visibleItems = visibleItems;
    this.totalItems = totalItems;
    this.setupScrollListener();
  }

  private setupScrollListener() {
    this.container.addEventListener('scroll', this.handleScroll.bind(this));
    this.updateVisibleRange();
  }

  private handleScroll() {
    this.scrollTop = this.container.scrollTop;
    this.updateVisibleRange();
  }

  private updateVisibleRange() {
    this.startIndex = Math.floor(this.scrollTop / this.itemHeight);
    this.endIndex = Math.min(
      this.startIndex + this.visibleItems + 1,
      this.totalItems
    );
  }

  getVisibleRange() {
    return { startIndex: this.startIndex, endIndex: this.endIndex };
  }
}

// Memory management
export class MemoryManager {
  private static cache = new Map<string, any>();
  private static maxSize = 100;

  static set(key: string, value: any) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  static get(key: string) {
    return this.cache.get(key);
  }

  static clear() {
    this.cache.clear();
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();

  static startTiming(label: string) {
    performance.mark(`${label}-start`);
  }

  static endTiming(label: string) {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const measure = performance.getEntriesByName(label)[0];
    if (measure) {
      const times = this.metrics.get(label) || [];
      times.push(measure.duration);
      this.metrics.set(label, times);
    }
  }

  static getMetrics() {
    const result: Record<string, { avg: number; min: number; max: number }> = {};
    
    this.metrics.forEach((times, label) => {
      result[label] = {
        avg: times.reduce((a, b) => a + b, 0) / times.length,
        min: Math.min(...times),
        max: Math.max(...times)
      };
    });
    
    return result;
  }
}

// Bundle splitting helper
export const loadComponent = async (componentName: string) => {
  try {
    const module = await import(`../components/${componentName}.tsx`);
    return module;
  } catch (error) {
    console.error(`Failed to load component ${componentName}:`, error);
    return null;
  }
};

// Image optimization
export const optimizeImage = (src: string, width?: number, quality: number = 80): string => {
  if (!width) return src;
  
  // For external images, you might want to use a service like Cloudinary
  // For now, we'll return the original src
  return src;
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/images/quran-complex-logo.png',
    '/audio/sample1.wav',
    '/audio/sample2.wav',
    '/audio/sample3.wav'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.endsWith('.png') ? 'image' : 'audio';
    document.head.appendChild(link);
  });
};
