const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list  = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");




const dummyTransaction = [
//     {id: 1, text: 'flower', amount: -20},
//     {id: 2, text: 'Laptop', amount: -20},
//     {id: 3, text: 'Camera', amount: -20},
//     {id: 4, text: 'Salary', amount: 300},
//     {id: 5, text: 'Salary', amount: 10000},
//     {id: 6, text: 'Studio', amount: 30000},
//     {id: 7, text: 'Youtube-', amount: 90000},
 ];

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));



let transactions = localStorage.getItem('transactions')!==null? localStorageTransaction : [];

// let transactions = dummyTransaction;




function addTransaction(e){
    e.preventDefault()

    if(text.value.trim() === ''  || amount.value.trim()===''){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Enter text and Amount!',

          })


    }else{
        const transaction ={
            id: generateID(),
            text:text.value,
            amount: +amount.value
        }

        console.log(transaction);
        transactions.push(transaction)
        addTransactionDom(transaction)

        updateValues()

        UpdateLocalStorage();

        text.value = "";
        amount.value = ""
    }

}


// Generate ID

function generateID(){
    return Math.floor(Math.random() *1000000000)
}



// Add Transaction to Dom list

function addTransactionDom(transaction){
    // Get Sing

    const sing = transaction.amount < 0 ? '-' : '+';


    const item  = document.createElement('li')

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus': 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sing}${Math.abs(transaction.amount)}<span/> 
    <button class='delete-btn' onclick="removeTransaction(${transaction.id})">x<button/>
    
    `;

    list.appendChild(item);


}

// update the balance , income and expense

function updateValues() {
   const amounts = transactions.map(transaction => transaction.amount)

//    console.log(amounts)

 // Total Balance
    const total  = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);

    // console.log(total)

    // Income
    const income = amounts
      .filter(item => item > 0)
      .reduce((acc, item) =>(acc += item), 0)
      .toFixed(2)
    // console.log(income);

    // Expense
    const expense = (
        amounts.filter(item => item < 0)
        .reduce((acc, item) => (acc += item),0) *-1
    ).toFixed(2);

    // console.log(expense);

    // update into the Dom

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}


// Remove Transaction by Id;

function removeTransaction(id){
    transactions = transactions.filter(transactions => transactions.id !==id);
    UpdateLocalStorage();

    init()

}


UpdateLocalStorage

function UpdateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}











// Init app

function init(){
    list.innerHTML = ''

    transactions.forEach(addTransactionDom);
    updateValues()

}

init()



form.addEventListener('submit', addTransaction)
