function insertionSortOneStep(curIndex, counter) {
    for (let i = 0; i < counter - 1; i++) {
        numbers[i].fill = SORTED_COLOR;
        numbers[i].stroke = SORTED_BORDER;
    }
    updateDisplay();
    if (counter === numbers.length + 1) {
        disableButtons(false);
        sorted = true;
        return;
    }
    if (curIndex === 0 || numbers[curIndex].value > numbers[curIndex - 1].value) {
        if (curIndex + 1 < numbers.length) {
            numbers[curIndex + 1].fill = SORTED_COLOR;
            numbers[curIndex + 1].stroke = SORTED_BORDER;
            numbers[curIndex].fill = SORTED_COLOR;
            numbers[curIndex].stroke = SORTED_BORDER;
        }
        counter++;
        curIndex = counter;

        if (counter > 0 && counter - 1 < numbers.length) {
            numbers[counter - 1].fill = POINTER_COLOR;
            numbers[counter - 1].stroke = UNSORTED_BORDER;
        }
    }
    else if (numbers[curIndex].value < numbers[curIndex - 1].value) {
        var temp = numbers[curIndex].value;
        numbers[curIndex].value = numbers[curIndex - 1].value;
        numbers[curIndex - 1].value = temp;

        if (curIndex > 0) {
            numbers[curIndex - 1].fill = POINTER_COLOR;
            numbers[curIndex - 1].stroke = UNSORTED_BORDER;
        }
        numbers[curIndex].fill = SORTED_COLOR;
        numbers[curIndex].stroke = SORTED_BORDER;
    }
    updateDisplay();
    setTimeout(function(i, j) { insertionSortOneStep(i, j); }, Math.floor(1000 / numbers.length), curIndex - 1, counter);
}