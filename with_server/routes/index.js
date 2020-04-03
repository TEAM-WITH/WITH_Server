var express = require('express');
var router = express.Router({mergeParams: true});
const utils = require('../module/utils/utils');
const responseMessage = require('../module/utils/responseMessage');
const statusCode = require('../module/utils/statusCode');
require('dotenv').config();

router.use('/auth', require('./Auth'));
router.use('/board', require('./Board'));
router.use('/mypage', require('./Mypage'));
router.use('/home', require('./Home'));
router.use('/chat', require('./Chat'));

router.get('/version/:os', async(req, res) => {
    const os = req.params.os;

    const android = {androidVer : process.env.ANDROID_VER, regionVer : process.env.REGION_VER};
    const ios = {iOSVer : process.env.IOS_VER, regionVer : process.env.REGION_VER};

    if(os == 0) {
        res.status(statusCode.OK).send(utils.successTrue(statusCode.OK, responseMessage.VERSION_SUCCESS, android));
        return;
    }
    else if(os == 1) {
        res.status(statusCode.OK).send(utils.successTrue(statusCode.OK, responseMessage.VERSION_SUCCESS, ios));
        return;
    }
    else {
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(statusCode.BAD_REQUEST, responseMessage.VERSION_FAIL));
        return;
    }
});

/* GET home page. */
router.get('/', function(req, res) {
    res.send('Welcome to the sweet WITH house ＼º▽º/<br><br><br>- with Fam : 환희 미정 은별 루희 남수 준 승준 민준 연주 하담<br>- contact us : with2020s@naver.com');
});

module.exports = router;