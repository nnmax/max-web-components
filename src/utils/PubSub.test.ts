import PubSub from './PubSub';

describe('PubSub.js', () => {
  const fn1 = jest.fn();
  const fn2 = jest.fn();
  const eventName = 'test-event-name';

  function subscribe(name, ...fns) {
    fns.forEach((fn) => PubSub.subscribe(name, fn));
  }

  function unsubscribe(name?: string, ...fns) {
    if (name === undefined) {
      PubSub.eventMap.forEach((_, key, map) => {
        map.set(key, []);
      });
      return;
    }
    if (fns.length === 0) {
      // eslint-disable-next-line no-param-reassign
      fns = fns.concat(fn1, fn2);
    }
    fns.forEach((fn) => PubSub.unsubscribe(name, fn));
  }

  afterEach(() => {
    unsubscribe();
  });

  it('Should be possible to subscribe to events', () => {
    subscribe(eventName, fn1, fn2);
    expect(PubSub.eventMap.has(eventName)).toBe(true);
    expect(PubSub.eventMap.get(eventName)).toEqual([fn1, fn2]);
  });

  it('Should be possible to unsubscribe to events', () => {
    subscribe(eventName, fn1, fn2);
    unsubscribe(eventName, fn1, fn2);
    expect(PubSub.eventMap.get(eventName)).toHaveLength(0);
  });

  it('Should be possible to publish event', () => {
    subscribe(eventName, fn1, fn2);
    PubSub.publish(eventName, 'data');
    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(fn1).toHaveBeenCalledWith('data');
    expect(fn2).toHaveBeenCalledWith('data');
  });
});
