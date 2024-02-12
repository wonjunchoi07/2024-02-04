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
           resDateTableElem.innerHTML += `<th class="sun">${calendar}</th>`//조건에 맞게 sun이라는 클래스 추가
        }
        else if(week == 6){
            resDateTableElem.innerHTML += `<th class=sat>${calendar}</th>`//조건에 맞게 sat이라는 클래스 추가
        }
        else{
            resDateTableElem.innerHTML += `<th>${calendar}</th>`
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
                } else if(data == "R"){
                    tdElem.innerText = "▲";
                    tdElem.className = `R D+${i} ${k}`;
                }else{
                    tdElem.innerText = "■";
                    tdElem.className = `C D+${i} ${k}`;
                }

                 //document.querySelector(`#row${i}`).innerHTML += `<td>${res[k][`D+${k}`][i]["status"]}</td>`;
            }
        }
        
        
        
               

        
    }
    updateReservation();
    

}