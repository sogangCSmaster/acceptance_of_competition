const express = require('express');
const router = express.Router();
const help = require('../../../models/help');

router.route("/admin/info")
    .get((req, res, next) => {
        if(!req.session.adminId){
            return res.redirect("/admin");
        }
        help.findOne({
            where: {
                helpName: "info"
            }
        }).then((info) => {
            if(!info){
                help.create({
                    helpName: "info",
                    content: "모집요강이 비었습니다."
                }).then(() => {
                    return res.redirect("/admin/info");
                })
            }
            res.render('admin/info/index', { info });
        }).catch((err) => {
            next(err);
        })
    })
    .post((req, res, next) => {
        if(!req.session.adminId){
            return res.redirect("/admin");
        }
        var info = req.body.info;
        help.update({
            content: info
        }, {
            where: {
                helpName: "info"
            }
        }).then(() => {
            console.log("info updated!");
            res.redirect("/admin/info");
        })
    })

module.exports = router;