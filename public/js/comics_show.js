//Select Buttons
const upvoteBtn = document.getElementById("upvote-btn")
const downvoteBtn = document.getElementById("downvote-btn")

//Add click event listener
upvoteBtn.addEventListener("click", async ()=>{
   //build fetch options
   const options = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({vote:"up"})
   }

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
})

downvoteBtn.addEventListener("click", ()=>{
    console.log("downvoted")
})