// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
//should return true and not mutate original array
const validateCred = (Arr) => {let editedArr = Arr.slice(0,Arr.length-1);
//console.log(Arr)
let rem = Arr[Arr.length-1]
//console.log(rem)
revEdited = editedArr.reverse();
//console.log(editedArr)
//console.log(revEdited)
const OddDoubledArr = editedArr.map((value,index) =>{
  //console.log(index%2 +"  "+ value)
  if(index%2===0){
    value = value * 2;
    if(value > 9)
    {
      value -=9;
     // console.log('Odd Value '+value);
      return value;
    }
    else{
      return value;
    }
}
else {
//console.log("I am even "+value);
return value
}
})
let sum = 0;
OddDoubledArr.forEach(element=>sum+=element);
//console.log('Sum before rem '+ sum)
sum+=rem;
//console.log(sum);
if(sum%10===0)
{
  return true;
}
else {
    return false;
}
//console.log(editedArr)
//console.log(OddDoubledArr);
};


//let array1  = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
console.log("I am going to be tested as Valid or Invalid:" , valid5);
console.log("This credit Card is Valid? ");
console.log(validateCred(valid5))
/*
const findInvalidCards = (nestArra) =>{
  let valArr = nestArra.forEach(elements =>
  if(validateCred(elements))===true)
  {
    return elements
  }

  //let inValArra = nestArra.forEach(elements=>console.log(validateCred(elements)));
//console.log(valArr);
//console.log(inValArra);
} 
findInvalidCards(batch)

*/
const findInvalidCreds = (nestArr)=> {
    let arr = [];
    for(let i=0;i<nestArr.length;i++)
    {
        if(validateCred(nestArr[i])!=true)
        {
            arr.push(nestArr[i])
            //console.log(i); tells that its invalid
        }
        else{}
    }
    return arr
}

let invalidNumbers = findInvalidCreds(batch) //array of invalid creds
console.log("Some Invalid Credit Card Numbers are: ", invalidNumbers)
//const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

function idInvalidCardCompanies(nestArr){
  let acceptComp = [];
    const companyMap = {
    3: 'Amex (American Express)',
    4: 'Visa',
    5: 'Mastercard',
    6: 'Discover',
  };

  let uniqueCompanies = []
  for(let i =0;i<nestArr.length;i++)
  {
    const firstDig = nestArr[i][0];
    const company = companyMap[firstDig];

    if(company && !uniqueCompanies.includes(company)){
      uniqueCompanies.push(company);
    }
  }
  if(uniqueCompanies.length===0)
  {
    return ['Company not Found'];
  }
  return uniqueCompanies;
}



const firstLetterChecker = arr =>{
  if(arr[0]===3||arr[0]===4||arr[0]===5||arr===6)
  {
    return true;
  }
  else{
    return false
  }
}

const invalidCompanies = idInvalidCardCompanies(invalidNumbers);
console.log("Invalid credit Cards are normally issued by these compaies: ", invalidCompanies);

//console.log(firstLetterChecker(invalid1))
//console.log(idInvalidCardCompanies(invalidNumbers));