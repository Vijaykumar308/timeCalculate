const addTime = document.querySelector("#addTime");
let timeClock =  document.querySelector("#timeClock");
const submitBtn = document.querySelector("#submitBtn");
const timeSum = document.querySelector(".time-sum");
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
// console.log(defaultText);
let timeAddNumber = 0;

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
	console.log(time);
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

submitBtn.addEventListener("click",()=>{
	defaultText[1].remove();
	console.log("time in array: "+weeksDaysTimes);
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
	createItem(timeSum,h2,`${totalHr}hr : ${totalMins}mins`);
	hours.splice(0,hours.length);
	minutes.splice(0,minutes.length);
	h2.classList.add("mt-5","py-3");
});
