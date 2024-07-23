let array = [];
let time = 1000;
let algorithm = 'bubbleSort';

function setAlgo(algo) {
    algorithm = algo;
    document.getElementById('algoName').innerText = `${algo} Sorting`;
    updateCodeDisplay();
}

function generateArray() {
    const barCount = document.getElementById('barCount').value;
    array = [];
    for (let i = 0; i < barCount; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray();
}

function displayArray() {
    const display = document.getElementById('display');
    display.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.style.height = `${array[i]}%`;
        bar.classList.add('bar');
        display.appendChild(bar);
    }
}

function update() {
    generateArray();
}

function updateTime() {
    time = document.getElementById('swapspeed').value;
}

async function startSorting() {
    switch (algorithm) {
        case 'bubbleSort':
            await bubbleSort();
            break;
        case 'selectionSort':
            await selectionSort();
            break;
        case 'insertionSort':
            await insertionSort();
            break;
        case 'mergeSort':
            array = await mergeSort(array);
            break;
        case 'quickSort':
            await quickSort(array, 0, array.length - 1);
            break;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(array, i, j) {
    const bars = document.getElementsByClassName('bar');

    // Swap the elements in the array
    [array[i], array[j]] = [array[j], array[i]];

    // Update the height of the bars to reflect the swap
    bars[i].style.height = `${array[i]}%`;
    bars[j].style.height = `${array[j]}%`;

    // Temporarily highlight bars in red to indicate a swap
    bars[i].style.backgroundColor = 'red';
    bars[j].style.backgroundColor = 'red';

    // Force a repaint to ensure the color change is visible
    await new Promise(resolve => requestAnimationFrame(() => resolve()));
    await new Promise(resolve => setTimeout(resolve, 100)); // Short delay to ensure color change visibility

    // Revert bars to default color
    bars[i].style.backgroundColor = '#3498db';
    bars[j].style.backgroundColor = '#3498db';

    // Force another repaint to ensure the color change is rendered
    await new Promise(resolve => requestAnimationFrame(() => resolve()));
}





function updateCodeDisplay() {
    const codeDisplay = document.getElementById('codeDisplay');
    let codeText = '';
    switch (algorithm) {
        case 'bubbleSort':
            codeText = `
for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
            swap(array, j, j + 1);
        }
    }
}`;
            break;
        case 'selectionSort':
            codeText = `
for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIdx]) {
            minIdx = j;
        }
    }
    swap(array, i, minIdx);
}`;
            break;
        case 'insertionSort':
            codeText = `
for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j = j - 1;
    }
    array[j + 1] = key;
}`;
            break;
        case 'mergeSort':
            codeText = `
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`;
            break;
        case 'quickSort':
            codeText = `
async function quickSort(arr, low, high) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = (low - 1);
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return (i + 1);
}`;
            break;
    }
    codeDisplay.innerHTML = codeText.split('\n').map((line, index) => `<span data-line="${index}">${line}</span>`).join('\n');
}

// Example sorting algorithms implementation


async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'yellow';
            bars[j + 1].style.backgroundColor = 'yellow';
            await sleep(time);
            if (array[j] > array[j + 1]) {
                await swap(array, j, j + 1);
            }
            bars[j].style.backgroundColor = '#3498db';
            bars[j + 1].style.backgroundColor = '#3498db';
        }
    }
}


async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        const bars = document.getElementsByClassName('bar');
        let minIdx = i;  // Initialize minIdx at the start of each outer loop iteration

        bars[i].classList.add('bar-pink');
        
        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add('bar-yellow');
            if (array[j] < array[minIdx]) {
                bars[minIdx].classList.remove('bar-pink'); // Remove pink class from previous minIdx
                minIdx = j;
                bars[minIdx].classList.add('bar-pink'); // Add pink class to new minIdx
            }
            await sleep(time);
            bars[j].classList.remove('bar-yellow');
        }
        
        if (minIdx !== i) {
            await swap(array, i, minIdx);
            const sortedBar = document.getElementsByClassName('bar')[i];
            sortedBar.classList.add('bar-green');
        }
        bars[i].classList.remove('bar-pink'); // Ensure to remove the pink class after swap
        
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName('bar');
    
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        const keyBar = bars[i];
        
        // Highlight the key bar
        keyBar.classList.add('bar-pink');
        keyBar.style.height = `${key}%`;
        
        // Move elements of array[0..i-1] that are greater than key to one position ahead
        while (j >= 0) {
            const compareBar = bars[j];
            compareBar.classList.add('bar-yellow');
            
            if (array[j] > key) {
                array[j + 1] = array[j];
                bars[j + 1].style.height = `${array[j + 1]}%`;
                bars[j].classList.remove('bar-yellow');
                await sleep(time);
                j = j - 1;
            } else {
                bars[j].classList.remove('bar-yellow');
                break;
            }
        }
        
        // Insert the key into its correct position
        array[j + 1] = key;
        bars[j + 1].style.height = `${key}%`;
        keyBar.classList.remove('bar-pink');
        bars[j + 1].classList.add('bar-green');
    }
    
    // Make all bars green after sorting is complete
    for (let k = 0; k < bars.length; k++) {
        bars[k].classList.add('bar-green');
    }
}





