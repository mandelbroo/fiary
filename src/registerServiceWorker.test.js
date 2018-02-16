import registerServiceWorker from './registerServiceWorker'

let registerPromise = { }
let unregisterPromise = { }
const fakeServiceWorker = {
  register: jest.fn().mockImplementation(() => registerPromise = Promise.resolve({ })),
  ready: Promise.resolve({
    unregister: jest.fn().mockImplementation(() => unregisterPromise = Promise.resolve({ }))
  }),
}
navigator.serviceWorker = fakeServiceWorker
window.location.reload = jest.fn()


describe('register service worker', () => {
  it('successfully', async () => {
    process.env.NODE_ENV = 'production'

    const fakeFetch = jest.fn()
      .mockImplementation(() => Promise.resolve({
        status: 200,
        headers: {
          get: jest.fn().mockReturnValue('javascript')
        }
      }))
    window.fetch = fakeFetch
    registerServiceWorker()
    window.dispatchEvent(new Event('load'))
    expect(fakeFetch).toBeCalled()
    await registerPromise
    expect(fakeServiceWorker.register).toBeCalledWith('/service-worker.js')

    process.env.NODE_ENV = 'test'
  })
  it('not found', async () => {
    process.env.NODE_ENV = 'production'

    const fakeFetch = jest.fn()
      .mockImplementation(() => Promise.resolve({ status: 404 }))
    window.fetch = fakeFetch
    registerServiceWorker()
    window.dispatchEvent(new Event('load'))
    expect(fakeFetch).toBeCalled()
    await registerPromise
    const res = await fakeServiceWorker.ready
    expect(res.unregister).toBeCalled()
    await unregisterPromise
    expect(window.location.reload).toBeCalled()

    process.env.NODE_ENV = 'test'
  })
})
