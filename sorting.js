const unsorted_color = "#CF6679";
const pointer_color = "#FFFFFF";
const sorted_color = "#6200EE";

class Bar {
    constructor(idNum, value) {
        this.idNum = idNum;
        this.value = value
        this.fill = "#CF6679";
        this.stroke = "#FFFFFF";
    }

    getId() { return this.idNum; }
    getValue() { return this.value; }
    getFill() { return this.fill; }
    getStroke() { return this.stroke }

    setFill(fill) { this.fill = fill; }
    setStroke(stroke) { this.stroke = this.stroke; }
}

function disableButtons(value) {
    document.getElementById("selectionSort").disabled = value;
    document.getElementById("insertionSort").disabled = value;
    document.getElementById("bubbleSort").disabled = value;
    document.getElementById("mergeSort").disabled = value;
    document.getElementById("number").disabled = value;
    document.getElementById("generate_random").disabled = value;
}

function getRandInt(minInt, maxInt) {
    return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
}

var numbers = new Array();
var sorted = false;

function generateNums() {
    if (numbers.length !== 0) {
        numbers = [];
    }
    var size = document.getElementById("number").value;
    for (let i = 0; i < size; i++) {
        var num = getRandInt(50, 500);
        numbers[i] = new Bar(i, num);
    }
    sorted = false;
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
        var y = 570 - numbers[i].value;     

        bar.setAttribute("id", "bar" + numbers[i].idNum.toString());
        bar.setAttribute("x", x.toString());
        bar.setAttribute("width", width.toString());
        bar.setAttribute("y", y.toString());
        bar.setAttribute("height", numbers[i].value.toString());

        document.getElementById("groupBar").appendChild(bar);
        
        bar = document.getElementById("bar" + i.toString());
        bar.style.fill = numbers[i].fill;
        bar.style.stroke = numbers[i].stroke;
    }
}

function selectionSortOneStep(counter, curIndex, minIndex) {
    if (counter === numbers.length) {
        numbers[numbers.length - 1].fill = sorted_color;
        updateDisplay();

        disableButtons(false);
        sorted = true;
        return;
    }
    if (curIndex === numbers.length) {
        var temp = numbers[minIndex].value;
        numbers[minIndex].value = numbers[counter].value;
        numbers[counter].value = temp;

        numbers[numbers.length - 1].fill = unsorted_color;

        counter++;
        curIndex = counter;
    }
    
    for (let i = 0; i < counter; i++) {
        numbers[i].fill = sorted_color;
    }

    if (curIndex < numbers.length) {
        numbers[curIndex].fill = pointer_color;
    }
    if (curIndex > 0) {
        numbers[curIndex - 1].fill = unsorted_color;
    }

    if (minIndex < counter) {
        minIndex = counter;
    }
    else if (numbers[minIndex].value > numbers[curIndex].value) {
        minIndex = curIndex;
    }
    updateDisplay();
    setTimeout(function(i, j, k) { selectionSortOneStep(i, j, k); }, 1, counter, curIndex + 1, minIndex);
}

function selectionSort() {
    if (!sorted) {
        disableButtons(true);
        selectionSortOneStep(0, 0, 0);
    }
}

function insertionSortOneStep(curIndex, counter) {
    console.log(counter - 1);
    for (let i = 0; i < counter - 1; i++) {
        numbers[i].fill = sorted_color;
    }
    updateDisplay();
    if (counter === numbers.length + 1) {
        disableButtons(false);
        sorted = true;
        return;
    }
    if (curIndex === 0 || numbers[curIndex].value > numbers[curIndex - 1].value) {
        if (curIndex + 1 < numbers.length) {
            numbers[curIndex + 1].fill = sorted_color;
            numbers[curIndex].fill = sorted_color;
        }
        counter++;
        curIndex = counter;

        if (counter > 0 && counter - 1 < numbers.length)
            numbers[counter - 1].fill = pointer_color;
    }
    else if (numbers[curIndex].value < numbers[curIndex - 1].value) {
        var temp = numbers[curIndex].value;
        numbers[curIndex].value = numbers[curIndex - 1].value;
        numbers[curIndex - 1].value = temp;

        if (curIndex > 0)
            numbers[curIndex - 1].fill = pointer_color;
        numbers[curIndex].fill = sorted_color;
    }
    updateDisplay();
    setTimeout(function(i, j) { insertionSortOneStep(i, j); }, 1, curIndex - 1, counter);
}

function insertionSort() {
    if (!sorted) {
        disableButtons(true);
        insertionSortOneStep(0, 0);
    }
}

function bubbleSortOneStep(curIndex, counter) {
    if (counter === numbers.length) {
        disableButtons(false);
        sorted = true;
        return;
    }
    if (curIndex + 1 >= numbers.length) {
        curIndex = 0;
        counter++;
    }

    if (numbers[curIndex] > numbers[curIndex + 1]) {
        var temp = new Bar();

        // var temp = numbers[curIndex];
        // numbers[curIndex] = numbers[curIndex + 1];
        // numbers[curIndex + 1] = temp;
    }

    updateDisplay();
    setTimeout(function(i, j) { bubbleSortOneStep(i, j); }, 1, curIndex + 1, counter);
}

function bubbleSort() {
    if (!sorted) {
        disableButtons(true);
        bubbleSortOneStep(0, 0);
    }
}

function mergeSortProcess(i, j, size, leftIndex, leftArray, rightIndex, rightArray, curIndex) {
    if (i > size - 1 && leftIndex >= leftArray.length && rightArray >= rightArray.length) {
        disableButtons(false);
        sorted = true;
        return;
    }
    if (j >= size - 1 ) {
        j = 0;
        i *= 2;
    }

    if (leftIndex >= leftArray.length && rightIndex >= rightArray.length) {
        const left = j;
        const mid = Math.min(i + j - 1, size - 1);
        const right = Math.min(i * 2 + j - 1, size - 1);

        const size1 = mid - left + 1;
        const size2 = right - mid;

        leftArray = numbers.slice(left, left + size1);
        rightArray = numbers.slice(mid + 1, mid + 1 + size2);

        leftIndex = 0, rightIndex = 0;
        curIndex = left;
        j += i * 2;
    }

    if (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        if (leftArray[leftIndex] <= rightArray[rightIndex]) {
            numbers[curIndex] = leftArray[leftIndex];
            leftIndex++;
        } else {
            numbers[curIndex] = rightArray[rightIndex];
            rightIndex++;
        }
        curIndex++;
    }
    else if (leftIndex < leftArray.length) {
        numbers[curIndex] = leftArray[leftIndex];
        leftIndex++, curIndex++;
    }
    else if (rightIndex < rightArray.length) {
        numbers[curIndex] = rightArray[rightIndex];
        rightIndex++, curIndex++;
    }

    updateDisplay();
    setTimeout(function(a, b, c, d, e, f, g, h) {
        mergeSortProcess(a, b, c, d, e, f, g, h);
    }, 10, i, j, size, leftIndex, leftArray, rightIndex, rightArray, curIndex);
}

function mergeSort() {
    if (!sorted) {
        disableButtons(true);
        mergeSortProcess(1, 0, numbers.length, 0, [], 0, [], 0);
    }
}