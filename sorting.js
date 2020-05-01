var numbers = [];

function generateNums() {
    alert("Generate Nums");
    size = document.getElementById('number').value;
    size = parseInt(size);

    if (numbers) {
        numbers = [];
    }
    for (let i = 0; i < size; i++) {
        numbers[i] = Math.floor(Math.random() * 1000) + 1;
    }
}

function linearSort() {
    alert('Linear Sort');
}

function insertionSort() {
    alert("Insertion Sort");
}

function bubbleSort() {
    alert("Bubble Sort");
}

function mergeSort() {
    alert("Merge Sort");
}