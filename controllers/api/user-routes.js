const router = require('express').Router();
const { User } = require('../../models');

// creates new user
router.post('/', async (req, res) => {
    try {
        // creates new User 
        const newUser  = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        // save the session so that user stay logged in
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// create login routes
router.post('/login', async (req, res) => {
    try {
        // matches the username of the input with database
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        // if user doesnt exist, send error
        if (!user) {
            res.status(400).json({ message: 'invalid credentials!' });
            return;
        }
        // checks password using the function
        const password = user.checkPassword(req.body.password);
        // if password is false, send error
        if(!password) {
            res.status(400).json({ message: 'invalid credentials!' });
            return;
        }
        // save the login session so user stay logged in.
        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json({ user, message: 'Logged in!' });
        });
    } catch (err) {
        res.status(400).json({ message: 'invalid credentials! '});
    }
});

// logout routes
router.post('/logout', (req, res) => {
    // first verify if user is logged in then destroy the session
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        // end the session anyways
        res.status(404).end();
    }
});

module.exports = router;