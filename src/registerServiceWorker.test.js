import registerServiceWorker from './registerServiceWorker'

const originalFetch = window.fetch
const originalServiceWorker = navigator.serviceWorker
const originalLocationReload = window.location.reload

let registerPromise = { }
let unregisterPromise = { }

const fakeServiceWorker = {
  register: jest.fn().mockImplementation(() => registerPromise = Promise.resolve({ })),
  ready: Promise.resolve({
    unregister: jest.fn().mockImplementation(() => unregisterPromise = Promise.resolve({ }))
  }),
}

describe('register service worker', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production'
  })

  afterEach(() => {
    navigator.serviceWorker = originalServiceWorker
    window.location.reload = originalLocationReload
    window.fetch = originalFetch
    process.env.NODE_ENV = 'test'
  })

  it('successfully', async () => {
    const fakeFetch = jest.fn()
      .mockImplementation(() => Promise.resolve({
        status: 200,
        headers: {
          get: jest.fn().mockReturnValue('javascript')
        }
      }))
    navigator.serviceWorker = fakeServiceWorker
    window.fetch = fakeFetch

    registerServiceWorker()
    window.dispatchEvent(new Event('load'))
    expect(fakeFetch).toBeCalled()
    await registerPromise
    expect(fakeServiceWorker.register).toBeCalledWith('/service-worker.js')
  })
  it('not found', async () => {
    process.env.NODE_ENV = 'production'

    const fakeFetch = jest.fn()
      .mockImplementation(() => Promise.resolve({ status: 404 }))
    window.fetch = fakeFetch
    navigator.serviceWorker = fakeServiceWorker
    window.location.reload = jest.fn()

    registerServiceWorker()
    window.dispatchEvent(new Event('load'))
    expect(fakeFetch).toBeCalled()
    await registerPromise
    const res = await fakeServiceWorker.ready
    expect(res.unregister).toBeCalled()
    await unregisterPromise
    expect(window.location.reload).toBeCalled()
  })
})
