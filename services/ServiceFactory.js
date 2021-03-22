import usersService from './usersService'

const services = {
    users: usersService,

}

export const ServiceFactory = {
    get: name => services[name],
}
