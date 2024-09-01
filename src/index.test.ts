import { describe, expect, it } from 'bun:test'
import { app } from '.'
import { users } from './users'

const testers = [
  {
    id: 'p-05',
    name: 'Walter',
    age: 56,
    origin: 'Earth',
    admin: false,
  },
  {
    id: 'p-05',
    name: 'Mavis',
    age: 21,
    origin: 'Luna',
    admin: true,
  },
]

describe('Elysia', () => {
  it('read all success', async () => {
    const response = await app
      .handle(new Request('http://localhost/read'))
      .then((res) => res.json())

    expect(response).toEqual(users)
  })

  it('read one success', async () => {
    const response = await app
      .handle(new Request('http://localhost/read/p-02'))
      .then((res) => res.json())

    expect(response).toEqual(users[1])
  })

  it('create one success', async () => {
    const response = await app
      .handle(
        new Request(`http://localhost/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testers[0]),
        })
      )
      .then((res) => res.json())

    expect(response).toEqual(testers[0])
  })

  it('update one success', async () => {
    const response = await app
      .handle(
        new Request(`http://localhost/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testers[1]),
        })
      )
      .then((res) => res.json())

    expect(response).toEqual(testers[1])
  })

  it('delete one success', async () => {
    const response = await app
      .handle(
        new Request(`http://localhost/delete/p-05`, {
          method: 'DELETE',
        })
      )
      .then((res) => res.json())

    expect(response).toEqual(testers[1])
  })
})
