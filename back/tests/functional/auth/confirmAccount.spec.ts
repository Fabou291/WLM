import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { registerBody } from '../helpers/AuthenticationHelper'

const ENDPOINT = 'api/auth/verify'
const params = 'fabou291@gmail.com?signature=eyJtZXNzYWdlIjoiL2FwaS9hdXRoL3ZlcmlmeS9mYWJvdTI5MUBnbWFpbC5jb20ifQ.IsJzBnr9LwWyNyhP1F0S9nE1sEF_Hcj795x1edfRgdU'

test.group('Auth confirmAccount', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    test('it should FAIL (400) when user is not found', async ({ client }) => {
        const response = await client.get(`${ENDPOINT}/${params}`)
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({
            "errors": [
                {
                    "message": "E_INVALID_CREDENTIALS: Invalid credantials.",
                },
            ],
        })
    })

    test('it should FAIL (400) when signedUrl is incorrect', async ({ client }) => {
        const response = await client.get(`${ENDPOINT}/bot@example.com?signedUrl=anInvalidSignature`)
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({
            "errors": [
                {
                    "message": "E_INVALID_SIGNED_URL: Signature is missing or URL was tampered.",
                },
            ],
        })
    })

    test('it should succeed (200)', async ({ client }) => {
        await client.post('api/auth/register').json(registerBody)
        const response = await client.get(`${ENDPOINT}/${params}`)
        response.assertAgainstApiSpec()
        response.assertStatus(204)
    })

})
