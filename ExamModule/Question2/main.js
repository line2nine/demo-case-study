function tryRemoveFromArray(arr, number) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === number) {
            delete arr[i];
        }
    }
}

function main() {
    let n = +prompt("Nhập vào số lượng phần tử của mảng: ");
    let array = [];

    for (let i = 0; i < n; i++) {
        array.push(prompt("Phần tử thứ " + (i + 1) + " của mảng: "));
    }

    document.write("Các phần tử ban đầu là: " + array + "<br>");

    let x = +prompt("Nhập phần tử muốn xóa: ");

    tryRemoveFromArray(array, x);

    document.write("Các phần tử còn lại: " + array);
}

main();