/**
 * 메인페이지 슬라이드(자동 슬라이드, 일시정지, 재개 기능 구현)
 */

function CarouselSlide(){
    const myCarouselElement = document.querySelector('#carouselExampleIndicators')
    const carousel = new bootstrap.Carousel(myCarouselElement, {
        interval: 100,
        pause: false,
 });//반복 속도 제어 기능 구현
}

function pauseCarousel(){
    const myCarouselElement = document.querySelector('#carouselExampleIndicators')//정지 구현
    $(myCarouselElement).carousel('pause')
}

function playCarousel(){
    const myCarouselElement = document.querySelector('#carouselExampleIndicators')// 반복 구현
    $(myCarouselElement).carousel('cycle')
}

//Reservation(예약페이지)
function reservation() {
    //JSON파일에서 데이터 불러오기
    async function fetchReservation(){
        const gerReservationJSON = await fetch("../api/reservation.json");
        const reservationJSON = await gerReservationJSON.json();
        console.log(reservationJSON["reservition"])
        return reservationJSON["reservition"]
    }
    
    const resDateTableElem = document.querySelector("#resDateTable");
    for (let i = 0; i < 14; i++ ){ // 조건에 맞게 반복
        const date = new Date();
        date.setDate(date.getDate() +i);
        const year = date.getFullYear();
        const month = ("0"+(date.getMonth() +1)).slice(-2);//0을 추가 및 두자리 수의 월 출력
        const day = ("0"+(date.getDate() )).slice(-2); // 0을 추가 밎 두자리 수의 일 출력
        let week = date.getDay();
        // 조건식 ? 참일 때의 값  : 거짓일 때의 값;
        //weekTostring = (week == 0 || week == 6) ? "주말" : "주중";
        calendar = `${year}.${month}.${day}`;

        if(week == 0)
        {
           resDateTableElem.innerHTML += `<th id="D+${i}>${calendar}</th>`//조건에 맞게 sun이라는 클래스 추가
        }
        else if(week == 6){
            resDateTableElem.innerHTML += `<th id="D+${i}>${calendar}</th>`//조건에 맞게 sat이라는 클래스 추가
        }
        else{
            resDateTableElem.innerHTML += `<th id="D+${i}>${calendar}</th>`
        }

    }


    for(let i=0; i<=13; i++){
        for(let k=0; k<=16; k++){
            document.querySelector(`#row${k}`).innerHTML += `<td></td>`;
        }
    }

    async function updateReservation(){ // 비동기로 예약 정보를 불러오는 함수

        const res =await fetchReservation();
        for(let i=0; i<=13; i++){// 가로 줄에서 출력하도록 만들게 하는 반복
            for(let k=0; k<=16; k++){ //날짜 줄에서 출력하도록 만들게 하는 반복
                const data = res[i][`D+${i}`][k]["status"]; // 데이터 가공 및 처리
                const tdElem = document.querySelector(`#row${k} > td:nth-of-type(${i + 2})`); // 출력 

                if (data =="W"){// 조건에 맞게 출력 및 클래스 네임 처리
                    tdElem.innerText = "●";
                    tdElem.className = `W D+${i} ${k}`;
                    tdElem.addEventListener("click",yaeyak);
                } else if(data == "R"){
                    tdElem.innerText = "▲";
                    tdElem.className = `R D+${i} ${k}`;
                    tdElem.addEventListener("click",noyaeyak);
                }else{
                    tdElem.innerText = "■";
                    tdElem.className = `C D+${i} ${k}`;
                }

                 //document.querySelector(`#row${i}`).innerHTML += `<td>${res[k][`D+${k}`][i]["status"]}</td>`;
            }
        }
        
        
        
               

        
    }
    //5초마다 updateReservation 함수를 호출
    setInterval(() => {
        updateReservation();
    },5000)
    updateReservation();// 최초 접속 시 updateReservation을 즉시 호출하여 페이지를 렌더링
    

}
function yaeyak(){
    const rowValue = this.classList[2];
    let position;
    if (rowValue <= 6){
        position = "A" +("0" + (Number(rowValue) + 1)).slice(-2);
    }else{
        position = "T" +("0" + (Number(rowValue) - 6)).slice(-2);
    }

    document.querySelector("#position").innerText = `자리 : ${position}`;
    $("#exampleModalLive").modal("show");

    document.querySelector("#positon").innerText = `자리 : ${position}`;
    $("#exampleModalLive").modal("show");

    const week = document.getElementById(`${this.classList[1]}`).className;//파라미터를 이용해서 데이터를 가져옴
    //주말, 평일 / a,t 영역구분
    let price;
    if(week != ""){
        if(position.includes("A")){//if 문을 사용해서 주말 요금과 평일 요금 A자리를 이용해서 계산함
            price = 30000;
        }else{
            price = 20000;
        }
    }else{
        if(position.includes("A")){
            price = 25000;
        }else{
            price =15000;
        }
    }

    document.querySelector("#position").innerText = `날짜 : ${position}`;
    document.querySelector("#price").innerText = `금액 : ${price.toLocaleString()}원`;//메소드를 이용해서 천 단위를 ,로 구분해줌

    $("#exampleModalLive").modal("show");
}

