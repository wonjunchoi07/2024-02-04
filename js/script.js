/**
 * 메인페이지 슬라이드(자동 슬라이드, 일시정지, 재개 기능 구현)
 */

function CarouselSlide(){
    const myCarouselElement = document.querySelector('#carouselExampleIndicators')
    const carousel = new bootstrap.Carousel(myCarouselElement, {
        interval: 100,
        pause: false,
 });
}

function pauseCarousel(){
    const myCarouselElement = document.querySelector('#carouselExampleIndicators')
    $(myCarouselElement).carousel('pause')
}

function playCarousel(){
    const myCarouselElement = document.querySelector('#carouselExampleIndicators')
    $(myCarouselElement).carousel('cycle')
}

//Reservation
function reservation() {
    //JSON파일에서 데이터 불러오기
    async function fetchReservation(){
        const gerReservationJSON = await fetch("../api/reservation.json");
        const reservationJSON = await gerReservationJSON.json();
        console.log(reservationJSON["reservition"])
        return reservationJSON["reservition"]
    }
    
}