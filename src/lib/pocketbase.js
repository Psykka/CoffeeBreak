import Pocketbase from 'pocketbase'

const URL = "https://coffeebreak.hop.sh"
const pb = new Pocketbase(URL)

const auth = (payload, type) => {
    const collection = pb.collection('users')

    switch (type) {
        case 'email':
            return collection.authWithPassword(payload.email, payload.password)
        case 'singin':
            return collection.create({
                ...payload,
                passwordConfirm: payload.password
            })
        case 'google':
            return collection.authWithOAuth2({ provider: 'google' })
        case 'instagram':
            return collection.authWithOAuth2({ provider: 'instagram' })
        default:
            break;
    }
}

export {
    pb,
    auth
}
