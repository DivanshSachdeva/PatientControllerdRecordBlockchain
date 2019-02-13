Prerequisite:
Geth
Node 
npm

About SmartContract:
Created a SmartContract of HealthRecord management. Where only patient have the rights to see his/her Records. Whenever he'll go to  any hospital he'll give his public Key when hospital will enter the data. Now, Whenever Patient Want to see any Record he will be able to see along with timestamp. i have put the constraints so that no one except patient will be able to see the Records. patient have to provide his public and private key to see the HeathRecords.
Along with this Create Js file to intract with SmartContract. 

Steps to follow:

step1:
	install geth.
step2:
	Initiate genesis.json with a NodeName.
Step3: 
	Start the node at port 8545. 
step4:
	Create some Accounts with personal.newAccount();
Step5:
	Start the mining by Miner.start().
Step6:
	Open Remix.ethereum.org and copy the Solidity file in IDE. (file location ./Contract/PatientRecord.sol
Step7:
	Go to Run section and select web3 provider.A pop will come. click on OK. 
Step8: 
	Deploy your smartContract and get the ABI and Contract Address. 
Step9:
	Make changes in Server file where ABI and Contract Address is required. 
Step10:
	open the console. type npm Install. It will install all dependencies and then type node server.
step11:
	Go to localhost:3000
Step12:
	Enter the Details and publicKey of Patient. click on Submit.
Step13: 
	Click on "Visit to patient portal"
step14:
	In "Get total Number of Record Section", Patient will enter his public and private Key. (He will get the total number of records in return)
step15:
	In "Get Record", Patient will type the index of record for which he want to see the detail and his public and private key.( Patient will get 		full record for index). 

						-----------------Thank You--------------------
