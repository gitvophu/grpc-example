const {Utils} = require('../utilities/Utils');
const {user_obj} = require('../model_module/module_user');
const {dc_obj} = require('../model_module/module_dccode');
const {user_permission_obj} = require('../model_module/module_user_permission');
const {ERROR_OBJ} = require('../constant/app_const');
const user_controller = {
    getUserList : function(call,callback){
        var access_token = Utils.getBearerTokenFromCall(call);
        
        var response = {};
        var users = [];
        var err_flag = 0;
        var access_info = {};
        var permission = {};
        return new Promise((resolve, reject)=>{
            // kiem tra co token?
            if(!access_token){
                return reject(ERROR_OBJ.ERR_ACCESS_TOKEN_REQUIRED);
            }
            //verify token
            
            user_obj.verifyToken(access_token).then((p_access_info)=>{
                access_info = p_access_info;
                return resolve();
            }).catch((error)=>{
                return reject( ERROR_OBJ.ERR_ACCESS_TOKEN_NOT_VALID);
            })
            
            
        }).then(()=>{
            // lay users
            // kiem tra permission
            return new Promise((resolve,reject)=>{
                try{
                    permission = JSON.parse(access_info['permission'][0]);
                }
                catch(e){
                    return reject(ERROR_OBJ.ERR_PARSE_JSON);
                }
                if(permission['user'] && permission['user'].includes("aasdasd") ){
                    user_obj.getUserList().then((p_users)=>{
                        users = p_users;
                        return resolve();
                    })
                }else{
                    return reject(ERROR_OBJ.ERR_DONT_HAVE_PERMISSION);
                }    
            })
        }).catch((error)=>{
            err_flag = 1;
            response['code'] = 401;
            response['message'] = error;
        }).finally(()=>{
            if(!err_flag){
                response['code'] = 200;
                response['message'] = "OK";
                response['users'] = JSON.stringify(users);
            }
            callback(null,response);
        })
        
    }
}
module.exports.user_controller = user_controller;