

var coinToBet = 0;
var lastBet = 0;
var winCount = 0;
var lossCount = 0;
var startGame = 0;
var startCoin = 0;
var noResult = 0;
var lastGameNo = 0;
var specialX = 1;

startCoin = checkWallet(startCoin);

if ((startCoin >= 0.001) && (startCoin < 0.01))
 coinToBet = 0.00000010  * specialX;
else if ((startCoin >= 0.01) && (startCoin < 0.1))
 coinToBet = 0.00000100 * specialX;
else if ((startCoin >= 0.1) && (startCoin < 1))
 coinToBet = 0.00001000 * specialX;
else if (((startCoin >= 1) && (startCoin < 10)))
 coinToBet = 0.00010000 * specialX; 
else if ((startCoin >= 10) && (startCoin < 100))
 coinToBet = 0.00100000 * specialX;  
else if ((startCoin >= 100) && (startCoin < 1000))
 coinToBet = 0.01000000 * specialX; 
else if (startCoin >= 1000)
 coinToBet = 0.10000000 * specialX; 
else
{
 console.log ("Starting Coin is LOW!: " + startCoin);
 coinToBet = 0.00000010;
}

var lastGameNo = $("table.dice_table td:eq(16)").text();

playNow(startCoin, coinToBet, lastBet, startGame, noResult, lastGameNo);


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
} 

function checkWallet(startCoin){
 //console.log ("checkWallet... ");
 var coinString = $("div.dice_select span").text();
 var stringSplit = coinString.split("-");
 var coinBalance  = parseFloat(stringSplit[1]);
 console.log ("Start Coin: " + startCoin + " - Balance: " + coinBalance); 
 console.log ("Profit: " + floor(+coinBalance - +startCoin).toFixed(8)); 
 
 return coinBalance;

}

function playNow(startCoin, coinToBet, lastBet, startGame, noResult, lastGameNo)
{
 var betTimer = 600; //1sec

 if (startGame > 0)
 {
  var betdone = floor($("table.dice_table td:eq(20)").text()).toFixed(8);
  var lastgameBet =$("input[name=bet]").val();  
  if (lastgameBet != betdone)
  {
   console.log ("Waiting for Bet result! ");
   var nextGame = "NOK"
   noResult++;
   if (noResult >= 10)
   {
    console.log ("Refresh page and run script again! ");
    return;
   }
  }
  else
  {
   noResult = 0;
   var nextGame = "OK" 
  }
 }
 else
  var nextGame = "OK"
 
 if (lastBet !== 0)
  var coinBetNow =  floor(+lastBet * 2).toFixed(8);
 else
  var coinBetNow =  floor(+coinToBet).toFixed(8);   

 var gameNo = $("table.dice_table td:eq(16)").text();
 if ((lastGameNo !== gameNo) || (startGame == 0)) 
 { 
  $("input[name=bet]").focus().val(coinBetNow).blur();

  var checkerb4 =$("input:button:eq(4)").val();
  var checkerb5 =$("input:button:eq(5)").val();  
  if(( checkerb4 == "Roll < 48" ) && ( checkerb5 == "Roll > 52" ) && nextGame == "OK")
  {
   var gameBet =$("input[name=bet]").val();
   if (gameBet == coinBetNow)
   {
    startGame++;
    console.log ("Bet No: " + startGame); 
    var coinStatus = checkWallet(startCoin);
    if ((coinStatus == "NOK") && (startGame > 50))
     return;

    if (lossCount < 3)
     $("input:button:eq(4)").click();
    else
    {
     if (lossCount > 7)
     {
      if (lossCount > 11)
       $("input:button:eq(5)").click();       
      else
       $("input:button:eq(4)").click();
     }
     else
      $("input:button:eq(5)").click();
    }
    lastGameNo = gameNo;
   }
   else
   {
    console.log ("Bet NOK");       
   } 
  }
 
 }
 
 if(( checkerb4 == "Playing..." ) || ( checkerb5 == "Playing..." ))
  wait(1);

 if(( checkerb4 == "Lost" ) || ( checkerb5 == "Lost" )) 
 {
  lossCount++;
  winCount = 0;
  lastBet = coinBetNow;
 }
 
 if(( checkerb4 == "Lost" ) || ( checkerb5 == "Win!" )) 
 {
  lossCount++;
  winCount = 0;
  lastBet = coinBetNow;
 }
 
 if(( checkerb4 == "Win!" ) || ( checkerb5 == "Lost" )) 
 {
  lossCount++;
  winCount = 0;
  lastBet = coinBetNow;
 }
 
 if(( checkerb4 == "Win!" ) || ( checkerb5 == "Win!" ))  
 {
  winCount++; 
  lossCount = 0;
  lastBet = 0;
 }
 
 if (lossCount > 15)
 {
  console.log ("Stop Loss!");
  return;
 }
 else
  return setTimeout(function(){playNow(startCoin, coinToBet, lastBet, startGame, noResult, lastGameNo)},betTimer); 
}

//loopTest=1000;
//while(true){

// <<< YOUR DUPLICATED MACROS HERE AND WAIT 2 SECONDS >>>

//iimPlay("temp-mail.iim");
//iimPlay("copy.iim");
//}
