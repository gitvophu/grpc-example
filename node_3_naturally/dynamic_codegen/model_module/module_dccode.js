//knex kết nối
const {knex} = require('../db_module/knex_connection');
const {APP_KEY,ERROR_OBJ} = require('../constant/app_const');
// const jwt = require('jsonwebtoken');
// const twinBcrypt= require('twin-bcrypt');
const Dc = function(){
    this.findByDCCode = function(dccode){
        return new Promise(function(resolve,reject){
            knex.select("*").from('dcs').where('DCCode','=',dccode).first().then((dc)=>{
                resolve(dc);
            });
        })
    }
    

}
module.exports.dc_obj = new Dc();