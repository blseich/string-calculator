export default (str) => str.split(',')
    .map((val)=>parseInt((val || '0')))
    .reduce((val, acc) => val + acc, 0)