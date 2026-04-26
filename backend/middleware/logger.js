function logger(req,res,next){
    console.log(
        `${new Date(Date.now()).toISOString()} : ${req.method} : ${req.path}`
    );

    next();
}
export default logger;