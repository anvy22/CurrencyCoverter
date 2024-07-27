let baseurl = "https://v6.exchangerate-api.com/v6/2d5de4cf916f3b6e82ad0451/latest/USD";
let  selects = document.querySelectorAll(".container select");
let btn = document.querySelector("#submit");
let to = document.querySelector(".to select");
let from = document.querySelector(".from select");
let msg = document.querySelector(".msg");

for(select of selects)
{
    for(currcode in countryList){
        let opt = document.createElement("option");
        opt.innerText = currcode;
        opt.value = currcode;
        if(select.name ==="From" && currcode ==="USD")
        {
            opt.selected = "selected";
        }
        else if(select.name ==="To" && currcode ==="INR")
        {
            opt.selected = "selected";
        }
        select.append(opt);
    }
    select.addEventListener("change",(evt)=>{
        changeFlag(evt.target);
    })
    const changeFlag = (evt)=>{
      let currCode = evt.value;
      contryCode = countryList[currCode];
      let parent = evt.parentElement;
       let img = parent.parentElement.querySelector("img");
       let newsrc = `https://flagsapi.com/${contryCode}/flat/64.png`;
       img.src = newsrc;
       
    }
}

btn.addEventListener("click",async(evt)=>{

evt.preventDefault();
let amt = document.querySelector("input");
 let amtval = amt.value;
console.log(amtval);
if(amtval<1 || amtval ==="")
{
    amt.value = 1;
}

const url = `https://v6.exchangerate-api.com/v6/2d5de4cf916f3b6e82ad0451/latest/${from.value}`;
let To = to.value;
let response = await fetch(url);
let data = await response.json();

// Accessing the conversion rate
let need = data.conversion_rates[To];
console.log(need);
let Orgval = amtval*need;
msg.innerText = `${amtval}${from.value}=${Orgval}${To}`;


})

