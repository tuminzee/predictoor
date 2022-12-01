%lang starknet
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import assert_le,assert_not_zero,signed_div_rem,assert_in_range
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256,uint256_le,uint256_add,uint256_signed_div_rem,uint256_signed_nn
from starkware.cairo.common.bool import TRUE,FALSE
from starkware.starknet.common.syscalls import get_contract_address, get_caller_address
from openzeppelin.token.erc20.IERC20 import IERC20

//teamA 1,teamB 2 and 0
//variable eth_address
//0,1,2
struct MatchInfo{
    a:felt,
    b:felt,
    t_teamA : felt,
    t_teamB : felt,
    winner: felt,
    poolAmount:Uint256,
    status:felt,
}

@storage_var
func a(id:felt) -> (res: felt) {
}

@storage_var
func b(id:felt) -> (res: felt) {
}

@storage_var
func t_teamA(id:felt) -> (res: felt) {
}

@storage_var
func t_teamB(id:felt) -> (res: felt) {
}

@storage_var
func winner(id:felt) -> (res: felt) {
}

@storage_var
func poolAmount(id:felt) -> (res: Uint256) {
}


@storage_var
func ethereum_token() -> (res: felt) {
}

@storage_var
func status(id:felt) -> (res: felt) {
}

//const GOERLI_WETH_ADDRESS = 0x28179321c34e2ca38beafa45d0526673fbb5f044b4f46a9bcbe78841edfbc41.
@storage_var
func balance() -> (res: Uint256) {
}

@storage_var
func fee_per_match() -> (res: Uint256) {
}

@storage_var
func matchId(id:felt) -> (res:MatchInfo) {
}

@storage_var
func userInfo(matchId:felt,address:felt) -> (team: felt) {
}

@storage_var
func owner() -> (caller_address: felt) {
}


// @external
// func increase_balance{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
//     amount: felt
// ) {
//     with_attr error_message("Amount must be positive. Got: {amount}.") {
//         assert_nn(amount);
//     }

//     let (res) = balance.read();
//     balance.write(res + amount);
//     return ();
// }

