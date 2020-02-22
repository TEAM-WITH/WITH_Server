const pool = require('../module/db/pool');
const table1 = 'User';
const table2 = 'Region';
const table3 = 'Board';

module.exports = {
    
    readRegion: async (regionCode) => {
        // regionCode Parsing
        var region = regionCode.substr(0,2);
        var semi_region = regionCode.substr(2,2);
        var country = regionCode.substr(4,2);
        
        const fields = 'regionCode, regionName, regionImgS';
        var query = `SELECT ${fields} FROM ${table2} WHERE regionCode LIKE `;
        if(country == "00")
        {
            if(semi_region == "00")
            {
                // 대분류에서 찾기
                query += `'${region}%'`;
            }
            else
            {
                // 중분류에서 찾기
                query += `'${region}${semi_region}%'`;
            }
        }
        const result = await pool.queryParam_None(query);
        return result; 
    },
    bgImage : async()  => {
        const result = await pool.queryParam_None(`SELECT regionImgH FROM ${table2} WHERE regionImgH is not null`);
        return result;
    }
};
