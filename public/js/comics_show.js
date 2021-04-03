//Select Buttons
const upvoteBtn = document.getElementById("upvote-btn")
const downvoteBtn = document.getElementById("downvote-btn")
const upvoteCount = document.getElementById("upvote-count")

//Helper functions
const sendVote = async (vote) =>{
    //build fetch options
    const options = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    }
   }
   options.body =  JSON.stringify({vote, comicId})
   //send fetch request
   await fetch("/comics/vote", options)
   .then(data => {
       return data.json()
   })
   .then(res=>{
       upvoteCount.innerText = res.count
       if(res.code == 0)
       {
        upvoteBtn.className="btn btn-outline-success btn-lg"
        downvoteBtn.className="btn btn-outline-danger btn-lg"
       }
       else if(res.code == 1)
       {
        upvoteBtn.className="btn btn-success btn-lg"
        downvoteBtn.className="btn btn-outline-danger btn-lg"
       }
       else if(res.code == -1)
       {
        upvoteBtn.className="btn btn-outline-success btn-lg"
        downvoteBtn.className="btn btn-danger btn-lg"
       }
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