var numbers = new Array;

function disableButtons(value) {
    document.getElementById("linearSort").disabled = value;
    document.getElementById("insertionSort").disabled = value;
    document.getElementById("bubbleSort").disabled = value;
    document.getElementById("mergeSort").disabled = value;
    document.getElementById("generate_random").disabled = value;
}

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

        bar.setAttribute("class", "arrayBar");
        bar.setAttribute("x", x.toString());
        bar.setAttribute("width", width.toString());
        bar.setAttribute("y", y.toString());
        bar.setAttribute("height", numbers[i].toString());

        document.getElementById("groupBar").appendChild(bar);
    }
}

function linearSortOneStep(startIndex) {
    if (startIndex >= numbers.length) {
        disableButtons(false);
        alert("Sorted");
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
    setTimeout(function(j) { linearSortOneStep(j); }, 50, startIndex + 1);
}

function linearSort() { 
    disableButtons(true);
    linearSortOneStep(0, 1);
}

function insertionSortOneStep(curIndex, counter) {
    if (counter >= numbers.length + 1) {
        console.log(counter);
        disableButtons(false);
        alert("Sorted");
        return;
    }
    if (curIndex === 0 || numbers[curIndex] >= numbers[curIndex - 1]) {
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
    disableButtons(true);
    insertionSortOneStep(0, 0);
}

function bubbleSortOneStep(curIndex, counter) {
    if (counter === numbers.length) {
        alert("Sorted");
        disableButtons(false);
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
    disableButtons(true);
    bubbleSortOneStep(0, 0);
}

function mergeSortProcess(i, j, size, leftIndex, leftArray, rightIndex, rightArray, curIndex) {
    if (i > size - 1 && leftIndex >= leftArray.length && rightArray >= rightArray.length) {
        disableButtons(false);
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
    disableButtons(true);
    mergeSortProcess(1, 0, numbers.length, 0, [], 0, [], 0);
}