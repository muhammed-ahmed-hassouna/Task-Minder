export default () => ({
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    jwtSecretKey: process.env.JWT_SECRET_KEY
})