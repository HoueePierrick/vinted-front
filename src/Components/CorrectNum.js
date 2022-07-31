const CorrectNum = (number) => {
    const newnum = Math.floor(number * 100) / 100;
    const textnum = newnum.toString();
    const test = textnum.replace(".", ",");
    let result = "";
    if(!test.includes(",")) {
        result = test.concat(",00 €");
    } else if(test[test.length - 2] === ",") {
        result = test.concat("0 €");
    } else {result = test.concat(" €")}
    return result
}

export default CorrectNum;