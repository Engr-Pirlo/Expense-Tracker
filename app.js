const balance  = document.getElementById("balance")
const money_plus  = document.getElementById("money-plus")
const money_minus  = document.getElementById("money-minus")
const list  = document.getElementById("list")
const text = document.getElementById("text")
const amount  = document.getElementById("amount")
const form  = document.getElementById("form")


// First Step We gonna Do.......dummary Transaction

// The Step Seven step You Can Do......

const localStorageTransaction = localStorage = JSON.parse(localStorage.getItem('transactions'))


let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

// const dummyTransaction = [
//     {Id: 1, text: 'Computer', amount: 12600},
//     {Id: 2, text: 'Shampoo', amount: 100},
//     {Id: 2, text: 'Flash', amount: 1000},
//     {Id: 4, text: 'table', amount: -4100},
//     {Id: 3, text: 'Loptop', amount: 3000},
//     {Id: 5, text: 'Mobile', amount: -1300}
// ]

// Gobol-state of Transaction

// let transactions = dummyTransaction;


// Add Transaction == Uso Laabo Kan 

function addTransaction(e){
    e.preventDefault()

    if(text.value === '' || amount.value === ""){
        alert("Please Enter Amount and Text")
    }else{

        const transaction = {
          id: generateID(),
          text: text.value,
          amount: +amount.value
        }

        // console.log(transaction)
        transactions.push(transaction)
        addTransactionDom(transaction);
        updateValues()

        updateLocalStorage()
        
        text.value  = "";
        amount.value = "";
    }
}

// The five Step Generated ID function

function generateID(){
    return Math.floor(Math.random() * 100000000)
}


// Add Transaction display on dom history

function addTransactionDom(transaction){
  
    // Get Sing

    const sing  = transaction.amount < 0 ? "-" : "+";

   


    const item =  document.createElement("li");

    // Add class base on value;

    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
     ${transaction.text} <span>${sing}${Math.abs(transaction.amount)}<span/> <button class= 'delete-btn' onclick='removeTransaction(${transaction.Id})'>x</button>
    
    `;

    list.appendChild(item)
}

// The Third Step is Update Balanced and income and Expense.

function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount)
    

    // console.log(amount)

    const total = amounts.reduce((acc,item) =>(acc +=item),0).toFixed(2);

    // console.log(total)

    const income  = amounts
               .filter(item => item  >0)
               .reduce((acc,item) =>(acc += item),0)
               .toFixed(2);
            
    // console.log(`This Our Income: ${income}`);

    const expense = amounts
                   .filter(item => item < 0)
                   .reduce((acc,item)=>(acc +=item),0)*-1
                   .toFixed(2);

            //  console.log(`This Our Expense: ${expense}`) 
            
           
      balance.innerText = `$${total}`;
      money_plus.innerText = `$${income}`;
      money_minus.innerText = `$${expense}`

}


// the Ste Six Remove Value transaction By ID;
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.Id !==id)

    updateLocalStorage()

    init()
}

// The Step Eight Update LocalStore Transaction

function updateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions))
}






// The Second Step is Here.... we need init function that runs our app;

function init(){
    list.innerHTML = "";

    transactions.forEach(addTransactionDom)
    updateValues()

}

init()


// The Fourth Step we gonna Do Add Transaction Delete

form.addEventListener('submit', addTransaction)