
export const useFeedback=()=>{

   
    const feedBack= async(question_1,question_2,question_3,question_4,question_5,ans_id) => {
        const username=JSON.parse(localStorage.getItem('tokens')).username
       
        const respone= await fetch(process.env.REACT_APP_API_FEEDBACK+username,{ 
            method :'POST',
            headers :{'Content-Type':'application/json'},
            body :JSON.stringify({question_1,question_2,question_3,question_4,question_5,ans_id})
        })
        const json = await respone.json()
        if(!respone.ok)
        {
            console.log("error");
            
        }
        if(respone.ok)
        {
            console.log(json);

        
        }
    }
    return{feedBack}
}
