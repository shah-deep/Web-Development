var val1 = Math.floor(Math.random()*6);
var val2 = Math.floor(Math.random()*6);

document.querySelector('.img1').src = 'images/dice'+(val1+1)+'.png';
document.querySelector('.img2').src = 'images/dice'+(val2+1)+'.png';

if(val1>val2){
  document.querySelector('h1').textContent = "🚩 Player 1 Wins!";
} else if(val2>val1){
  document.querySelector('h1').textContent = "Player 2 Wins! 🚩";
} else{
  document.querySelector('h1').textContent = "Draw!";
}
