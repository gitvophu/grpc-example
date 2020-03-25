//knex kết nối
const {knex} = require('../db_module/knex_connection');
const {APP_KEY,ERROR_OBJ} = require('../constant/app_const');
const jwt = require('jsonwebtoken');
const twinBcrypt= require('twin-bcrypt');
const User = function(){
    this.getUserByFLPNo = function(FLPNo = ''){
        return new Promise(function(resolve,reject){
            knex.select().from('users').where("FLPNo","=",FLPNo).first().then((user)=>{
                resolve(user);
            });
        })
    }
    this.generateToken = function(data){
        const PRIVATE_KEY = APP_KEY;
        return new Promise((resolve,reject)=>{
            jwt.sign(data,PRIVATE_KEY,{algorithm:"HS256",expiresIn:30*60},function(err,token){
                if(err) reject(err);
                resolve(token);
            })
        })
    }
    this.verifyToken = function(token){
        const PRIVATE_KEY = APP_KEY;
        return new Promise((resolve,reject)=>{
            jwt.verify(token,PRIVATE_KEY,function(err,data){
                if(err) {
                    return reject(err)
                }
                return resolve(data);
            })
        });
    }
    this.getPermissionByUserId = function(user_id){
        return new Promise((resolve,reject)=>{
            knex.select("user_permission.*","group_permision.Name as PermissionName").from('user_permission')
            .leftJoin('users','users.id','=','user_permission.UserId')
            .leftJoin('group_permision',"group_permision.id","=","user_permission.GroupId")
            .where('users.id','=',user_id).first().then(function(permission){
                resolve(permission);
            })
        })
        
    }
    this.checkLogin = function(FLPNo,password){
        // get user
        return new Promise((resolve,reject)=>{
            
            knex.select("*").from('users').where('FLPNo','=',FLPNo).where('level','=',1).first().then((user)=>{
                if(typeof user != 'undefined'){
                    // Kiểm tra password
                    twinBcrypt.compare(password,user.password,function(result){
                        if(result === true){
                            return resolve(user);
                        }else{
                            return reject(ERROR_OBJ.WRONG_USERNAME_PASSWORD);
                        }
                    })
                }else{
                    // TK Không hợp lệ
                    return reject(ERROR_OBJ.WRONG_USERNAME_PASSWORD);
                }
            });
        })
        
    }

    this.getUserList = function(){
        return new Promise((resolve,reject)=>{
            knex.select().from('users').limit(100).then((users)=>{
                resolve(users);
            })
        })
    }
    this.findUser = function(user_id = 0){
        return new Promise(()=>{
            knex.select().where('id','=',user_id).first().then((user)=>{
                resolve(user);
            });

        })
    }
    

}
module.exports.user_obj = new User();