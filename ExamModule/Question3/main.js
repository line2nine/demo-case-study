function isFibonacci(num) {
    if (num <= 1) {
        return num;
    }
    return isFibonacci(num - 1) + isFibonacci(num - 2);
}

let number = +prompt("Nhập số để kiểm tra dãy Fibonaci");
if (isFibonacci(number)) {
    document.write("true");
} else {
    document.write("false");
}
