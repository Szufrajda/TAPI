import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync('grpc/proto/perfume.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(proto.school.StudentService.service, {
    GetStudent: (req, res)=>{
        res(null,{
            studentId: 0,
            firstName: "Stefan",
            lastName: "Mostowiak"
    });
    }
});


server.bindAsync("127.0.0.1:9090", grpc.ServerCredentials.createInsecure(), (err) =>  console.log(err));