pragma solidity ^0.4.25;

contract PatientRecordSet{
    
    struct Record {
        string admissionNo;
        string name;
        string hospital;
        string doctor;
        string prescription;
        uint timestamp;
        address publicKey;
    }
    mapping(address=>Record) RecordSet;
    mapping(address=>bool) IsPatient;
    
    struct Patient{
        Record[] PatientRecordData;
    }
    
    mapping(address=>Patient) PatientRecord;
    //hospitals can Enter patient Record. whenever he visit to the hospitals.
    //when patient will go to hospital they will put his detail in Blockchain with their public key assigned to it. 
    function addRecord(string _number,string _name, string _hospital, string _doctor, string prescription, address _publicKey) public returns(bool){
        Record storage record=RecordSet[_publicKey];
        record.admissionNo=_number;
        record.name=_name;
        record.hospital=_hospital;
        record.doctor=_doctor;
        record.prescription=prescription;
        record.timestamp=now;
        record.publicKey=_publicKey;
        IsPatient[_publicKey]=true;
        
        Patient storage patient=PatientRecord[_publicKey];
        patient.PatientRecordData.push(record);
        
        return true  ;
    }
    
    modifier onlyPatient(){
        require(IsPatient[msg.sender]==true);
        _;
    }
    //patient can fetch total count of records.
    //only the person to whom records belong to will only able to see the total number of records
    //and details of each record. 
    function totalRecord() view onlyPatient returns(uint){
        Record storage record=RecordSet[msg.sender];
        require(record.publicKey==msg.sender);
        Patient storage patient=PatientRecord[msg.sender];
        return(patient.PatientRecordData.length);
    }
    
    function getRecord(uint index) view onlyPatient returns(string,string,string,string,string,uint){
       Record storage record=RecordSet[msg.sender];
       require(record.publicKey==msg.sender);
       Patient storage patient=PatientRecord[msg.sender];
       return(patient.PatientRecordData[index].admissionNo,patient.PatientRecordData[index].name,patient.PatientRecordData[index].hospital,patient.PatientRecordData[index].doctor,patient.PatientRecordData[index].prescription,patient.PatientRecordData[index].timestamp);
    }
    
    
}