const tagger = require('../../services/tags')
const Tag = require('../../models/tag')

describe('tags service', () => {
	describe('.post([{ name }])', () => {
		it('defined', () => expect(tagger.post).toBeDefined())
		it('saves tags', async () => {
			expect.assertions(5)
			const tagNames = [{name: `tag${Date.now()}1`}, {name: `tag${Date.now()}2`}]
			const tags = await tagger.post(tagNames)
			expect(tags).toBeDefined()
			expect.arrayContaining(tags)
			expect(tags.length).toBe(2)
			expect(
				tags.map(tag => {return {name: tag.attributes.name}})
			).toMatchObject(tagNames)
			tags.forEach(tag => expect(tag.attributes.id).toBeDefined())
		})
		it('error on duplicate', async () => {
			expect.assertions(2)
			const tag = {name: `test${Date.now()}`}
			await Tag.create(tag)
			await tagger.post([tag]).catch(err => {
					expect(err).toBeDefined()
					expect(
						err.message
						.includes('duplicate key value violates unique constraint "name"')
					).toBeTruthy()
				})
		})
	})

	describe('.get( fieldName, values )', () => {
		it('defined', () => expect(tagger.get).toBeDefined())
		describe('find tags', () => {
			let created = []

			beforeAll(async () => {
				const data = [{name: Date.now()}, {name: Date.now() + 1}]
				created = await tagger.post(data)
			})

			it('by id', async () => {
				const collectIds = created.map(tag => tag.attributes.id)
				const found = await tagger.get('id', collectIds)
				expect(found).toBeDefined()
				expect(found.length).toBe(2)
				expect(found[0]).toHaveProperty('attributes')
			})
			it('by name', async () => {
				const collectNames = created.map(tag => tag.attributes.name)
				const found = await tagger.get('name', collectNames)
				expect(found).toBeDefined()
				expect(found.length).toBe(2)
				expect(found[0]).toHaveProperty('attributes')
			})
		})
	})
})
