const UNSORTED_COLOR = "#E77557";
const UNSORTED_BORDER = "#F2F2F2";
const POINTER_COLOR = "#F2F2F2";
const SORTED_COLOR = "#AED3F2";
const SORTED_BORDER = "#385D84";

class Bar {
    constructor(idNum, value) {
        this.idNum = idNum;
        this.value = value
        this.fill = UNSORTED_COLOR;
        this.stroke = UNSORTED_BORDER;
    }
}

window.onload = function() {
    this.generateNums();
}

function disableButtons(value) {
    document.getElementById("selectionSort").disabled = value;
    document.getElementById("insertionSort").disabled = value;
    document.getElementById("bubbleSort").disabled = value;
    document.getElementById("mergeSort").disabled = value;
    document.getElementById("generate_random").disabled = value;
}

function getRandInt(minInt, maxInt) {
    return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
}

var numbers = new Array();
var sorted = false;
var size = 25;

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
    o.addEventListener("click", () => {
        size = o.querySelector("label").innerHTML;
        selected.innerHTML = "Number of Elements: " + o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
    });
});

function generateNums() {
    if (numbers.length !== 0) {
        numbers = [];
    }

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
    var width = Math.floor((950 - x) / numbers.length);
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