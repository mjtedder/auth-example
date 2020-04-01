const jwt = require('jsonwebtoken')
const user = require('../../models/dummyUser')
const router = require('express').Router()

const checkToken = (req, res, next) => {
	const header = req.headers['authorization']

	if (typeof header !== 'undefined') {
		const bearer = header.split(' ')
		const token = bearer[1]

		req.token = token
		next()
	} else {
		res.sendStatus(403)
	}
}

router.post('/user/login', (req, res, next) => {
	const { body } = req
	const { username } = body
	const { password } = body

	if (username === user.username && password === user.password) {
		jwt.sign({ user }, 'privateKey', { expiresIn: '1hr' }, (err, token) => {
			if (err) {
				console.log(err)
			}
			res.send(token)
		})
	} else {
		console.log('ERROR: Could not log in')
	}
})

router.get('/user/data', checkToken, (req, res) => {
	jwt.verify(req.token, 'privateKey', (err, authorizedData) => {
		if (err) {
			console.log('ERROR: Could not connect to the protected route')
			res.sendStatus(403)
		} else {
			res.json({
				message: 'Successful log in',
				authorizedData
			})
			console.log('SUCCESS: Connected to protected route')
		}
	})
})

module.exports = router;
