const sessionIgnores = [/login/, /api/];

function corsFilter(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}


module.exports = {
    corsFilter: corsFilter
};