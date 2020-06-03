function bubbleSortOneStep(curIndex, counter) {
    if (counter === 0) {
        numbers[0].fill = SORTED_COLOR;
        numbers[0].stroke = SORTED_BORDER;
        updateDisplay();

        disableButtons(false);
        sorted = true;
        return;
    }
    if (curIndex === counter) {
        numbers[counter].fill = SORTED_COLOR;
        numbers[counter].stroke = SORTED_BORDER;
        curIndex = 0;
        counter--;
        if (counter >= 0) {
            numbers[counter].fill = UNSORTED_COLOR;
            numbers[counter].stroke = UNSORTED_BORDER;
        }
    }
    numbers[curIndex].fill = POINTER_COLOR;
    numbers[curIndex].fill = UNSORTED_BORDER;
    if (curIndex > 0) {
        numbers[curIndex - 1].fill = UNSORTED_COLOR;
        numbers[curIndex - 1].stroke = UNSORTED_BORDER;
    }
    if (numbers[curIndex].value > numbers[curIndex + 1].value) {
        var temp = numbers[curIndex].value;
        numbers[curIndex].value = numbers[curIndex + 1].value;
        numbers[curIndex + 1].value = temp;

        numbers[curIndex + 1].fill = POINTER_COLOR;
        numbers[curIndex + 1].stroke = UNSORTED_BORDER;
        numbers[curIndex].fill = UNSORTED_COLOR;
        numbers[curIndex].stroke = UNSORTED_BORDER;
    }
    updateDisplay();
    setTimeout(function(i, j) { bubbleSortOneStep(i, j); }, Math.floor(300 / numbers.length), curIndex + 1, counter);
}