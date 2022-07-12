const PubSub = {
    eventMap: new Map,
    subscribe: function (eventName, fn) {
        if (this.eventMap.has(eventName)) {
            this.eventMap.get(eventName).push(fn);
            return;
        }
        this.eventMap.set(eventName, [fn]);
    },
    unsubscribe: function (eventName, fn) {
        if (this.eventMap.has(eventName)) {
            this.eventMap.set(eventName, this.eventMap.get(eventName).filter(f => f !== fn));
        }
    },
    publish: function (eventName, data) {
        if (this.eventMap.has(eventName)) {
            this.eventMap.get(eventName).forEach(functions => functions(data));
        }
    }
};

export { PubSub as default };
