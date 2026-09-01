/**
 * Central state store with publisher-subscriber pattern
 */

class Store {
  constructor() {
    this.state = {
      theme: "dark",
      dateRange: "7d",
      selectedMetric: "views",
      sidebarOpen: true,
    };
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export const store = new Store();
