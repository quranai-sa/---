/**
 * Error monitoring and alerting system
 */

export interface ErrorInfo {
  message: string;
  stack?: string;
  component?: string;
  userId?: string;
  timestamp: number;
  userAgent: string;
  url: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export class ErrorMonitor {
  private static instance: ErrorMonitor;
  private errors: ErrorInfo[] = [];
  private maxErrors = 1000;
  private apiEndpoint = process.env.REACT_APP_ERROR_REPORTING_URL || '';

  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor();
    }
    return ErrorMonitor.instance;
  }

  private constructor() {
    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.captureError({
        message: event.message,
        stack: event.error?.stack,
        component: 'Global',
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        severity: 'high'
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        component: 'Promise',
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        severity: 'high'
      });
    });
  }

  captureError(errorInfo: ErrorInfo) {
    // Add to local storage
    this.errors.push(errorInfo);
    
    // Keep only the latest errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Store in localStorage for persistence
    try {
      localStorage.setItem('app_errors', JSON.stringify(this.errors));
    } catch (e) {
      console.warn('Failed to store errors in localStorage:', e);
    }

    // Send to monitoring service if configured
    if (this.apiEndpoint) {
      this.sendToMonitoringService(errorInfo);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Captured Error:', errorInfo);
    }
  }

  private async sendToMonitoringService(errorInfo: ErrorInfo) {
    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorInfo)
      });
    } catch (e) {
      console.warn('Failed to send error to monitoring service:', e);
    }
  }

  getErrors(): ErrorInfo[] {
    return [...this.errors];
  }

  clearErrors() {
    this.errors = [];
    localStorage.removeItem('app_errors');
  }

  getErrorStats() {
    const severityCounts = this.errors.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: this.errors.length,
      bySeverity: severityCounts,
      lastError: this.errors[this.errors.length - 1]
    };
  }
}

// Performance monitoring
export class PerformanceTracker {
  private static instance: PerformanceTracker;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker();
    }
    return PerformanceTracker.instance;
  }

  startTiming(label: string) {
    performance.mark(`${label}-start`);
  }

  endTiming(label: string) {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const measure = performance.getEntriesByName(label)[0];
    if (measure) {
      const times = this.metrics.get(label) || [];
      times.push(measure.duration);
      this.metrics.set(label, times);
    }
  }

  getMetrics() {
    const result: Record<string, { avg: number; min: number; max: number; count: number }> = {};
    
    this.metrics.forEach((times, label) => {
      result[label] = {
        avg: times.reduce((a, b) => a + b, 0) / times.length,
        min: Math.min(...times),
        max: Math.max(...times),
        count: times.length
      };
    });
    
    return result;
  }
}

// User analytics
export class UserAnalytics {
  private static instance: UserAnalytics;
  private events: Array<{ event: string; data: any; timestamp: number }> = [];

  static getInstance(): UserAnalytics {
    if (!UserAnalytics.instance) {
      UserAnalytics.instance = new UserAnalytics();
    }
    return UserAnalytics.instance;
  }

  track(event: string, data: any = {}) {
    const eventData = {
      event,
      data,
      timestamp: Date.now()
    };
    
    this.events.push(eventData);
    
    // Keep only last 1000 events
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }

    // Send to analytics service if configured
    this.sendToAnalytics(eventData);
  }

  private async sendToAnalytics(eventData: any) {
    // In a real application, you would send this to your analytics service
    console.log('Analytics Event:', eventData);
  }

  getEvents() {
    return [...this.events];
  }
}

// Health check
export class HealthChecker {
  private static instance: HealthChecker;
  private checks: Array<{ name: string; check: () => Promise<boolean> }> = [];

  static getInstance(): HealthChecker {
    if (!HealthChecker.instance) {
      HealthChecker.instance = new HealthChecker();
    }
    return HealthChecker.instance;
  }

  addCheck(name: string, check: () => Promise<boolean>) {
    this.checks.push({ name, check });
  }

  async runChecks() {
    const results = await Promise.allSettled(
      this.checks.map(async ({ name, check }) => ({
        name,
        status: await check() ? 'healthy' : 'unhealthy'
      }))
    );

    return results.map((result, index) => ({
      name: this.checks[index].name,
      status: result.status === 'fulfilled' ? result.value.status : 'error',
      error: result.status === 'rejected' ? result.reason : undefined
    }));
  }
}

// Initialize monitoring
export const initializeMonitoring = () => {
  const errorMonitor = ErrorMonitor.getInstance();
  const performanceTracker = PerformanceTracker.getInstance();
  const userAnalytics = UserAnalytics.getInstance();
  const healthChecker = HealthChecker.getInstance();

  // Add health checks
  healthChecker.addCheck('localStorage', async () => {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch {
      return false;
    }
  });

  healthChecker.addCheck('fetch', async () => {
    try {
      await fetch('/health', { method: 'HEAD' });
      return true;
    } catch {
      return false;
    }
  });

  return {
    errorMonitor,
    performanceTracker,
    userAnalytics,
    healthChecker
  };
};
