const zipCodeRepository = require('../../framework/db/postgres/ZipCodeRepository');

async function getAllZipCodes() {
    try {
        const zipCodes = await zipCodeRepository.findAll();
        return zipCodes;
    } catch (err) {
        throw new Error('Error fetching zip codes: ' + err.message);
    }
}

module.exports =  getZipCodes;
