let score = [1, 5, 8, 3, 10, 7, 2];

function findMax(score) {
    let max = score[0];
    for (let i = 1; i < score.length; i++) {
        if (score[i] > max) {
            max = score[i];
        }
    }
    return max;
}

function main() {
    document.write("Điểm số cao nhất là: " + findMax(score));
}

main();