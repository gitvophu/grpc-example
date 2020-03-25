//knex kết nối
const {knex} = require('../db_module/knex_connection');
const {APP_KEY,ERROR_OBJ} = require('../constant/app_const');
// const jwt = require('jsonwebtoken');
// const twinBcrypt= require('twin-bcrypt');
const Distributor = function(){
    this.getDistributorByFLPNo = function(FLPNo){
        return new Promise(function(resolve,reject){
            knex.select("*").from('distributor').where('FLPNo','=',FLPNo).first().then((distributor)=>{
                resolve(distributor);
            });
        })
    }

}
module.exports.distributor_obj = new Distributor();