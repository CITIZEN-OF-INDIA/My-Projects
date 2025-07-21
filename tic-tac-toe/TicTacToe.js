let hello= document.querySelectorAll(".box");
let s = 'X';
let x ="";
let y="";
let count =0;
//CODE FOR START BUTTON
let game_start = 0;

let button = document.querySelector("#btn1");

button.addEventListener("click" , () =>
{
  x = prompt("ENTER NAME OF PLAYER 1");
  if(x=== null)
  {x = "PLAYER 1";}
  y = prompt("ENTER NAME OF PLAYER 2");
  if(y=== null)
  {y = "PLAYER 2";}
  
game_start = 1;
count =0;

});
//CODE FOR START BUTTON

//CODE FOR CLICKING BOXES
for(let i=0;i<9;i++)
{

hello[i].addEventListener ("click" , function ()
{
  
  count++;
  if(game_start==1 && this.innerHTML ==="")
  {
  this.style.backgroundColor = "yellow";
  this.innerHTML = `<p>${s}</p>`;
  this.style.fontSize="50px";
  this.style.textAlign="center";
  this.style.paddingTop="1px";
  this.style.height="149px";
  s = s==='X'?'O':'X';
  const text1= hello[0].innerText.trim();
  const text2= hello[1].innerText.trim();
  const text3= hello[2].innerText.trim();
  const text4= hello[3].innerText.trim();
  const text5= hello[4].innerText.trim();
  const text6= hello[5].innerText.trim();
  const text7= hello[6].innerText.trim();
  const text8= hello[7].innerText.trim();
  const text9= hello[8].innerText.trim();
  if(text1!=="" && text1===text2 && text1==text3)
  {
    game_start=0;
    hello[0].style.backgroundColor = "green";
    hello[1].style.backgroundColor = "green";
    hello[2].style.backgroundColor = "green";
    text1==="X"? alert(`${x} WINS`) : alert(`${y} WINS`);
    alert("GAME ENDED! CLICK ON RESET");
    return;
  }
  if(text1!=="" && text1===text4 && text1==text7)
  {
    game_start=0;
    hello[0].style.backgroundColor = "green";
    hello[3].style.backgroundColor = "green";
    hello[6].style.backgroundColor = "green";
    text1==="X"? alert(`${x} WINS`) : alert(`${y} WINS`);
    alert("GAME ENDED! CLICK ON RESET");
    return;
  }
  if(text1!=="" && text1===text5 && text1==text9)
  {
    game_start=0;
    hello[0].style.backgroundColor = "green";
    hello[4].style.backgroundColor = "green";
    hello[8].style.backgroundColor = "green";
    text1==="X"? alert(`${x} WINS`) : alert(`${y} WINS`);
    alert("GAME ENDED! CLICK ON RESET");
    return;
  }
  
  if(text4!=="" && text4===text5 && text4==text6)
  {
    game_start=0;
    hello[3].style.backgroundColor = "green";
    hello[4].style.backgroundColor = "green";
    hello[5].style.backgroundColor = "green";
    text4==="X"? alert(`${x} WINS`) : alert(`${y} WINS`);
    alert("GAME ENDED! CLICK ON RESET");
    return;
  }
  if(text7!=="" && text7===text8 && text7==text9)
  {
    game_start=0;
    hello[6].style.backgroundColor = "green";
    hello[7].style.backgroundColor = "green";
    hello[8].style.backgroundColor = "green";
    text7==="X"? alert(`${x} WINS`) : alert(`${y} WINS`);
    alert("GAME ENDED! CLICK ON RESET");
    return;
  }
  if(text7!=="" && text7===text5 && text7==text3)
  {
    game_start=0;
    hello[6].style.backgroundColor = "green";
    hello[4].style.backgroundColor = "green";
    hello[2].style.backgroundColor = "green";
    text7==="X"? alert(`${x} WINS`) : alert(`${y} WINS`);
    alert("GAME ENDED! CLICK ON RESET");
    return;
  }
  if(text2!=="" && text2===text5 && text2==text8)
  {
    game_start=0;
    hello[1].style.backgroundColor = "green";
    hello[4].style.backgroundColor = "green";
    hello[7].style.backgroundColor = "green";
    text2==="X"? alert(`${x} WINS`) : alert(`${y} WINS`);
    alert("GAME ENDED! CLICK ON RESET");
    return;
  }
  if(text3!=="" && text3===text6 && text3==text9)
  {
    game_start=0;
    hello[2].style.backgroundColor = "green";
    hello[5].style.backgroundColor = "green";
    hello[8].style.backgroundColor = "green";
    text3==="X"? alert(`${x} WINS`) : alert(`${y} WINS`);
    alert("GAME ENDED! CLICK ON RESET");
    return;
  }
  if(count==9)
  {
    alert("IT'S A TIE !! CLICK RESET !!");
    game_start=0;
  }
  
}
}
 
);
}
  
//CODE FOR CLICKING BOXES

//CODE FOR RESETING GAME

let buttons = document.querySelector("#btn2");
buttons.addEventListener("click" , () =>
{
  
for(let i=0;i<9;i++)
{
hello[i].style.backgroundColor = "rgb(255,255,255)";
hello[i].innerHTML = "";
game_start = 0;
s = "X";
}
alert("PRESS START TO BEGIN!");
}
);
//CODE FOR RESETING GAME

