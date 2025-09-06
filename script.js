// 구현할 기능
// 유저는 숫자를 입력할 수 있다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 작으면 Up! 이라고 알려준다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 크면 Down! 이라고 알려준다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자와 일치하다면 That’s right이라고 뜨고 게임이 종료된다.
// 유저는 총 5번의 기회가 있다
// 게임이 종료되면 버튼은 비활성화된다
// 리셋버튼을 누르면 게임이 초기화된다
// 유저가 1~100범위 밖에 숫자를 입력할시에 경고메세지가 뜬다
// 유저가 이미 입력한 값을 또 입력할 시에 경고메세지가 뜬다
// 반응형 UI
//랜덤한 값은 ?라는 카드 클래스의 innerHTML에 표시
//언제? 맞추거나 기회가 0번이 됐을 때 카드의 ?표시가 사라지면서 숫자 표시
//유저가 입력한 값을 알기 위해서 입력한 값이라는 부분에 유저가 작성한 값을 div태그로 저장한다.

let random = Math.floor(Math.random() * 100) + 1;
console.log(random);
let count = 5;
let numInput = document.getElementById('number-Input');
let correctBtn = document.querySelector('.answer-button');
let hintBox = document.getElementById('answer');
let checkChance = document.querySelector('.save-Heart');
let resetBtn = document.querySelector('.reset-button');
let userNum = [];
let seeNum = document.querySelector('.save-user-num');
let checkCorrect = document.querySelector('.card-text');
let cardRotate = document.querySelector('.card');

correctBtn.addEventListener('click', correctCheck);

resetBtn.addEventListener('click', reset);

function enterPush(event) {
	if (event.keyCode === 13) {
		correctCheck();
	}
}
//하트 감소 함수
function updateHearts(count) {
	for (let i = 1; i <= 5; i++) {
		document.getElementById('heart' + i).style.display =
			i <= count ? 'inline-block' : 'none';
		document.getElementById('empty' + i).style.display =
			i > count ? 'inline-block' : 'none';
	}
}

function correctCheck() {
	//조건 체크를 할 때 순서 입력값 공백 체크 -> 숫자 변환 및 범위 체크 -> 게임 로직 처리
	//즉 공백란 체크를 먼저하고 범위 체크를 한 후에 게임 로직 처리를 하는 것이 올바르다.
	//내 이전 코드에 문제가 생겼던 이유는 범위체크를 먼저하고 공백체크를 하였기에 입력값을 작성하지 않아도 범위 체크의 내용이 출력된 것이다.
	const userNumCheck = Number(numInput.value);
	//여기를 const 변수로 값체크를 하지 않은 이유는
	//넘버로 받았을 때 비어있는 값은 0이기 때문에 문제가 생겨
	//문자열 타입으로 그대로 받아 그 값의 밸류로 체크를 하고 정수형 타입은 따로 체크한다.

	for (let i = 0; i < userNum.length; i++) {
		//배열의 값을 확인해서 배열의 값과 같으면 같은 수를 입력했다고 알려주는 코드
		//그리고 저는 하나를 추가한게 입력한 값이라고 하는 코드에다가 얘네의 값을 집어넣어야합니다.
		if (userNum[i] === userNumCheck) {
			hintBox.innerHTML = '이미 입력된 숫자입니다.';
			numInput.value = '';
			return;
		}
	}
	if (numInput.value === '') {
		hintBox.innerHTML = '작성하쇼';
		alert('작성하쇼');
		return;
	}
	if (userNumCheck > 100 || userNumCheck <= 0) {
		hintBox.innerHTML = '벗아낫쇼';
		alert('벗어낫쇼');
		numInput.value = '';
		return;
	}
	userNum.push(userNumCheck);
	if (userNum) {
		const newDiv = document.createElement('div');
		newDiv.classList.add('userNumID');
		newDiv.textContent = userNumCheck;
		seeNum.appendChild(newDiv);
	}
	if (random === userNumCheck) {
		delayedUpdate(hintBox, 'CORRECT');
		delayedUpdate(checkCorrect, random);
		cardRotate.classList.add('rotate-card');
		correctBtn.disabled = true;
		correctBtn.style.backgroundColor = '#121212';
		correctBtn.style.cursor = 'default';
		numInput.disabled = true;
		numInput.style.backgroundColor = '#121212';

		//카운트 소진시와 다르게 placeholder값만 비우면 숫자가 그대로 남아있는데 그 이유는
		//입력창이 비어있어야 보이고 값이 있으면 플레이스 홀더는 안보임
		//즉 입력창에 값이 남아있으면 플레이스 홀더가 아니라 입력값이 보이는 것이라서 둘 다 비워줘야 깨끗함.
		numInput.value = '';
		numInput.placeholder = '';
	} else if (random < userNumCheck) {
		hintBox.innerHTML = 'Down';
		numInput.value = '';
		count--;
	} else if (random > userNumCheck) {
		hintBox.innerHTML = 'Up';
		numInput.value = '';
		count--;
	}

	//여기서 전역변수 count를 전달받아 값을 사용 간단한 내용이였는데 내가 매개변수 count와
	//전역변수 count의 값을 헷갈려서 생긴 문제 여기에 들어가는 count는 전역변수였는데 지역변수 count와 헷갈림 주의!!
	updateHearts(count);

	if (count === 0) {
		delayedUpdate(hintBox, '기회가 모두 소진되었습니다!');
		delayedUpdate(checkCorrect, random);
		cardRotate.classList.add('rotate-card');
		correctBtn.disabled = true;
		correctBtn.style.backgroundColor = '#121212';
		correctBtn.style.cursor = 'default';
		numInput.disabled = true;
		numInput.style.backgroundColor = '#121212';
		numInput.placeholder = '';
	}
}

