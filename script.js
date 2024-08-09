//Değişkenleri tanımladığım id ile yakaladığım yer
const container = document.querySelector('.container');
const count=document.getElementById('count');
const amount=document.getElementById('amount');
const select = document.getElementById('movie');
const seats =document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotalAmount();
container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){ // classListte contains ile yakalama yaptım
        e.target.classList.toggle('selected');
        calculateTotalAmount();
    }
})
select.addEventListener('change',function(e){
    calculateTotalAmount();
});
// HESAPLAMA YAPTIĞIM BLOK
function calculateTotalAmount(){
    const selectedSeats=container.querySelectorAll('.seat.selected'); 
    const selectedSeatsArray=[];
    const seatsArray = [];
    //seçili koltukları diziye push ettim bu fonksiyonu spread aracılığıyla yapablirim 
    selectedSeats.forEach(function(seat){
        selectedSeatsArray.push(seat);
    })
    //bütün koltukları diziye push ettim 
    seats.forEach(function(seat){
        seatsArray.push(seat);
    });
    //[1,3,4] seçili elemanın listenin kacıncı elemanı olduğunu listeye ekler 
    let selectedSeatIndexs=selectedSeatsArray.map(function(seat){
        return seatsArray.indexOf(seat);
    });

    console.log(selectedSeatIndexs);
     

    let selectedSeatCount = selectedSeats.length;
    count.innerText=selectedSeatCount;
    amount.innerText=select.value * selectedSeatCount;

    saveToLocalStorage(selectedSeatIndexs);
}
//localStorage ' dan verileri çekme işlemi 
function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !=null && selectedSeats.length > 0){
        seats.forEach(function(seat,index) {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex= localStorage.getItem('selectMovieIndex');

    if(selectedMovieIndex !=null){
        select.selectedIndex = selectedMovieIndex;
    }
}
function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectMovieIndex' ,select.selectedIndex);
    
}