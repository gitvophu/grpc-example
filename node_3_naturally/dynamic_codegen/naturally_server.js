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
//node-mysql
// var mysql = require('mysql');
// var con = mysql.createConnection({
//   host: "192.168.1.111",
//   user: "sa",
//   password: "qwerty!@#",
//   database: "test_db"
// });
// con.connect(function(err) {
// 	if(err) throw err;
// 	console.log("Connected");
// })
//END node-mysql
const fs = require('fs');

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

// delete product
function login(call, callback){
	var loginInfo = {
		FLPNo:call.request.FLPNo,
		password:call.request.password,
	}
	var response = {};
	response['code'] = 1000;
	response['message'] = "OK";
	response['loginUserInfo'] = {};
	console.log(response,loginInfo);
	callback(null,response);
}

function main() {
  var server = new grpc.Server();
  server.addService(
	naturally_proto.NaturallyApi.service, 
	{	
		login:login
		// deleteOrderDetail:deleteOrderDetail,
		
		// addProduct:addProduct
	});
  server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
