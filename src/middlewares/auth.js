const adminAuth = (req, res, next) => {
    const token = "you are admin";
    const isAuthorised = token === "you are admin";

    if(!isAuthorised){
        res.status(401).send("Unauthorised Request...");
    }else{
        next();
    }
}

module.exports = {adminAuth}