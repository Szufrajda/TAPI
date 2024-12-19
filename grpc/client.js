import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

<<<<<<< HEAD
const packageDefinition = protoLoader.loadSync('./proto/perfume.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.school.StudentService("127.0.0.1:9090", grpc.ChannelCredentials.createInsecure(), (err) =>  console.log(err));

client.GetStudent(null, (err,res)=>{
    console.log(res);
=======
// Poprawna ścieżka do pliku .proto
const packageDefinition = protoLoader.loadSync('./grpc/proto/perfume.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

// Tworzymy klienta
const client = new proto.perfume.PerfumeService(
    "127.0.0.1:9090",
    grpc.credentials.createInsecure()
);

// Wykonanie RPC
client.GetPerfume({ id: 1 }, (err, res) => {
    if (err) {
        console.error("Error:", err.message);
    } else {
        console.log("Perfume Data:", res);
    }
>>>>>>> df7623a (Poprawa projektu wraz z dodaniem poprawnego graphql)
});