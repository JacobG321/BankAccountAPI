  // deposit
  const depositHandler = (e) => {
    e.preventDefault()
    accounts.map((account,index)=>{
      if(account._id === depositAccount){
        setNewBalance(account.checking.currentBalance+=Number(depositAmount))
      }
    })
  }

  // deposit Check if newBalance state is not 0
  if(newBalance){
    axios.put(`http://localhost:8000/api/accounts/${depositAccount}`,newBal)
    .then((res)=>{
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  const depositHandler = (e) => {
    e.preventDefault()
    accounts.map((account,index)=>{
      if(account._id === depositAccount){
        setNewBalance(account.checking.currentBalance+=Number(depositAmount))
      }
    })
  }