const middleware = {}

middleware['admin'] = require('../client/middleware/admin.js')
middleware['admin'] = middleware['admin'].default || middleware['admin']

middleware['user'] = require('../client/middleware/user.js')
middleware['user'] = middleware['user'].default || middleware['user']

export default middleware
