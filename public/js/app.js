let addChartBtn =  document.querySelectorAll('.add-to-cart')
let cartItemEl = document.querySelectorAll('.minicart-items')
let count = 1
let textItem

for(let btn of addChartBtn){
    btn.addEventListener('click', ()=>{
        cartItemEl.forEach(element => {
            element.innerHTML = ""

            if (count == 0 || count == 1){
                textItem = "item"
            }
            else{
                textItem = "items"
            }
            element.innerHTML = `${count} ${textItem}`
        });
        count++
    })
}