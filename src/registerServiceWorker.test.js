import registerServiceWorker, { unregister } from './registerServiceWorker'

const originalFetch = window.fetch
const originalServiceWorker = navigator.serviceWorker
const originalLocationReload = window.location.reload

let registerPromise = { }
let unregisterPromise = { }

const fakeServiceWorker = {
	register: jest.fn().mockImplementation(() => registerPromise = Promise.resolve({
		installing: { state: 'installed' }
	})),
	ready: Promise.resolve({
		unregister: jest.fn().mockImplementation(() => unregisterPromise = Promise.resolve({ }))
	}),
}

const fakeFetch = jest.fn()
	.mockImplementation(() => Promise.resolve({
		status: 200,
		headers: {
			get: jest.fn().mockReturnValue('javascript')
		}
	}))

describe('register service worker', () => {
	beforeEach(() => {
		process.env.NODE_ENV = 'production'
		navigator.serviceWorker = fakeServiceWorker
		window.fetch = fakeFetch
	})

	afterEach(() => {
		unregister()
		navigator.serviceWorker = originalServiceWorker
		window.location.reload = originalLocationReload
		window.fetch = originalFetch
		process.env.NODE_ENV = 'test'
	})

	it('register ok', async () => {
		registerServiceWorker()
		window.dispatchEvent(new Event('load'))
		expect(fakeFetch).toBeCalled()
		await registerPromise
		expect(fakeServiceWorker.register).toBeCalledWith('/service-worker.js')
	})
	it('register fail (for sake of coverage)', async () => {
		const fakeRegisterFailWorker = {
			register: jest.fn().mockImplementation(() => Promise.reject('test error')),
			ready: Promise.resolve({ unregister: jest.fn() }),
		}
		navigator.serviceWorker = fakeRegisterFailWorker
		registerServiceWorker()
		window.dispatchEvent(new Event('load'))
	})
	it('install ok (for sake of coverage)', async () => {
		registerServiceWorker()
		window.dispatchEvent(new Event('load'))
		const registration = await registerPromise
		registration.onupdatefound()
		registration.installing.onstatechange() // when content is cached
		navigator.serviceWorker.controller = { }
		registration.installing.onstatechange() // not cached
	})
	it('not found', async () => {
		const fakeNotFoundFetch = jest.fn()
			.mockImplementation(() => Promise.resolve({ status: 404 }))
		window.fetch = fakeNotFoundFetch
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
	it('no connection (covering fetch.catch)', () => {
		const unregisterMockWorker = {
			...originalServiceWorker,
			ready: Promise.resolve({
				unregister: jest.fn().mockImplementation(() => unregisterPromise = Promise.resolve({ }))
			}),
		}
		window.fetch = originalFetch
		navigator.serviceWorker = unregisterMockWorker
		registerServiceWorker()
		window.dispatchEvent(new Event('load'))
	})
})
