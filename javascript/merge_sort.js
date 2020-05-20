function mergeSortProcess(i, j, size, leftIndex, leftArray, rightIndex, rightArray, curIndex) {
    if (i > size - 1 && leftIndex >= leftArray.length && rightIndex >= rightArray.length) {
        mergeSortColor(0);
        return;
    }
    if (j >= size - 1) {
        j = 0;
        i *= 2;
    }
    if (leftIndex >= leftArray.length && rightIndex >= rightArray.length) {
        const left = j;
        const mid = Math.min(i + j - 1, size - 1);
        const right = Math.min(i * 2 + j - 1, size - 1);

        const size1 = mid - left + 1;
        const size2 = right - mid;

        leftArray = [];
        for (let k = 0; k < size1; k++) {
            leftArray.push(numbers[left + k].value);
        }

        rightArray = [];
        for (let k = 0; k < size2; k++) {
            rightArray.push(numbers[mid + 1 + k].value);
        }

        leftIndex = 0, rightIndex = 0;
        curIndex = left;
        j += i * 2;
    }

    if (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        if (leftArray[leftIndex] <= rightArray[rightIndex]) {
            numbers[curIndex].value = leftArray[leftIndex];
            leftIndex++;
        } else {
            numbers[curIndex].value = rightArray[rightIndex];
            rightIndex++;
        }
        curIndex++;
    }
    else if (leftIndex < leftArray.length) {
        numbers[curIndex].value = leftArray[leftIndex];
        leftIndex++, curIndex++;
    }
    else if (rightIndex < rightArray.length) {
        numbers[curIndex].value = rightArray[rightIndex];
        rightIndex++, curIndex++;
    }

    for (let k = 0; k < numbers.length; k++) {
        numbers[k].fill = UNSORTED_COLOR;
    }
    if (leftIndex < leftArray.length || rightIndex < rightArray.length) {
        numbers[curIndex].fill = POINTER_COLOR;

        var next = curIndex + leftArray.length;
        if (next < numbers.length) {
            numbers[next].fill = POINTER_COLOR;
        }
    } else {
        numbers[size - 1].fill = UNSORTED_COLOR;
    }

    updateDisplay();
    setTimeout(function(a, b, c, d, e, f, g, h) {
        mergeSortProcess(a, b, c, d, e, f, g, h);
    }, Math.floor(1000 / numbers.length), i, j, size, leftIndex, leftArray, rightIndex, rightArray, curIndex);
}

function mergeSortColor(curIndex) {
    if (curIndex >= numbers.length) {
        disableButtons(false);
        sorted = true;
        return;
    }
    numbers[curIndex].fill = SORTED_COLOR;
    numbers[curIndex].stroke = SORTED_BORDER;
    updateDisplay();
    setTimeout(function(a) { mergeSortColor(a); }, Math.floor(800 / numbers.length), curIndex + 1);
}

function mergeSort() {
    if (!sorted) {
        disableButtons(true);
        mergeSortProcess(1, 0, numbers.length, 0, [], 0, [], 0);
    }
}