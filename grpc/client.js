import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync('./proto/perfume.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.school.StudentService("127.0.0.1:9090", grpc.ChannelCredentials.createInsecure(), (err) =>  console.log(err));

client.GetStudent(null, (err,res)=>{
    console.log(res);
});