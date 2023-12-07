let sortedArray;
let time_comp;
function bubbleSort(arr) {
  const len = arr.length;
  time_comp =
    "<p style='text-decoration: underline;font-weight: bold'>Time Complexity:</p> <p>Best Case: O(n) (the array is already sorted)</p> <p>Average Case: O(n*n)</p> <p>Worst Case: O(n*n) (array in reverse order)</p>";

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap elements if they are in the wrong order
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

function insertionSort(arr) {
  const len = arr.length;
  time_comp =
    "<p style='text-decoration: underline;font-weight: bold'>Time Complexity:</p> <p>Best Case: O(n) (the array is already sorted)</p> <p>Average Case: O(n*n)</p> <p>Worst Case: O(n*n) (array in reverse order)</p>";

  for (let i = 1; i < len; i++) {
    let currentElement = arr[i];
    let j = i - 1;

    // Move elements of arr[0..i-1] that are greater than currentElement
    // to one position ahead of their current position
    while (j >= 0 && arr[j] > currentElement) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = currentElement;
  }

  return arr;
}

function selectionSort(arr) {
  const len = arr.length;
  time_comp =
    "<p style='text-decoration: underline;font-weight: bold'>Time Complexity:</p> <p>Best Case: O(n) (the array is already sorted)</p> <p>Average Case: O(n*n)</p> <p>Worst Case: O(n*n) (array in reverse order)</p>";

  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;

    // Find the index of the minimum element in the unsorted part of the array
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the found minimum element with the first element
    const temp = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = temp;
  }

  return arr;
}

function mergeSort(arr) {
  time_comp =
    "<p style='text-decoration: underline;font-weight: bold'>Time Complexity:</p> <p>Best Case: O(n logn) (the array is already sorted)</p> <p>Average Case: O(n logn)</p> <p>Worst Case: O(n logn) (array in reverse order)</p>";
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements from left and right arrays and merge them in sorted order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Concatenate any remaining elements from left and right arrays
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

function quickSort(arr) {
  time_comp =
    "<p style='text-decoration: underline;font-weight: bold'>Time Complexity:</p> <p>Best Case: O(n logn) (pivot element is the middle element or near to the middle)</p> <p>Average Case: O(n logn)</p> <p>Worst Case: O(n logn) (pivot element is either greatest or smallest element)</p>";
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat(pivot, quickSort(right));
}

function heapSort(arr) {
  time_comp =
    "<p style='text-decoration: underline;font-weight: bold'>Time Complexity:</p> <p>Best Case: O(n logn) (the array is already sorted)</p> <p>Average Case: O(n logn)</p> <p>Worst Case: O(n logn) (array in reverse order)</p>";
  buildMaxHeap(arr);

  for (let i = arr.length - 1; i > 0; i--) {
    // Swap the root (maximum value) with the last element of the heap
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Restore the max heap property for the remaining heap
    heapify(arr, 0, i);
  }

  return arr;
}

function buildMaxHeap(arr) {
  const len = arr.length;
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    heapify(arr, i, len);
  }
}

function heapify(arr, i, heapSize) {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let largest = i;

  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    // Swap arr[i] and arr[largest]
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // Recursively heapify the affected sub-tree
    heapify(arr, largest, heapSize);
  }
}

function runSorting() {
  const inputArray = document
    .getElementById("inputArray")
    .value.split(",")
    .map(Number);
  const algorithm = document.getElementById("algorithm").value;

  let timeComplexity;

  const startTime = performance.now();

  switch (algorithm) {
    case "bubbleSort":
      sortedArray = bubbleSort(inputArray);
      break;
    case "insertionSort":
      sortedArray = insertionSort(inputArray);
      break;
    case "selectionSort":
      sortedArray = selectionSort(inputArray);
      break;
    case "mergeSort":
      sortedArray = mergeSort(inputArray);
      break;
    case "quickSort":
      sortedArray = quickSort(inputArray);
      break;
    case "heapSort":
      sortedArray = heapSort(inputArray);
      break;
    // Add cases for other sorting algorithms as needed
    default:
      break;
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;

  // Display results
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `
        <p>Sorted Array: ${sortedArray}</p>
        <p>Execution Time: ${executionTime.toFixed(4)} milliseconds</p>
        <p>Space Complexity: O(1) (assuming in-place sorting)</p>
        ${time_comp}
    `;
}

function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return the index of the target if found
    }
  }
  return -1; // Return -1 if the target is not found
}

function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      return mid; // Return the index of the target if found
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1; // Return -1 if the target is not found
}

function runSearching() {
  const inputArray = document
    .getElementById("inputArray")
    .value.split(",")
    .map(Number);

  const searchAlgorithm = document.getElementById("searchAlgorithm").value;
  const targetValue = parseInt(document.getElementById("searchTarget").value);

  let result;

  switch (searchAlgorithm) {
    case "linearSearch":
      sortedArray = inputArray;
      result = linearSearch(sortedArray, targetValue);
      break;
    case "binarySearch":
      sortedArray = insertionSort(inputArray);
      result = binarySearch(sortedArray, targetValue);
      break;
    // Add cases for other searching algorithms as needed
    default:
      break;
  }

  // Display the search result and other information
  const searchOutputDiv = document.getElementById("searchOutput");

  if (result !== -1) {
    searchOutputDiv.innerHTML = `
    ${
      searchAlgorithm === "binarySearch"
        ? `<p>Sorted Array: ${sortedArray}</p>`
        : `<p>Array: ${sortedArray}</p>`
    }
            <p>Search Result: Found at index ${result}</p>
        `;
  } else {
    searchOutputDiv.innerHTML = `
    ${
      searchAlgorithm === "binarySearch"
        ? `<p>Sorted Array: ${sortedArray}</p>`
        : `<p>Array: ${sortedArray}</p>`
    }
            <p>Search Result: Not found</p>
        `;
  }
}