async function mergeSort(array) {
    const bars = document.getElementsByClassName('bar');
    
    if (array.length <= 1) {
        return array;
    }

    const mid = Math.floor(array.length / 2);
    const left = await mergeSort(array.slice(0, mid));
    const right = await mergeSort(array.slice(mid));
    
    return await merge(left, right);
}

async function merge(left, right) {
    const bars = document.getElementsByClassName('bar');
    let resultArray = [], leftIndex = 0, rightIndex = 0;
    let leftBars = [];
    let rightBars = [];
    
    // Visualize the merge process
    for (let i = 0; i < left.length; i++) {
        leftBars.push(document.getElementsByClassName('bar')[i]);
        leftBars[i].classList.add('bar-pink');
    }
    for (let i = left.length; i < left.length + right.length; i++) {
        rightBars.push(document.getElementsByClassName('bar')[i]);
        rightBars[i - left.length].classList.add('bar-yellow');
    }
    
    while (leftIndex < left.length && rightIndex < right.length) {
        // Highlight comparing bars
        leftBars[leftIndex].classList.add('bar-yellow');
        rightBars[rightIndex].classList.add('bar-yellow');
        
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
        
        // Remove yellow class after comparison
        if (leftIndex < left.length) {
            leftBars[leftIndex].classList.remove('bar-yellow');
        }
        if (rightIndex < right.length) {
            rightBars[rightIndex].classList.remove('bar-yellow');
        }
        await sleep(time);
    }

    // Concatenate remaining elements
    resultArray = resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));

    // Update the bars' heights and apply green class to sorted elements
    for (let i = 0; i < resultArray.length; i++) {
        bars[i].style.height = `${resultArray[i]}%`;
        bars[i].classList.add('bar-green');
    }
    
    // Remove the 'bar-green' class from bars not included in this merge
    for (let i = resultArray.length; i < bars.length; i++) {
        bars[i].classList.remove('bar-green');
    }

    return resultArray;
}


async function quickSort(arr, low, high) {
    const bars = document.getElementsByClassName('bar');
    
    if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }

    // Make all bars green after sorting is complete
    for (let k = 0; k < bars.length; k++) {
        bars[k].classList.add('bar-green');
    }
}

async function partition(arr, low, high) {
    const bars = document.getElementsByClassName('bar');
    let pivot = arr[high];
    let i = (low - 1);

    // Highlight the pivot element
    bars[high].classList.add('bar-pink');
    
    for (let j = low; j < high; j++) {
        // Highlight the current bar being compared
        bars[j].classList.add('bar-yellow');
        
        if (arr[j] < pivot) {
            i++;
            await swap(arr, i, j);

            // Update bar heights after swap
            bars[i].style.height = `${arr[i]}%`;
            bars[j].style.height = `${arr[j]}%`;
        }

        await sleep(time);

        // Remove the yellow class after comparison
        bars[j].classList.remove('bar-yellow');
    }

    // Swap pivot to its correct position and update the bar heights
    await swap(arr, i + 1, high);
    bars[high].classList.remove('bar-pink'); // Remove the pivot highlight
    bars[i + 1].classList.add('bar-green'); // Mark the pivot as sorted

    return (i + 1);
}

// Swap function for swapping elements in the array and updating bar heights
async function swap(arr, i, j) {
    const bars = document.getElementsByClassName('bar');
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    bars[i].style.height = `${arr[i]}%`;
    bars[j].style.height = `${arr[j]}%`;
}


document.addEventListener('DOMContentLoaded', () => {
    setAlgo(algorithm);
    generateArray();
});
