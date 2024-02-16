let myLinks = []
const  inputBtn = document.getElementById("input-btn")
const  inputTxt = document.getElementById("input-el")
const   ulEl    = document.getElementById("ul-el")
const  deleteBtn= document.getElementById("delete-btn")
const  saveTab  = document.getElementById("tab-btn") 
 // Get the leads from the localStorage - PS: JSON.parse()
 // Store it in a variable, leadsFromLocalStorage
 // Log out the variable
 //To clear things from local storage use --->localStorage.clear()
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))
// 1. Check if leadsFromLocalStorage is truthy
// 2. If so, set myLeads to its value and call renderLeads()
if (leadsFromLocalStorage) {
  myLinks = leadsFromLocalStorage
  renderLink(myLinks)
}
saveTab.addEventListener("click", function(){    
  chrome.tabs.query({active: true, currentWindow: true},function(tabs){
      myLinks.push(tabs[0].url)
      localStorage.setItem("myLinks", JSON.stringify(myLinks) )
      renderLink(myLinks)
  })
})
function renderLink(links){
  let listItems = ""
//Use a For loop to logout links
for (let i=0; i<links.length; i++)
{
   /*If u want to improve performance of our app follow three steps
   1- create a variable, listItem to hold all the HTML for the list items.
   Assign it to an empty string to begin with.*/
  //Add the items to the listItem variable instead of the ulEl.innerHTML
  //listItems += "<li>" + myLinks[i] + "</li>"
  //template String---->
listItems += `<li> <a target= '_blank' href ='${links[i]}'> ${links[i]} </a> </li>`
               
//make the link open in new tab using anchor tag with target attribute.
}
//innerHtml can use in java script directly to get the HTML style
//Render the list items inside the unordered list using ulEl.innerHTML
ulEl.innerHTML = listItems
/*This process is necessary important because DOM comes with cost so insted of using three times , we can use only 
one Time.*/
}

inputBtn.addEventListener("click" , function(){
 myLinks.push(inputTxt.value)
 inputTxt.value = ""
 // Save the myLeads array to localStorage 
    // PS: remember JSON.stringify()
 localStorage.setItem("myLinks", JSON.stringify(myLinks) )
 renderLink(myLinks)
})
// 1. Listen for double clicks on the delete button (google it!)
// 2. When clicked, clear localStorage, myLeads, and the DOM
deleteBtn.addEventListener("dblclick" , function(){
  localStorage.clear()
  myLinks = []
  renderLink(myLinks)
})

