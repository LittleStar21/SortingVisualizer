var numbers = [];
var sorted = true;

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

function generateNums() {
    var size = document.getElementById("number").value;
    size = parseInt(size);

    if (numbers) {
        numbers = [];
    }
    for (let i = 0; i < size; i++) {
        number = getRandInt(10, 500);
        numbers.push(number);
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
        var y = 570 - numbers[i];     

        bar.setAttribute("id", "bar" + i.toString());
        bar.setAttribute("x", x.toString());
        bar.setAttribute("width", width.toString());
        bar.setAttribute("y", y.toString());
        bar.setAttribute("height", numbers[i].toString());

        document.getElementById("groupBar").appendChild(bar);
        
        bar = document.getElementById("bar" + i.toString());
        bar.style.fill = "#CF6679";
        bar.style.stroke = "#FFFFFF"
    }
}

function selectionSortOneStep(counter, curIndex, minIndex) {
    if (counter >= numbers.length) {
        disableButtons(false);
        sorted = true;
        return;
    }
    if (minIndex < counter) {
        minIndex = counter;
    }
    if (curIndex >= numbers.length) {
        var temp = numbers[minIndex];
        numbers[minIndex] = numbers[counter];
        numbers[counter] = temp;

        counter++;
        curIndex = counter;
    }
    if (numbers[minIndex] > numbers[curIndex]) {
        minIndex = curIndex;
    }
    updateDisplay();
    setTimeout(function(i, j, k) { selectionSortOneStep(i, j, k); }, 1, counter, curIndex + 1, minIndex);
}

function selectionSort() { 
    if (!sorted) {
        disableButtons(true);
        selectionSortOneStep(0, 0, 0)
    }
}

function insertionSortOneStep(curIndex, counter) {
    if (counter >= numbers.length + 1) {
        disableButtons(false);
        sorted = true;
        return;
    }
    if (curIndex === 0 || numbers[curIndex] > numbers[curIndex - 1]) {
        counter++;
        curIndex = counter;
    }
    else if (numbers[curIndex] < numbers[curIndex - 1]) {
        var temp = numbers[curIndex];
        numbers[curIndex] = numbers[curIndex - 1];
        numbers[curIndex - 1] = temp;
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
        var temp = numbers[curIndex];
        numbers[curIndex] = numbers[curIndex + 1];
        numbers[curIndex + 1] = temp;
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