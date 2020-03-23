class Utils {
    static getBearerToken(bearer){
        var token = bearer.split(" ").pop();
        return token;
    }
    static getBearerTokenFromCall(call){
        var authorization = call['metadata']['_internal_repr']['authorization'];
        var bearer = "";
        if(typeof authorization != 'undefined'){
            bearer = authorization[0];
        }
        var token = bearer.split(" ").pop();
        return token;
    }
}
module.exports.Utils = Utils;