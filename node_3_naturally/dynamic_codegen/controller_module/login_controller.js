const {Utils} = require('../utilities/Utils');
const {user_obj} = require('../model_module/module_user');
const {dc_obj} = require('../model_module/module_dccode');
const {user_permission_obj} = require('../model_module/module_user_permission');
const {ERROR_OBJ} = require('../constant/app_const');
const {AuthUtils} = require('../utilities/AuthUtils');
const login_controller = {
    login:function(call,callback){
        var FLPNo = call.request.FLPNo;
        var password = call.request.password;
        var dccode = call.request.dccode;
        
        var response = {};
        var permission = [];
        var dccode_user = null;
        var g_per = [];
        var per_superadmin = [];
        var dccode_per = [];
        var err_flag = 0;
        var access_token = "";
        new Promise((resolve,reject)=>{
            var check = AuthUtils.checkClientFromCall(call);
            console.log(check);
            if(check){
                return resolve();
            }else{
                return reject(ERROR_OBJ.ERR_CLIENT_IS_NOT_VALID);
            }
        }).then(()=>{
            return user_obj.checkLogin(FLPNo,password).then((user)=>{
                return new Promise((resolve,reject)=>{
                    // kiem tra user
                    if(user.active == 0 ){
                        return reject(ERROR_OBJ.SUSPENED_ACCOUNT);
                    }
                    if(user.level != 1 ){
                        return reject(ERROR_OBJ.ERR_TRANG_QUAN_TRI_CUA_ADMIN);
                    }
                    // kiem tra quyen
                    user_obj.getPermissionByUserId(user.id).then((p_permission)=>{
                        if(typeof p_permission != 'undefined'){
                            dccode_user = p_permission['DCCode'];
                            permission.push(p_permission['Permission']);
                            g_per.push(p_permission['GroupId']);
                            // console.log(p_permission)
                            if(p_permission['GroupId'] == 1){
                                per_superadmin.push(p_permission['GroupId']);
                                return resolve();
                            }else{
                                if(typeof dccode != 'undefined'){
                                    dc_obj.findByDCCode(dccode).then((dc)=>{
                                        if(typeof dc != 'undefined' ){
                                            if(dc['DCStatus'] == 0){
                                                return reject(ERROR_OBJ.CHI_NHANH_DUNG_HOAT_DONG);
                                            }
                                        }
                                        
                                        user_permission_obj.getDcPermission(user.id,dccode).then((dc_permission)=>{
                                            
                                            if(typeof dc_permission != 'undefined'){
                                                dccode_per.push(dc_permission['Permission']);
                                                return resolve();
                                            }else{
                                                return reject(ERROR_OBJ.SAI_CHI_NHANH);
                                            }
                                        })  
                                    })    
                                }else{
                                    reject(ERROR_OBJ.CHUA_CHON_CHI_NHANH);
                                }
                                
                            }
                            
                        }else{
                            return resolve();
                        }
                    });
                })
                
            })
        }).then(()=>{
            // login ok, bắt đầu tạo token
            return new Promise(function(resolve,reject){
                var access_info = {}
                access_info['permission'] = permission;
                access_info['dccode_user'] = dccode;
                access_info['g_per'] = g_per;
                access_info['per_superadmin'] = per_superadmin;
                access_info['dccode_per'] = dccode_per;
                user_obj.generateToken(access_info).then((token)=>{
                    access_token = token;
                    resolve();
                })
            })
            
        }).catch((error)=>{
            // TK ko hợp lệ
            err_flag = 1;
            response['code'] = 406;
            response['message'] = error;
            // if(error == ERROR_OBJ.WRONG_USERNAME_PASSWORD){
            //     response['code'] = 406;
            //     response['message'] = error;
            // }else if(error == ERROR_OBJ.SUSPENED_ACCOUNT){
            //     response['code'] = 406;
            //     response['message'] = error;
            // }else if(error == ERROR_OBJ.ERR_TRANG_QUAN_TRI_CUA_ADMIN){
            //     response['code'] = 406;
            //     response['message'] = error;
            // }
            // else{
            //     response['code'] = 406;
            //     response['message'] = ERROR_OBJ.UNKNOW_ERROR;
            // }
        }).finally(()=>{
            if(!err_flag){
                response['code'] = 200;
                response['message'] = "OK";
                response['access_token'] = access_token;
            }
            console.log(response);
            callback(null,response);
        });
        
        
    },
    getLoginViewData:function(call,callback){

        var response = {};
        var data = {};
        var err_flag = 0;

        new Promise((resolve,reject)=>{
            var check = AuthUtils.checkClientFromCall(call);
            console.log(check);
            if(check){
                return resolve();
            }else{
                return reject(ERROR_OBJ.ERR_CLIENT_IS_NOT_VALID);
            }
        }).then(()=>{
            return new Promise((resolve,reject)=>{
                dc_obj.getAll().then((p_dcs)=>{
                    data['dcs'] = p_dcs;
                    resolve();
                })
            })
        }).catch((error)=>{
            err_flag = 1;
            response['code'] = 404;
            response['message'] = error;

        }).finally(()=>{
            if(!err_flag){
                response['code'] = 200;
                response['message'] = "OK";
                response['data'] = JSON.stringify(data);
            }
            
            callback(null,response);
        })
        
        
    }
}
module.exports.login_controller = login_controller;