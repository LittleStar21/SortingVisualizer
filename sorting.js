var numbers = [];

function generateNums() {
    var size = document.getElementById('number').value;
    size = parseInt(size);

    if (numbers) {
        numbers = [];
    }
    for (let i = 0; i < size; i++) {
        numbers[i] = Math.floor(Math.random() * 500);
    }
    updateDisplay(numbers);
}

function updateDisplay(numbers) {
    var x = 10;
    var width = Math.floor(960 / numbers.length);
    for (let i = 0; i < numbers.length; i++, x+= width) {
        var bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        var y = 570 - numbers[i];     

        bar.setAttribute("class", "barr");
        bar.setAttribute("x", x.toString());
        bar.setAttribute("width", width.toString());
        bar.setAttribute("y", y.toString());
        bar.setAttribute("height", numbers[i].toString());

        document.getElementById("groupBar").appendChild(bar);
    }
}

function linearSort() {
    alert('Linear Sort');
}

function insertionSort() {
    alert('Insertion Sort');
}

function bubbleSort() {
    alert('Bubble Sort');
}

function mergeSort() {
    alert('Merge Sort');
}