function noyaeyak(){
    alert("예약할 수 없습니다.");
}
// 휴대폰 번호 정규표현식으로 3-4-4 만들기
const regexPhonNumber = (target) =>{
    target.value = target.value.replace(/[^0-9]/g,"").replace(/^(|d{3})(|d{4})(|d{4})/,`$1-$2-$3`); //정규 표현식을 사용해서 전화번호를 -을 사용해서 구분함
}
//인증번호 정규표현식
const regexVarifyNumber = (target) => {
    target.value = target.vlaue.replace(/[^0-9]/g,"");
}

//인증번호 칸 활성화 조건
function sendVerifyNumber(){
    if(document.querySelector("#phoneNumber").value.length == 13){ //전화번호 길이가 13이면 인증번호칸 활성화.
        document.querySelector("#phoneVerify").disbled = false;
    }else{
        alert("휴대폰 번호를 확인해주세요");
    }
}


function reservationSubmit(){
    const name = doncument.querySelector("#name").value;
    const phoneNumber = document.querySelector("#phoneNumber").value;
    const phoneVerify = document.querySelector("#phoneVerify").value;

    if(!name) {
        return alert("이름을 확인하여 주시기 바랍니다.") //value는 문자열로 데이터를 들고와서 name에 문자가 있는 지 없는 지 검사해줌
    }
    if(phoneNumber.length != 13){
        return alert("전화번호를 확인하여 주시기 바랍니다.")
    }
    if(phoneVerify != "1234"){
        return alert("인증번호를 확인하여 주시기 바랍니다.")
    }

    $("#exampleModalLive").modal("hide");
    //alert("예약완료")
    showToast();
}

function showToast(){
const toastLiveExample = document.getElementById('liveToast')
const toast = new bootstrap.Toast(toastLiveExample)
toast.show();
}


// 마이페이지 부분
const BabipGrillPrice = 10000;
const pigBabiqPrice = 12000;
const haesanBabiqPrice = 15000;
const juicePrice = 3000;
const sojuprice = 5000;
const gajaSetPrice = 4000;

//가격 순서대로 리스트
const orderArr = [0,0,0,0,0,0];
let totalPrice = 0;
let orderCount = 0;

function setPrice(product){
    switch (product.id){
        case 'babiqGrill':
        orderArr[0] = product.value;
        break;
    }
    switch (product.id){
        case 'pigBabiq':
        orderArr[1] = product.value;
        break;
    }
    switch (product.id){
        case 'haesanBabiq':
        orderArr[2] = product.value;
        break;
    }
    switch (product.id){
        case 'juice':
        orderArr[3] = product.value;
        break;
    }
    switch (product.id){
        case 'soju':
        orderArr[4] = product.value;
        break;
    }
    switch (product.id){
        case 'gajaSet':
        orderArr[5] = product.value;
        break;
    }
    
    const babiqGrillTotal = BabipGrillPrice * orderArr[0]
    const pigBabiqTotal = pigBabiqPrice * orderArr[1]
    const haesanBabiqTotal = haesanBabiqPrice * orderArr[2]
    const juiceTotal = juicePrice * orderArr[3]
    const sojuTotal = sojuprice * orderArr[4]
    const gajaSetTotal = gajaSetPrice * orderArr[5]
    totalPrice = babiqGrillTotal + pigBabiqTotal + haesanBabiqTotal + juiceTotal + sojuTotal + gajaSetTotal;
    document.querySelector("#totalPrice").innerText = `총 주문 금액 : ${totalPrice.toLocaleString()}원`

    
}
function orderModal(){
    $(BabiqOrderModal).modal("show");
}
function babiqSubmit(){
    $(BabiqOrderModal).modal("hide");
    orderCount++;
    document.querySelector("#totalOrder").innerText = orderCount;
}