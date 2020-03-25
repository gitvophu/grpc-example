const {Utils} = require('../utilities/Utils');
const {AuthUtils} = require('../utilities/AuthUtils');
const {user_obj} = require('../model_module/module_user');
const {distributor_obj} = require('../model_module/module_distributor');
const {user_permission_obj} = require('../model_module/module_user_permission');
const {ERROR_OBJ} = require('../constant/app_const');
const distributor_controller = {
    GetDistributorByFLPNo : function(call,callback){
        var FLPNo = call.request.FLPNo;
        var distributor = {};
        var response = {};
        distributor_obj.getDistributorByFLPNo(FLPNo).then((p_distributor)=>{
            distributor = p_distributor;
        }).finally(()=>{
            response['code'] = 200;
            response['message'] = "OK";
            response['distributor'] = JSON.stringify(distributor);
            callback(null,response);
        })
        
        
    }

}
module.exports.distributor_controller = distributor_controller;