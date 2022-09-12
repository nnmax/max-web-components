const PubSub = {
  eventMap: new Map<string, Array<() => void>>(),

  subscribe(eventName, fn) {
    if (this.eventMap.has(eventName)) {
      this.eventMap.get(eventName).push(fn);
      return;
    }
    this.eventMap.set(eventName, [fn]);
  },

  unsubscribe(eventName, fn) {
    if (this.eventMap.has(eventName)) {
      this.eventMap.set(eventName, this.eventMap.get(eventName).filter((f) => f !== fn));
    }
  },

  publish(eventName, data) {
    if (this.eventMap.has(eventName)) {
      this.eventMap.get(eventName).forEach((functions) => functions(data));
    }
  },
};

export default PubSub;
