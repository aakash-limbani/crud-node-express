const httpStatus = require('http-status')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const passport = require('passport')
const { jwtStrategy } = require('./src/config/passport')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const session = require('express-session')
const timeout = require('connect-timeout')
const bodyParser = require('body-parser')

const oneDay = 1000 * 60 * 60 * 24

const indexRouter = require('./routes/index')
const routes = require('./routes/v1')

const app = express()

const ApiError = require('./src/utils/ApiError')
const { errorConverter, errorHandler } = require('./src/utils/error')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))

// Time out for all requests
app.use(timeout('10s'))

// To limit request payload size
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))

// CSP helps prevent cross-site scripting (XSS) attacks by controlling which sources of content are allowed to be loaded and executed on your page. You can set the CSP header using the helmet middleware
app.use(helmet.xContentTypeOptions())

// The X-Content-Type-Options header helps prevent browsers from MIME-sniffing and forcing the content type to adhere to what is declared in the response.
app.use(helmet.frameguard({ action: 'deny' }))

// The X-Frame-Options header helps prevent clickjacking attacks by controlling whether your page can be loaded within a frame or iframe.
app.use(helmet.xssFilter())

// The X-XSS-Protection header helps prevent reflected XSS attacks by enabling the browser's built-in XSS filter
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }))

// HSTS header instructs browsers to only access your application over HTTPS, enhancing security against man-in-the-middle attacks.
// Set security headers using helmet middleware
// app.use(helmet.noCache())
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }))
// app.use(helmet.expectCt({ enforce: true, maxAge: 86400 }))

// const corsOptions = {
//     origin: 'https://yourdomain.com'
// }
// app.use(cors(corsOptions))

// parse json request
app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// set security HTTP heades
app.use(helmet())

// sanitize request
app.use(xss())
app.use(mongoSanitize())

// gzip compression
app.use(compression())

app.use(express.static(path.join(__dirname, 'public')))

// jwt authentication
app.use(session({
    secret: 'SECRET',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)
app.use(passport.session())

// enable cors
app.use(cors())

app.use('/', indexRouter)
app.use('/v1', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Page Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

module.exports = app
