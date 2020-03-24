//knex kết nối
const {knex} = require('../db_module/knex_connection');
const {APP_KEY,ERROR_OBJ} = require('../constant/app_const');

const UserPermission = function(){
    this.getDcPermission = function(user_id,dccode){
        return new Promise((resolve,reject)=>{
            knex.select("user_permission.*").from('user_permission')
            .leftJoin('users', 'users.id', '=', 'user_permission.UserId')
            .where('user_permission.DCCode', '=', dccode)
            .where('users.id', '=', user_id).first()
            .then((dc_permission)=>{
                resolve(dc_permission);
            })
        })
    }    
    

}
module.exports.user_permission_obj = new UserPermission();