import { LightningElement ,track,wire} from 'lwc';
import getRecords from '@salesforce/apex/approvalClass.getRecords';
import acceptMethod from '@salesforce/apex/approvalClass.acceptMethod';
import rejectMethod from '@salesforce/apex/approvalClass.rejectMethod';
export default class ApprovalCmp extends LightningElement 
{
   
    @track leaveRecords;
    @track error;
    @wire(getRecords,{})
    wiredRecords({error,data})
    {
        if(data)
        {
            this.leaveRecords = data;
           
        }
        else if(error)
        {
            this.error = error;
            console.log('error-->'+error);
        }
    }

    //approve method
    approveAction(event)
    {
        let rId = event.target.name;
       
        acceptMethod({rcdId : rId})
        .then(result => {
            if(result)
            {
               
                console.log(result);
            }
            else 
            {
                console.log('record Approved');
            }
        });
        alert("Record Approved");
    }

    rejectAction(event)
    {
        let rId = event.target.name;

        rejectMethod({rcdId : rId})
        .then(result => 
            {
                
                if(result)
                {
                   
                   console.log(result);
                }
                else 
                {
                    console.log('record Rejected');
                }
            });
            alert("Record Rejected");
    }
}
