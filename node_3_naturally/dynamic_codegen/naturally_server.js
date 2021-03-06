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


var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var auth_proto = grpc.loadPackageDefinition(packageDefinition).NaturallyGrpc.Auth ;
var user_proto = grpc.loadPackageDefinition(packageDefinition).NaturallyGrpc.Users;
var distributor_proto = grpc.loadPackageDefinition(packageDefinition).NaturallyGrpc.Distributors;
// console.log(grpc.loadPackageDefinition(packageDefinition));
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
const {login_controller} = require('./controller_module/login_controller');
const {user_controller} = require('./controller_module/user_controller');
const {distributor_controller} = require('./controller_module/distributor_controller');
function main() {
  var server = new grpc.Server();
  server.addService(auth_proto.AuthService.service, login_controller);
  server.addService(user_proto.UserService.service, user_controller);
  server.addService(distributor_proto.DistributorService.service,distributor_controller);
  
  
  
  server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
