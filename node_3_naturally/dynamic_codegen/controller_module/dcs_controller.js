const {Utils} = require('../utilities/Utils');
const {AuthUtils} = require('../utilities/AuthUtils');
const {user_obj} = require('../model_module/module_user');
const {dc_obj} = require('../model_module/module_dccode');
const {user_permission_obj} = require('../model_module/module_user_permission');
const {ERROR_OBJ} = require('../constant/app_const');
const dcs_controller = {
    getListDcs : function(call,callback){
        var response = {};
        var err_flag = 0;
        var dcs = [];
        new Promise((resolve,reject)=>{
            // kiểm tra client
            if(AuthUtils.checkClientFromCall(call)){
                resolve();
            }else{
                reject(ERROR_OBJ.ERR_CLIENT_IS_NOT_VALID);
            }
        }).then(()=>{
            // get data
            dc_obj.getAll().then((p_dcs)=>{
                dcs = p_dcs;
                resolve();
            });
        }).catch((error)=>{
            // bat loi
            err_flag = 1;
            response['code'] = 0;
            response['message'] = error;
        }).finally(()=>{
            // tra ket qua
            if(!err_flag){
                response['code'] = 200;
                response['message'] = "OK";
                response['dcs'] = dcs;
            }
            callback(null,response);
        });
        
    }
}
module.exports.dcs_controller = dcs_controller;