@view
func get_balance_pool{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(id:felt) -> (r: Uint256) {
    let (res) = poolAmount.read(id);
    
    return (r=res);
}
@view
func get_fee{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (r: Uint256) {
    let (res) = fee_per_match.read();
    return (r=res);
}

// @view
// func get_match{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(id:felt)->(){
// let _a=a.read(id=id);
//  let   _b=b.read(id=id);
//  let   _t_teamA=t_teamA.read(id);
//  let   _t_teamB=t_teamB.read(id);
//  let    _winner=winner.read(id);
//  let   _poolAmount=poolAmount.read(id=id);
//  let   _status=status.read(id=id);
//  //let res: MatchInfo = new MatchInfo(_a,_b,_t_teamA,_t_teamB,_winner,_poolAmount,_status);
//  return(_a,_b,_t_teamA,_t_teamB,_winner,_poolAmount,_status);
// //return (res=res);
// }
@view
func get_match{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(id:felt)->(res:MatchInfo){
    let (res)= matchId.read(id);
return (res=res);
}
@view 
func winner_of_match{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(id:felt)->(res:felt){
    let (res)= winner.read(id);
return (res=res);
}
@view
func get_match_status{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(id:felt)->(res:felt){
let (res)= status.read(id);
return (res=res);
}
@view
func get_owner{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}()->(caller_address:felt){
let (res)=owner.read();
return (caller_address=res);
}

@view
func get_userPick{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(id:felt,acc:felt)->(team:felt){
//let (msgSender)= get_caller_address();
let (res) = userInfo.read(id,acc);
return(team=(res));
}

// @external
// func deposit_eth{syscall_ptr: felt*,pedersen_ptr:HashBuiltin*, range_check_ptr: felt}(amount : Uint256){
//     let (caller_address) = get_caller_address();
//     let (contract_address) = get_contract_address();
//     let (eth_address) = ethereum_token.read();
//     let (fee) = fee_per_match.read();
//     with_attr error_message("Amount must be positive. Got: {amount < fee}.") {
//         uint256_le(amount,amount);
//     }

//     let (res) = balance.read();
//     let (sum,c) = uint256_add(res, amount);
//     balance.write(sum);
//     IERC20.transferFrom(contract_address=eth_address, sender=caller_address, recipient=contract_address, amount=amount);
//     return();
// }

@external
func predictoor{syscall_ptr: felt*,pedersen_ptr:HashBuiltin*, range_check_ptr: felt}(id:felt,amount : Uint256,team:felt){
    alloc_locals;
    //let team_var:MatchInfo = matchId.read(id);
    let (_a)=a.read(id=id);
    let   (_b)=b.read(id=id);
    let   (_t_teamA)=t_teamA.read(id);
    let   (_t_teamB)=t_teamB.read(id);
    let    (_winner)=winner.read(id);
    let   (_poolAmount)=poolAmount.read(id=id);
    let   (_status)=status.read(id=id);

    let (caller_address) = get_caller_address();
    let (contract_address) = get_contract_address();
    let (eth_address) = ethereum_token.read();
    let (fee) = fee_per_match.read();
    // let x:Uint256 = Uint256(0,0);
    // let z:felt = 0;
    let (userTeam)=userInfo.read(id,caller_address);
    with_attr error_message("STATUS") {
        assert _status=1;
        }
    with_attr error_message("Already Pickd") {
    
        assert userTeam = 0;
    }
    with_attr error_message("Amount must be positive. Got: {fee < amount}.") {
       let (y)= uint256_le(fee,amount);
        assert y =1;
    }
    with_attr error_message("Pick a right team!.") {
        assert_in_range(team,1,3);
    }
    with_attr error_message("Match doesn't exist"){
        assert_not_zero(_a);
    }
    userInfo.write(id,caller_address,team);

    // if(team==1){
    // _t_teamA=_t_teamA+1;
    // t_teamA.write(id=id,value=_t_teamA);
    // }else{
    // _t_teamB=_t_teamB+1;
    // t_teamB.write(id=id,value=_t_teamB);
    // }
    // let (t_A) = team_var.t_teamA;
    // let (t_B) = team_var.t_teamB;
    //let (res) = balance.read();
 
    let (sum,c) = uint256_add(_poolAmount, amount);
    poolAmount.write(id=id,value=sum);
    // balance.write(sum);
   
   
    
    if (team==1 ){
     let incA = _t_teamA + 1;
        t_teamA.write(id=id,value=incA);
     }else{
      let incB= _t_teamB+1;
      t_teamB.write(id=id,value=incB);
     }
    // else{ t_B = t_B + 1}
    let   (_t_teamA)=t_teamA.read(id);
    let   (_t_teamB)=t_teamB.read(id);
    
    local new_match : MatchInfo = MatchInfo(a=_a,b=_b,t_teamA=_t_teamA,t_teamB=_t_teamB, winner=0,poolAmount=sum,status=_status);
    matchId.write(id,new_match);
  

    IERC20.transferFrom(contract_address=eth_address, sender=caller_address, recipient=contract_address, amount=amount);
    return();
}

@external
func createMatch{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    id: felt,teamA:felt,teamB:felt,_status:felt,_poolAmount:Uint256
) {
    alloc_locals;
    let (team_var) = a.read(id);
    let msgSender = get_caller_address();
    let owner = get_owner();
    assert (msgSender) = owner;
    with_attr error_message("Match already Exists") {
     assert team_var=0;
    }
  
    // A struct constructor is used to declare member values.
    //local new_match : MatchInfo = MatchInfo(
    a.write(id=id,value=teamA);
    b.write(id=id,value=teamB);
    t_teamA.write(id=id,value=0);
    t_teamB.write(id=id,value=0);
     winner.write(id=id,value=0);
    poolAmount.write(id=id,value=_poolAmount);
    status.write(id=id,value=_status);
    local new_match : MatchInfo = MatchInfo(a=teamA,b=teamB,t_teamA=0,t_teamB=0, winner=0,poolAmount=_poolAmount,status=_status);
    matchId.write(id,new_match);
    //matchId.write(id,new_match);
    return();
}
@external
func setWinner{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    id:felt,team:felt
){
    let (msgSender) = get_caller_address();
    let (owner) = get_owner();
    assert (owner) = (msgSender);
    winner.write(id=id,value=team);
    status.write(id=id,value=2);
    return();
}
@external
func claimFunds{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    id:felt
) {
   alloc_locals;
    let (_a)=a.read(id=id);
    let   (_b)=b.read(id=id);
    let   (_t_teamA)=t_teamA.read(id);
    let   (_t_teamB)=t_teamB.read(id);
    // CONVERT )TOTAL A and B TO UINT256
    let tA:Uint256 = Uint256(_t_teamA,0);
    let tB:Uint256 =Uint256(_t_teamB,0);
    let    (_winner)=winner.read(id);
    let   (_poolAmount)=poolAmount.read(id=id);
    let   (_status)=status.read(id=id);
    
    //let team_var:MatchInfo = matchId.read(id);
    let (msgSender) = get_caller_address();
    let (team) = userInfo.read(id,msgSender);
    let (eth_address) = ethereum_token.read();
    //let (myread) = compute_reward();
    assert _status = 2;
    assert team = _winner;
    
     if(team ==1){
        let (div,r) = uint256_signed_div_rem(_poolAmount,tA);
     }else{
        let(div,r) = uint256_signed_div_rem(_poolAmount,tB);
     }

    with_attr error_message("Div is 0") {
    let (k) = uint256_signed_nn(div);
     assert (k)=1;
     }
    // let x: felt = _t_teamA;
    // let y: Uint256 = Uint256(x, 0);
    // }
    // else{
    //     let x: felt = _t_teamB;
    //     let y: Uint256 = Uint256(x, 0);
    //     }
 
    
    //let (div,rem )= uint256_signed_div_rem(_poolAmount,y);
    local new_match : MatchInfo = MatchInfo(a=_a,b=_b,t_teamA=_t_teamA,t_teamB=_t_teamB, winner=team,poolAmount=(div),status=2);
    matchId.write(id,new_match);
    IERC20.transfer(contract_address=eth_address,recipient=msgSender, amount=div);
    return();
    
}
@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    token_address: felt,fee : Uint256,inBal:Uint256,_owner:felt
) {
    
    ethereum_token.write(value=token_address);
    owner.write(value=_owner);
    fee_per_match.write(value=fee);
    balance.write(value=inBal);
    return ();
}