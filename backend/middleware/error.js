const errorHandler = (err, req, res, next) => {
    const code = err.status || 500;
    res.status(code).json({msg: err.message});
};

export default errorHandler;