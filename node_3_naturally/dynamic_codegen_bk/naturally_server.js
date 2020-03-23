/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/../../protos_naturally/naturally.proto';

var grpc = require('grpc');
// node-mysql
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "192.168.1.111",
  user: "sa",
  password: "qwerty!@#",
  database: "lohoi_new"
});
con.connect(function(err) {
	if(err) throw err;
	console.log("Connected");
})
//END node-mysql
const fs = require('fs');
const bcrypt = require('bcrypt');
var twinBcrypt = require('twin-bcrypt');

// bcrypt.compare("123123","$2y$10$kG/zfhOEEnr9or.CzuPB5ein242VF.ne6bozar.kzrAZ7btBLauri",function(err,result){
// 	console.log(result);
// })

var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var naturally_proto = grpc.loadPackageDefinition(packageDefinition).grpcApi;
// console.log(grpc.loadPackageDefinition(packageDefinition));
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
// DB
const module_user = require('./modules/module_user');
const module_dccode = require('./modules/module_dccode');
var user_obj = new module_user.User(con);
var dccode_obj = new module_dccode.DCCode(con);
// delete product
function login(call, callback){
	var loginInfo = {
		FLPNo:call.request.FLPNo,
		password:call.request.password,
		dccode:call.request.dccode
	}
	var response = {};
	var result = {};
	var err = {};
	var loggedUser = {}
	var permission = [];
	var dccode_user = "";
	var g_per = [];
	var per_superadmin = [];
	var dccode_per = [];
	//
	
	new Promise((resolve,reject)=>{
		// kiem tra user hop le
		user_obj.getUserByFLPNo(loginInfo.FLPNo,function(userInfo){
			if(userInfo && userInfo['level'] == 1){
				result['userInfo'] = userInfo;
				resolve(result);
			}else{
				err.code = 401;
				err.message = "Tài khoản hoặc mật khẩu ko đúng";
				reject(err);
			}
		})
	}).then(()=>{
		// kiểm tra mật khẩu
		return new Promise((resolve, reject)=>{
			twinBcrypt.compare(
				loginInfo.password,
				result['userInfo']['password'],
				function(compareResult){
					loggedUser = result['userInfo'];
					var loginUserInfo = {
						id:result['userInfo']['id'],
						name:result['userInfo']['name'],
						email:result['userInfo']['email'],
						FLPNo:result['userInfo']['FLPNo'],
					}
	
					if(compareResult){
						// response['code'] = 200;
						// response['message'] = "OK";
						// response['loginUserInfo'] = loginUserInfo;
						return resolve();
					}else{
						err.code = 401;
						err.message = "Sai mật khẩu";
						return reject(err);
					}
				}
			)
		})
	}).then(()=>{
		// kiem tra active
		return new Promise((resolve,reject)=>{
			if(loggedUser['active'] == 0 ){
				err['code'] = 401;
				err['message'] = "Tài khoản ngưng hoạt động";
				reject(err);
			}else{
				resolve();
			}
		})
		
	}).then(()=>{
		// kiem tra quyen
		return new Promise((resolve,reject)=>{
			user_obj.getPermissionByUserId(loggedUser.id,function(perResult){
				if(perResult){
					result['perResult'] = perResult;
					permission.push(perResult['Permission']);
					dccode_user = perResult['DCCode'];
					g_per.push(perResult['GroupId']);
					resolve();
				}else{
					err['code'] = 401;
					err['message'] = "Không có quyền";
					reject(err);
				}
			})
		});
	}).then(()=>{
		// kiểm tra group admin
		return new Promise((resolve,reject)=>{
			if(result['perResult']['GroupId'] == 1){
				per_superadmin.push(result['perResult']['GroupId']);
			}else{
				if(!loginInfo.dccode){
					err['code'] = 401;
					err['message'] = "Chưa chọn chi nhánh";
					return reject(err);
				}else{
					dccode_obj.findByDCCode(loginInfo.dccode,function(dccodeResult){
						result['dccodeResult'] = dccodeResult;
						if(dccodeResult['DCStatus'] == 0) {
							err['code'] = 401;
							err['message'] = "Chi nhánh đã dừng hoạt động - Xin vui lòng liên hệ quản trị";
							return reject(err);
						}
					})
				}
			}
			resolve();
		})
	}).then(()=>{

		return new Promise((resolve,reject)=>{
			user_obj.getPermissionByUserIdAndDccode(result['userInfo']['id'],loginInfo.dccode,function(dccodePerResult){
				if(dccodePerResult){
					result['dccodePerResult'] = dccodePerResult;
					dccode_per.push(dccodePerResult.Permission);
				}else{
					err['code'] = 401;
					err['message'] = "Chọn Sai Chi Nhánh";
					return reject(err)
				}
				return resolve();
				
			})
		})
		
	}).then(()=>{
		// trả kết quả thành công
		response['code'] = 200;
		response['permission'] = permission;
		response['dccode_user'] = dccode_user;
		response['g_per'] = g_per;
		response['message'] = "OK";
		response['per_superadmin'] = per_superadmin;
		response['dccode_per'] = dccode_per;
		callback(null,response);
	}).catch((err)=>{
		// trả kết quả lỗi
		response['code'] = err['code'];
		response['message'] = err['message'];
		callback(null,response);
	})
	
}

function main() {
  var server = new grpc.Server();
  server.addService(
	naturally_proto.NaturallyApi.service, 
	{	
		login:login
		
	});
  server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
