import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync('grpc/proto/perfume.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

<<<<<<< HEAD
server.addService(proto.school.StudentService.service, {
    GetStudent: (req, res)=>{
        res(null,{
            studentId: 0,
            firstName: "Stefan",
            lastName: "Mostowiak"
=======
server.addService(proto.perfume.PerfumeService.service, {
    GetPerfume: (req, res)=>{
        res(null,{
            perfumeId: 0,
            brand: "DIOR",
            name: "SAUVAGE EDP"
>>>>>>> df7623a (Poprawa projektu wraz z dodaniem poprawnego graphql)
    });
    }
});

<<<<<<< HEAD

server.bindAsync("127.0.0.1:9090", grpc.ServerCredentials.createInsecure(), (err) =>  console.log(err));
=======
server.bindAsync("127.0.0.1:9090", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error("Error:", err.message);
    } else {
        console.log("gRPC Server is running on port", port);
        server.start();
    }
});
>>>>>>> df7623a (Poprawa projektu wraz z dodaniem poprawnego graphql)
