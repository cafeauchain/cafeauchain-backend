// Daily results of pounds roasted by lots
// All days and all open lots or *lots that have had a roast need to be included.
// * if you roast the last of a lot in a month, it would techinically be closed but the data still needs to be available
// Response should look something like this

/* 
{
    data: [
        {
            date: "2018-02-01",
            amounts: [
                {
                    lot_id: "1",
                    amount_roasted: 200
                },
                {
                    lot_id: "2",
                    amount_roasted: 0
                },
                {
                    lot_id: "3",
                    amount_roasted: 400
                },
                {
                    lot_id: "4",
                    amount_roasted: 100
                },
                {
                    lot_id: "5",
                    amount_roasted: 200
                }
            ]
        }
    ]
};

*/
// eslint-disable-next-line
import getTimePeriod from "utilities/getTimePeriod";
const generateRandomData = (min, max) => {
    let val = Math.floor(Math.random() * (max - min)) + min;
    val = val < 10 ? 0 : val;
    return val;
};
const generateJSON = ({ start, end, unit, lots }) => {
    return getTimePeriod(start, end, unit).map(item => {
        let isWeekend = item.day() === 0 || item.day() === 6;

        let obj = { date: item.format("YYYY-MM-DD") };
        obj.amounts = lots.map(lot => {
            return { lot_id: lot, amount_roasted: isWeekend ? 0 : generateRandomData(0, 50) };
        });
        return obj;
    });
};

export default generateJSON;
