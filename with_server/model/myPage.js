const pool = require('../module/db/pool');
const moment = require('moment');
const moment_timezone = require('moment-timezone');
const table1 = 'User';
const table2 = 'Board';
const table3 = 'Chat';
const table4 = 'Interest';
const table5 = 'Notice';

module.exports = {
    readProfile: async(userIdx) => {        
        const fields = 'userId, name, birth, gender, userImg, interest, auth'
        var result = await pool.queryParam_None(`SELECT ${fields} FROM ${table1} WHERE userIdx = ${userIdx}`); 
        
        if(result.length != 0) {
            if(result[0].interest != null){
                var interestArr = [];
                var interest = result[0].interest;
                const interestResult = await pool.queryParam_None(`SELECT * FROM ${table4} WHERE intIdx IN(${interest})`);
                result[0].interest = interestResult;
            }    
        }

        return result;
    },

    update: async(json, userIdx) => {
        const conditions = [];

        if (json.userImg) conditions.push(`userImg = '${json.userImg}'`);
        if (json.interest){
            let interest = 0;
            if(json.interest != '0'){                           
                if(String(json.interest).includes(',')){                  ////와인,야경,쇼핑 / 와인,쇼핑                 
                    json.interest = String(json.interest).split(',').join('","');
                }
                json.interest = `"${json.interest}"`;  //쿼리 형식 맞추기
                const result = await pool.queryParam_None(`SELECT * FROM ${table4} WHERE interests IN(${json.interest})`); //select * 한게 select intIdx보다 빨라서 *로 바꿈
                var i = 0;
                while(i < result.length){
                    interest += result[i].intIdx;
                    i++;
                    if(i == result.length) break;
                    interest += ',';
                }
            }
            else{
                interest = null;
            } 
            conditions.push(`interest = '${interest}'`);            
        }
        const setStr = conditions.length > 0 ? `SET ${conditions.join(',')}` : '';
        const final = await pool.queryParam_None(`UPDATE ${table1} ${setStr} WHERE userIdx = '${userIdx}'`)
        return final;
            
    },

    readBoards: async(userIdx) => {
        const fields = 'boardIdx, regionName, title, uploadTime, startDate, endDate, withNum';
        const result = await pool.queryParam_None(`SELECT ${fields} FROM ${table2} WHERE userIdx = '${userIdx}' ORDER BY uploadTime desc`)
        return result;
    },

    countBoard: async (userIdx) => {
        //해당 유저가 작성한 게시물이 존재하는지 확인    
        const result = await pool.queryParam_None(`SELECT COUNT(*) AS count FROM ${table2} WHERE userIdx = "${userIdx}"`)
        return result;  
    },   

    confirmUser : async (userIdx) => {
        //존재하는 회원인지 확인    
        const result = await pool.queryParam_None(`SELECT * FROM ${table1} WHERE userIdx = "${userIdx}"`)
        return result;  
    },   

    changePw : async(json) =>{
        const setStr = `SET password = '${json.finalPw}', salt = '${json.salt}'`
        const result = await pool.queryParam_None(`UPDATE ${table1} ${setStr} WHERE userIdx = ${json.userIdx}`); 
        return result;
    },

    readInterest : async() =>{
        const result = await pool.queryParam_None(`SELECT * FROM ${table4}`); 
        return result;

    },

    NoticeAll : async() =>{
        const fields = 'noticeIdx, title, uploadDate'
        const result = await pool.queryParam_None(`SELECT ${fields} FROM ${table5}`); 
        return result;

    },
    NoticeDetail : async(noticeIdx) =>{
        const result = await pool.queryParam_None(`SELECT * FROM ${table5} WHERE noticeIdx = ${noticeIdx}`); 
        return result;

    },

    byeUser : async(userIdx) =>{
        const setStr = `exist = '-1', name = '(알 수 없음)', userId = Null, userImg = 'https://i.ibb.co/17VpHQT/userimg.jpg', active = '-1'`
        const result = await pool.queryParam_None(`UPDATE ${table1} LEFT JOIN ${table2} ON ${table1}.userIdx = ${table2}.userIdx SET ${setStr} WHERE ${table1}.userIdx = ${userIdx}`);
        return result;
    },

    // authUser : async(userIdx) => {
    //     const result = await pool.queryParam_None(`UPDATE ${table1} SET auth = 2 WHERE userIdx = ${userIdx}`);
    //     return result;
    // }
};