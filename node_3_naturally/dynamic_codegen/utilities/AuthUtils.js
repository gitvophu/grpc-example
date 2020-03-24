const {CLIENT} = require('../constant/app_const');
class AuthUtils {
    static checkClient(client_id,client_secret){
        console.log(client_id,client_secret)
        if(client_id === CLIENT.APP_CLIENT.id &&  client_secret === CLIENT.APP_CLIENT.secret){
            return true;
        }else{
            return false;
        }   
    }
    static checkClientFromCall(call){
        try{
            var client_id = call['metadata']['_internal_repr']['client_id'][0];
            var client_secret = call['metadata']['_internal_repr']['client_secret'][0];
            return this.checkClient(client_id,client_secret);
        }catch(e){
            return false;
        }

    }
}
module.exports.AuthUtils = AuthUtils;