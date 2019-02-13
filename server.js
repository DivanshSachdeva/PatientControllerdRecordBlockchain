const express=require('express');
const Web3=require('web3');
const bodyParser=require('body-parser');

const web3=new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const abi=JSON.parse('[{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getRecord","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_number","type":"string"},{"name":"_name","type":"string"},{"name":"_hospital","type":"string"},{"name":"_doctor","type":"string"},{"name":"prescription","type":"string"},{"name":"_publicKey","type":"address"}],"name":"addRecord","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalRecord","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');
const RecordContract=new web3.eth.Contract(abi);
const ContractInstance=RecordContract.at('0x692a70d2e424a56d2c6c27aa97d1a86395877b3a');

const app=express();
const port=process.env.PORT||3000;

app.use(bodyParser.JSON());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/EnterRecord.html');
});


app.post('/EnterRecord',function(req,res){
    var accountNumber=req.body.accountAddress;
    var privateKey=req.body.privateKey;
    web3.personal.unlockAccount(accountNumber,privateKey,500);
    var set=req.body;
    var Status;
    ContractInstance.addRecord(set.admissionNo,set.Name,set.hospital,set.doctor,set.prescription,set.Address,{from:req.body.accountAddress},function(err,status){
        if(!error){
            console.log(status);
            Status=status;

        } else{
            console.log(error);
        }
    });
    res.send(Status);
});

app.get('/patient',function(req,res){
    res.sendFile(__dirname+'/public/PatientRecord.html');
});

app.post('/TotalRecord',function(req,res){
    var accoutNumber=req.body.accountAddress;
    var privateKey=req.body.privateKey;
    web3.personal.unlockAccount(accoutNumber,privateKey,500);
    var Result;
    ContractInstance.totalRecord({from:req.body.accountAddress},function(err,result){
        if(!error){
            console.log(result);
            Result=JSON.stringify(new String(result));
        } else{
            console.log(error);
        }
    });
    res.send(Result);
});

app.post('/GetRecord',function(req,res){
    var accoutNumber=req.body.accountAddress;
    var privateKey=req.body.privateKey;
    web3.personal.unlockAccount(accoutNumber,privateKey,500);
    var Result=[];
    var Index=JSON.stringify(new Number(req.body.index));
    ContractInstance.getRecord(Index,{from:req.body.accountAddress},function(err,result){
        if(!error){
            console.log(result);
            Result=result;
        } else{
            console.log(error);
        }
    });
    res.send(Result);

});


app.listen(port);
console.log(`server running at ${port}`);

