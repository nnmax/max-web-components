declare const PubSub: {
    eventMap: Map<string, Function[]>;
    subscribe: (eventName: any, fn: any) => void;
    unsubscribe: (eventName: any, fn: any) => void;
    publish: (eventName: any, data: any) => void;
};
export default PubSub;
