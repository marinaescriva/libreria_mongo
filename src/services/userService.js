import User from "../models/User.js"

export const getUsersService = async () => {

    const users = await User
        .find()
        .select('-password')
        .populate('favouriteBooks', '-title')

        return users

}