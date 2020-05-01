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
    updateDisplay();
}

function updateDisplay() {
    var groupBar = document.getElementById("groupBar");
    var len = document.getElementById("groupBar").childNodes.length;
    for (let i = 0; i < len; i++) {
        groupBar.removeChild(groupBar.childNodes[0]);
    }

    var x = 50;
    var width = Math.floor((1000 - x) / numbers.length);
    for (let i = 0; i < numbers.length; i++, x+= width) {
        var bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        var y = 570 - numbers[i];     

        bar.setAttribute("class", "numberBar");
        bar.setAttribute("x", x.toString());
        bar.setAttribute("width", width.toString());
        bar.setAttribute("y", y.toString());
        bar.setAttribute("height", numbers[i].toString());

        document.getElementById("groupBar").appendChild(bar);
    }
}

function linearSortOneStep(startIndex) {
    if (startIndex >= numbers.length) {
        return;
    }

    var smallestIndex = startIndex;

    for (let i = startIndex; i < numbers.length; i++) {
        if (numbers[smallestIndex] > numbers[i]) {
            smallestIndex = i;
        }
    }
    var temp = numbers[smallestIndex];
    numbers[smallestIndex] = numbers[startIndex];
    numbers[startIndex] = temp;

    updateDisplay();
    setTimeout(function(j) { linearSortOneStep(j); }, 10, startIndex + 1);
}

function linearSort() {
    linearSortOneStep(0);
}

function insertionSort() {
    alert("Insertion sort");
}

function bubbleSortOneStep(curIndex, counter) {
    if (counter >= numbers.length) {
        return;
    }
    if (curIndex + 1 >= numbers.length) {
        curIndex = 0;
        counter++;
    }

    if (numbers[curIndex] > numbers[curIndex + 1]) {
        var temp = numbers[curIndex];
        numbers[curIndex] = numbers[curIndex + 1];
        numbers[curIndex + 1] = temp;
    }

    updateDisplay();
    setTimeout(function(j) {bubbleSortOneStep(j)}, 10, curIndex + 1);
}

function bubbleSort() {
    bubbleSortOneStep(0, 0);
}

function mergeSort() {
    alert('Merge Sort');
}