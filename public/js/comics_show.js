//Select Buttons
const upvoteBtn = document.getElementById("upvote-btn")
const downvoteBtn = document.getElementById("downvote-btn")

//Helper functions
const sendVote = async (vote) =>{
    //build fetch options
    const options = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    }
   }
   options.body =  JSON.stringify({vote})
   //send fetch request
   await fetch("/comics/vote", options)
   .then(data => {
       return data.json()
   })
   .then(res=>{
       console.log(res)
   })
   .catch(err=>{
       console.log(err)
   })
}

//Add click event listener
upvoteBtn.addEventListener("click", async ()=>{
   sendVote("up")
})

downvoteBtn.addEventListener("click", ()=>{
    sendVote("down")
})