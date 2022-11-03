const IPFS = require('ipfs-api')
const auth = 'Basic ' + Buffer.from('2DWYVzcWEoAm37bfH684uxXlI5v' + ':' + '22ac2b9cacf8f6c48933c943608aacd6').toString('base64');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https',headers: {authorization: auth,} })

export default ipfs