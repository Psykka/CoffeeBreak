import Pocketbase from 'pocketbase'

const URL = "https://coffeebreak.hop.sh"
const pb = new Pocketbase(URL)

const auth = async (payload, type) => {
    const collection = pb.collection('users')

    switch (type) {
        case 'email':
            return await collection.authWithPassword(payload.email, payload.password)
        case 'singin':
            return await collection.create({
                ...payload,
                passwordConfirm: payload.password
            })
        case 'google':
            return await collection.authWithOAuth2({ provider: 'google' })
        case 'instagram':
            return await collection.authWithOAuth2({ provider: 'instagram' })
        default:
            break;
    }
}

export {
    pb,
    auth
}
