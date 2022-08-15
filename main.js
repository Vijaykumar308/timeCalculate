const addTime = document.querySelector("#addTime");
const submitBtn = document.querySelector("#submitBtn");
const timeSum = document.querySelector(".time-sum");

let timeClock =  document.querySelector("#timeClock");
let defaultText = document.querySelectorAll(".default-text");

//re-useable function
const createItem = (parentElement,element,innerValue) =>{
	element.classList.add("default-text","fs-4","bg-danger","text-white","px-2","mx-1","word-wrap","rounded");
	element.innerHTML = innerValue;
	parentElement.append(element);
};
const addCSS = (element,cssProperty,cssValue)=>{
	element.style.cssProperty = cssValue;
}
//divs

// li.classList.add("list-group","py-1","bg-success","text-white", "my-1","text-bold");
// li.style.letterSpacing = "2px";
// li.innerHTML = "9:10";
// timeList.append(li);

let weeksDaysTimes = [];
let hours = [];
let minutes = [];
let timeAddNumber = 0;
let perDayShift = 9;

function isAlpha(stringArr){
	for(let i=0;i<=stringArr.length;i++){
		if( (stringArr[i] >= 'A' && stringArr[i] <= "Z") || 
		    (stringArr[i] >= 'a' && stringArr[i] <= "z"))
		{
			return true;
		}
	}
	return false;
}

function validateTime(time){
	//console.log(time);
	if( (time.length == 0) && (!isAlpha(time) )) {
		return false;
	}else{
		return true;
	}
}

addTime.addEventListener("click",()=>{
	defaultText[0].remove();
	let numberOfDays = document.querySelector("[name='days']");
	if(!numberOfDays.checked){
		numberOfDays.value = 6;
	}
	if(timeAddNumber == numberOfDays.value){
		alert(`${numberOfDays.value} times has been added`);
	}else{

		const timeList = document.getElementById("timeList");
		const code = document.createElement('code');
		// timeClock.value = "";
		res = validateTime(timeClock.value);
		if(res){
			createItem(timeList,code,timeClock.value);
			addCSS(code,"letterSpacing","2px");
			weeksDaysTimes.push(timeClock.value);
			timeAddNumber++;
		}else{
			alert("time not valid");
		}
	}
});

let h2 = document.createElement("h2");
let h3 = document.createElement('h3');

function getHrs(time){
	let t = time.split(":");
	return t[0];
}
function getMint(time){
    let t = time.split(":");
	return t[1];
}
submitBtn.addEventListener("click",()=>{
	defaultText[1].remove();
	//console.log("time in array: "+weeksDaysTimes);
	weeksDaysTimes.forEach(function(val,index){
		let time = val.split(":");
		if(time[0] > 12){
			time[0] = time[0] - 12;
		}
		hours.push(time[0]);
		minutes.push(time[1]);
	});
	let totalHr = 0;
	hours.map(function(hr){
		totalHr += Number(hr);
	}); 

	let totalMins = 0;
	minutes.map(function(mins){
		totalMins += Number(mins);
	});

	while(totalMins >= 60){
		totalHr += 1;
		totalMins -= 60;
	}	

	let finalTime = `${totalHr}:${totalMins}`;
	let shouldBeHr = (weeksDaysTimes.length * perDayShift);
		shouldBeHr = shouldBeHr+":00";
	let timeLess = 0;

	let finalTimeArr = finalTime.split(":");
	let finalTimeArrHour = finalTimeArr[0];
	let finalTimeArrMint = finalTimeArr[1];

	let shouldBeHrArr = shouldBeHr.split(":");
	let shouldBeHrArrHour = shouldBeHrArr[0];
	let shouldBeHrArrMint = shouldBeHrArr[1];

			
	if(finalTime >= shouldBeHr){
	   //console.log("finalTime is greater");
		//console.log(`shouldBeHr ${shouldBeHr}`);		
	//console.log(`finalTime ${finalTime}`);
	   let hrLess = Number(finalTimeArrHour) - Number(shouldBeHrArrHour);
       let mintLess = Number(finalTimeArrMint) - Number(shouldBeHrArrMint);

	   timeLess = `${hrLess}hr : ${mintLess} mint (over)`;
	   //console.log(timeLess);
	}else{
	   shouldBeHr = shouldBeHr.replace("00","60");
       //console.log("finalTime is less"+shouldBeHr);

	   //console.log(`finalTime ${finalTime}`);
       //console.log(`shouldBeHr ${shouldBeHr}`);		

	   let shouldBeHrArr = shouldBeHr.split(":");
	   let shouldBeHrArrHour = shouldBeHrArr[0];
	   let shouldBeHrArrMint = shouldBeHrArr[1];

	   let hrLess = (Number(shouldBeHrArrHour) - Number(finalTimeArrHour)) - 1 ;
       let mintLess = Number(shouldBeHrArrMint) -  Number(finalTimeArrMint);

       timeLess = `${hrLess} hr : ${mintLess} mint (less)`;
       //console.log(timeLess);
	}
	//logic to get less hr 
	//1. we've finalTime 
	//2. we calculate the => shouldbe hr using weekdaystime * pershifthours
	//3. if(shouldBe > finalTime) // less time 
		// return shouldBeHr - finaltime;
	//else // overTime
		// return finalTime - shouldBeHr;

	createItem(timeSum,h2,`${totalHr}hr : ${totalMins}mins`);
	h2.classList.add("mt-4","py-2");

	createItem(timeSum,h3,timeLess);
	h3.classList.add("mt-3","py-2");

	hours.splice(0,hours.length);
	minutes.splice(0,minutes.length);
});