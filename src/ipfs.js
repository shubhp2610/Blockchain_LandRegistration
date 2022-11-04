const IPFS = require('ipfs-api')
const auth = 'Basic ';
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https',headers: {authorization: auth,} })

export default ipfs
