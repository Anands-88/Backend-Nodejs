// const details

module.exports = function (permittedRoles) {
  return function (req, res, next) {
    // first get the user from the req
    // console.log("user req",req.user)
    const user = req.user;

    // check if user has any of the permittedRoles
    let isPermitted = false;
    //   ["seller", "admin"]
    permittedRoles.map((role) => {
      // seller
      // [ "customer" ]
      if (user.role.includes(role)) {
        isPermitted = true;
      }
    });

    // if not then throw an error
    if (!isPermitted) { // if not permitted, send message as permission denied
      return res.status(403).send({ message: "Permission denied,Only Seller or Admin allowed to Post" });
    }
    // if yes then return next
    return next();
  };
};
