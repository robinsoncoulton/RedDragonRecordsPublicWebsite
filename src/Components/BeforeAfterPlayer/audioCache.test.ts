import { clearAudioCache, fetchAudio } from "./audioCache";

// jsdom has no Cache Storage or Response, so fake the parts audioCache uses.
class FakeResponse {
  constructor(private body: ArrayBuffer, readonly status = 200, readonly headers = new Map([["Content-Type", "audio/wav"]])) {}
  get ok() {
    return this.status >= 200 && this.status < 300;
  }
  async arrayBuffer() {
    return this.body.slice(0);
  }
}

const store = new Map<string, FakeResponse>();
beforeEach(() => {
  store.clear();
  (global as any).Response = FakeResponse;
  (global as any).caches = {
    open: async () => ({
      match: async (key: string) => store.get(key),
      put: async (key: string, res: FakeResponse) => void store.set(key, res),
    }),
    delete: async () => store.size > 0 && (store.clear(), true),
  };
});

const bytes = (n: number) => new Uint8Array([n, n, n]).buffer;
const flush = () => new Promise((r) => setTimeout(r, 0));

test("downloads once, then plays from the cache until logout clears it", async () => {
  const fetchMock = jest.fn(async () => new FakeResponse(bytes(7)));
  (global as any).fetch = fetchMock;

  expect(new Uint8Array(await fetchAudio("/versions/a/stream"))).toEqual(new Uint8Array([7, 7, 7]));
  await flush();
  expect(new Uint8Array(await fetchAudio("/versions/a/stream"))).toEqual(new Uint8Array([7, 7, 7]));
  expect(fetchMock).toHaveBeenCalledTimes(1);

  expect(await clearAudioCache()).toBe(true);
  await fetchAudio("/versions/a/stream");
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

test("never caches a failed response", async () => {
  (global as any).fetch = jest.fn(async () => new FakeResponse(bytes(0), 403));
  await expect(fetchAudio("/versions/b/stream")).rejects.toThrow("403");
  expect(store.size).toBe(0);
});
