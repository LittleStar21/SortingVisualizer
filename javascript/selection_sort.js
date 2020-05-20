function selectionSortOneStep(counter, curIndex, minIndex) {
    if (counter === numbers.length) {
        numbers[numbers.length - 1].fill = SORTED_COLOR;
        numbers[numbers.length - 1].stroke = SORTED_BORDER;
        updateDisplay();

        disableButtons(false);
        sorted = true;
        return;
    }
    if (curIndex === numbers.length) {
        var temp = numbers[minIndex].value;
        numbers[minIndex].value = numbers[counter].value;
        numbers[counter].value = temp;

        numbers[numbers.length - 1].fill = UNSORTED_COLOR;
        numbers[numbers.length - 1].stroke = UNSORTED_BORDER;

        counter++;
        curIndex = counter;
    }
    
    for (let i = 0; i < counter; i++) {
        numbers[i].fill = SORTED_COLOR;
        numbers[i].stroke = SORTED_BORDER;
    }

    if (curIndex < numbers.length) {
        numbers[curIndex].fill = POINTER_COLOR;
        numbers[curIndex].stroke = UNSORTED_BORDER;
    }
    if (curIndex > 0) {
        numbers[curIndex - 1].fill = UNSORTED_COLOR;
        numbers[curIndex - 1].stroke = UNSORTED_BORDER;
    }

    if (minIndex < counter) {
        minIndex = counter;
    }
    else if (numbers[minIndex].value > numbers[curIndex].value) {
        minIndex = curIndex;
    }
    updateDisplay();
    setTimeout(function(i, j, k) { selectionSortOneStep(i, j, k); }, Math.floor(350 / numbers.length), counter, curIndex + 1, minIndex);
}

function selectionSort() {
    if (!sorted) {
        disableButtons(true);
        selectionSortOneStep(0, 0, 0);
    }
}