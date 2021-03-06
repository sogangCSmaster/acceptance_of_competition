const express = require('express');
const router = express.Router();
const { navigationName } = require('../../navigation');
const help = require('../../models/help');

// li class active
router.use(navigationName("info"));

router.route("/info")
    .get((req, res, next) => {
        help.findOne({
            where: {
                helpName: "info"
            }
        }).then((info) => {
            res.render('info/index', { info });
        }).catch((err) => {
            next(err);
        })
    })

module.exports = router;