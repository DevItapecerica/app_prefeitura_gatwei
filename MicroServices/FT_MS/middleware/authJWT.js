const jwt = require("jsonwebtoken");
require("dotenv").config({ path: `${__dirname}/../config/.env` });

const verifyToken = async (request, reply) => {
    try {
        const token = request.headers["x-access-token"].split(" ")[1];
        if (!token)
          throw {statusCode: 403, auth: false, message: "No token provided." };
      
        await jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
          if (err) throw { status: 401, message: "Incorrect Token." };
      
          request.userId = decoded.id;
          request.role = decoded.role_id;
        });
    } catch (error) {
        throw error;
    }

};

module.exports = verifyToken;
