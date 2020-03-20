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

var PROTO_PATH = __dirname + '/../../protos/helloworld.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).phuvo.customGrpc.helloworld;

var data = {
	products:{
		1:{id:1,name:"Iphone X", price:1000},
		2:{id:2,name:"Galaxy S10", price:500},
		3:{id:3,name:"Oppo Neo 3", price:200},
		4:{id:4,name:"Huawei", price:300},
		5:{id:5,name:"Xiaomi Mi10", price:500},
		6:{id:6,name:"Galaxy S20 Ultra", price:2200}
	},
	lastProductId: 2
		
	
};
/**
 * Implements the SayHello RPC method.
 */

function sayHello(call, callback) {
  callback(null, {message: 'Hello 123123' + call.request.name});
}
function sayHello2(call, callback) {
  callback(null, {message: 'Hello asdasd' + call.request.name});
}
function sayHelloAgain(call, callback) {
  callback(null, {message: 'Hello Again ' + call.request.name + " -----: " + call.request.age });
}
function getProductList(call, callback){
	callback(null, {message: JSON.stringify(data['products']) });
}
function showProduct(call,callback){
	var id = call.request.id;
	var response = {};
	if (!data['products'][id]) {
		response['code'] = 0;
		response['message'] = "Xảy ra lỗi, id không hợp lệ";
		response['id']=0;
		response['name']='';
		response['price']=0;
	}else{
		var product = data['products'][id];
		response['code'] 	= 1000;
		response['message'] = "Lấy thông tin thành công";
		response['id']  	= product['id'];
		response['name']	= product['name'];
		response['price']	= product['price'];
	}
	callback(null,response);
	
}
function addProduct(call, callback){
	var product = {
		id:call.request.id,
		name:call.request.name,
		price:call.request.price,
	}
	var arr_err = [];
	if (product.id && !data['products'][product.id]) {
		arr_err.push("Product id không tồn tại");
	}

	if(!product.name){
		arr_err.push("Product name ko hop le");
	}
	if(!product.price || product.price < 0){
		arr_err.push("Product price khong hop le");
	}

	// tien hanh them moi hoac cap nhat
	var response = {};
	if(arr_err.length > 0){
		response['code'] = 0;
		response['message'] = 'Xảy ra lỗi:  ' + arr_err.join(", ");
		response['id'] = 0;
	}else{
		if (!product.id) {
			// them moi
			data['lastProductId'] += 1;
			product['id'] = data['lastProductId'];
			data['products'][data['lastProductId']] = product;

			response['code'] = 1000;
			response['message'] = 'Thêm sản phẩm thành công: ' + product.name;
			response['id'] = data['lastProductId'];
		}else{
			//cap nhat
			data['products'][product.id] = product;
			code = 1000;
			response['code'] = 1000;
			response['message'] = 'Cập nhật sản phẩm thành công: ' + product.name;
			response['id'] = product.id;
		}
		
	}
	callback(null, response);
}

// delete product
function deleteProduct(call, callback){
	var id = call.request.id;
	var response = {};
	if(!data['products'][id]){
		response['id'] = 0;
		response['message'] = 'Xảy ra lỗi, id không tồn tại: ' + id;
		response['code'] = 0;
	}else{
		delete data['products'][id];
		response['id'] = id;
		response['message'] = 'Đã xóa thành công product có id = ' + id;
		response['code'] = 1000;
	}
	callback(null,response);
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(
	  hello_proto.Greeter.service, 
	{
		showProduct:showProduct,
		deleteProduct:deleteProduct,
		addProduct:addProduct,
		getProductList:getProductList,
		sayHello: sayHello,
		sayHelloAgain:sayHelloAgain,
		sayHello2:sayHello2
		// addProduct:addProduct
	});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
