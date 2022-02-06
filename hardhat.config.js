/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle')

const Alchemy_Api_Key = 'XpjKi7LM9uldUDAMbFJFVrSIrCialDwj';
const Rinkyby_api_key = 'f3d23695273951c7d516cd40ad3473b4850a6cd39a002d7cabf1f2359538ea59'

module.exports = {
  solidity: "0.8.9",
  networks:{
    rinkeby:{
      url:`https://eth-rinkeby.alchemyapi.io/v2/${Alchemy_Api_Key}`,
      accounts:[`${Rinkyby_api_key}`]
    }
  }
};