function reset() {
	random = Math.floor(Math.random() * 100) + 1;
	correctBtn.disabled = false;
	hintBox.innerHTML = 'Up & Down';
	correctBtn.style.backgroundColor = '#f5f5f5';
	correctBtn.style.cursor = 'pointer';
	numInput.disabled = false;
	numInput.style.backgroundColor = '#f5f5f5';
	checkCorrect.innerHTML = '?';
	numInput.placeholder = '값을 입력하세요';
	numInput.value = '';
	userNum = [];
	count = 5;

	//여기서도 전역변수 count와 값을 같게 5로 초기화
	updateHearts(5);
	cardRotate.classList.remove('rotate-card');
	//forEach를 사용해서 전체 삭제
	//구조는 el이라는 매개변수를 주고 여기서 el이란 userNumID라는 값을 가진 객체 하나하나를 의미한다.
	//결국 그 객체들을 하나하나 다 돌면서 삭제하기에 전체 삭제가 가능함.
	document.querySelectorAll('.userNumID').forEach((el) => el.remove());
	console.log(random);
}
//배경음악 추가 완료!!
//엔터키누르면 입력 완료!!
//숫자를 틀리면 X표시의 아이콘이 화면에 크게 나오면서 사운드 넣기
//특정 이벤트(문제 제출, 정답오답에 따른 결과, 기회소진) 발생시 음향처리 및 인게임 이벤트(게임화면 위에 X크게 나오거나 O크게 나오는 등)처리

//오디오 관련 코드
let audio = document.querySelector('.music-control');
let playPauseBtn = document.getElementById('playPauseBtn');
let volumeSlider = document.getElementById('volum-slide');
let volumeCtr = document.getElementById('volum-ctr');
let mouseInOutCheck = document.querySelector('.mouseInOut');

playPauseBtn.addEventListener('click', audioPlay);

function audioPlay() {
	if (audio.paused) {
		audio.play();
		playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
	} else {
		audio.pause();
		playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
	}
}

volumeSlider.addEventListener('input', (e) => {
	audio.volume = e.target.value;
});

playPauseBtn.addEventListener('mouseenter', () => {
	volumeCtr.style.opacity = 1;
});

mouseInOutCheck.addEventListener('mouseleave', () => {
	volumeCtr.style.opacity = 0;
});

//익명함수 딜레이 주기 위해서
function delayedUpdate(target, value, delay = 1200) {
	setTimeout(() => {
		target.innerHTML = value;
	}, delay);
}
