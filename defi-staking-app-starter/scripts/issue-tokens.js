const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function issueRewards(callback){
    console.log({callback})
    let decentralBank = await DecentralBank.deployed()
    await decentralBank.issueTokens()
    console.log('Tokens has be issued successfully')
    callback()
}