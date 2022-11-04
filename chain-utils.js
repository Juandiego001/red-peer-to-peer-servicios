const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const { v1 } = require('uuid');

class ChainUtil {

    static genKeyPair() {
        return ec.genKeyPair();
    }

    static id() {
        return v1();
    }

    static hash(data) {
        return SHA256(JSON.stringify(data)).toString();
    }

    static verifySignature(publicKey, signature, dataHash) {
        let response = ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
        console.log(response);
        return response;
    }
}

module.exports = ChainUtil;