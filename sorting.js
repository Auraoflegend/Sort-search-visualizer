let numberOfBars = 10;
let array = [];
let time = 500; // Initial swap speed in milliseconds
let algorithm = 'bubbleSort'; // Default algorithm

function update() {
    const barCount = document.getElementById('barCount').value;
    updateBarCount(barCount);
    resetAnalysis();
}

function updateTime() {
    time = document.getElementById('swapspeed').value;
    resetAnalysis();
}

function updateBarCount(count) {
    numberOfBars = count;
    generateArray();
    resetAnalysis();
}

function resetAnalysis() {
    document.getElementById('timeTaken').innerText = 'Time taken:';
    document.getElementById('number').innerText = 'No of bars:';
    document.getElementById('swapCount').innerText = 'Number of swaps:';
}

function setAlgo(algo) {
    algorithm = algo;
    document.getElementById('algoName').innerText = `${algorithm} Sorting`;
}

function generateArray() {
    const arrayContainer = document.getElementById('display');
    arrayContainer.innerHTML = '';
    array = []; // Clear array
    for (let i = 0; i < numberOfBars; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        const bar = document.createElement('div');
        bar.style.height = `${value}%`;
        bar.classList.add('bar');
        arrayContainer.appendChild(bar);
    }
}

async function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
    const bars = document.getElementsByClassName('bar');
    bars[i].style.height = `${array[i]}%`;
    bars[j].style.height = `${array[j]}%`;
    bars[i].style.backgroundColor = 'red';
    bars[j].style.backgroundColor = 'red';
    await sleep(time);
    bars[i].style.backgroundColor = '#3498db';
    bars[j].style.backgroundColor = '#3498db';
}

async function bubbleSort() {
    let startTime = performance.now();
    let swapCounter = 0;

    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'yellow';
            bars[j + 1].style.backgroundColor = 'yellow';
            await sleep(time);
            if (array[j] > array[j + 1]) {
                await swap(array, j, j + 1);
                swapCounter++;
            }
            bars[j].style.backgroundColor = '#3498db'; // Reset color after comparison
            bars[j + 1].style.backgroundColor = '#3498db'; // Reset color after comparison
        }
        bars[array.length - i - 1].style.backgroundColor = '#2ecc71'; // Final sorted bar color
    }
    bars[0].style.backgroundColor = '#2ecc71'; // Final sorted bar color

    let endTime = performance.now();
    let timeTaken = (endTime - startTime) / 1000;
    displayAnalysis(timeTaken, swapCounter);
}

async function insertionSort() {
    let startTime = performance.now();
    let swapCounter = 0;

    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let current = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = 'yellow'; // Highlight current bar being inserted
        await sleep(time);

        while (j >= 0 && array[j] > current) {
            bars[j].style.backgroundColor = 'red'; // Highlight bar being compared
            await sleep(time);

            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j]}%`; // Update bar height
            swapCounter++;

            bars[j].style.backgroundColor = '#3498db'; // Reset color after comparison
            j--;
        }

        array[j + 1] = current;
        bars[j + 1].style.height = `${current}%`; // Update bar height to correct position

        for (let k = i; k >= 0; k--) {
            bars[k].style.backgroundColor = '#2ecc71'; // Set sorted bars color
        }
    }

    let endTime = performance.now();
    let timeTaken = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    displayAnalysis(timeTaken, swapCounter);
}


async function selectionSort() {
    let startTime = performance.now();
    let swapCounter = 0;

    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        bars[minIndex].style.backgroundColor = 'yellow';
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'yellow';
            await sleep(time);
            if (array[j] < array[minIndex]) {
                bars[minIndex].style.backgroundColor = '#3498db'; // Reset previous minIndex color
                minIndex = j;
                bars[minIndex].style.backgroundColor = 'red';
            } else {
                bars[j].style.backgroundColor = '#3498db'; // Reset color after comparison
            }
        }
        if (minIndex !== i) {
            await swap(array, i, minIndex);
            swapCounter++;
        }
        bars[i].style.backgroundColor = '#3498db'; // Reset color after swap
    }

    for (let k = 0; k < array.length; k++) {
        bars[k].style.backgroundColor = '#2ecc71'; // Final sorted bar color
    }

    let endTime = performance.now();
    let timeTaken = (endTime - startTime) / 1000;
    displayAnalysis(timeTaken, swapCounter);
}

function displayAnalysis(timeTaken, swapCount) {
    document.getElementById('timeTaken').innerText = `Time taken: ${timeTaken.toFixed(2)} seconds`;
    document.getElementById('number').innerText = `No of bars : ${numberOfBars}`;
    document.getElementById('swapCount').innerText = `Number of swaps: ${swapCount}`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startSorting() {
    switch (algorithm) {
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'insertionSort':
            insertionSort();
            break;
        case 'selectionSort':
            selectionSort();
            break;
        // Add cases for other sorting algorithms as needed
        default:
            break;
    }
}

// Initialize the array and default algorithm
generateArray();
setAlgo('bubbleSort'); // Default to bubble sort
