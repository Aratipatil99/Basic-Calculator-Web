// Make sure this runs AFTER the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
  
    function appendToDisplay(value) {
      display.value += value;
    }
  
    function clearDisplay() {
      display.value = "";
    }
  
    function calculate() {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Error";
      }
    }
  
    const calculator = document.getElementById("calculator");
    const calculatorBody = document.getElementById("calculator-body");
    const minimizeBtn = document.getElementById("minimize");
    const maximizeBtn = document.getElementById("maximize");
    const closeBtn = document.getElementById("close");
  
    let isMaximized = false;
    let isMinimized = false;
    let previousPosition = { top: "100px", left: "100px" };
  
    // ✅ Fix minimize
    minimizeBtn.onclick = () => {
      if (!isMinimized) {
        calculatorBody.style.display = "none";
        isMinimized = true;
      } else {
        calculatorBody.style.display = "block";
        isMinimized = false;
      }
    };
  
    maximizeBtn.onclick = () => {
      if (!isMaximized) {
        previousPosition = {
          top: calculator.style.top,
          left: calculator.style.left
        };
        calculator.style.top = "10px";
        calculator.style.left = "10px";
        calculator.style.width = "calc(100% - 20px)";
        calculator.style.maxWidth = "none";
        isMaximized = true;
      } else {
        calculator.style.top = previousPosition.top;
        calculator.style.left = previousPosition.left;
        calculator.style.width = "";
        calculator.style.maxWidth = "250px";
        isMaximized = false;
      }
    };
  
    closeBtn.onclick = () => {
      calculator.style.display = "none";
    };
  
    // Dragging the title bar
    const titleBar = document.getElementById("title-bar");
    let offsetX, offsetY, isDragging = false;
  
    titleBar.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - calculator.offsetLeft;
      offsetY = e.clientY - calculator.offsetTop;
      document.body.style.userSelect = "none";
    });
  
    document.addEventListener("mousemove", (e) => {
      if (isDragging && !isMaximized) {
        calculator.style.left = `${e.clientX - offsetX}px`;
        calculator.style.top = `${e.clientY - offsetY}px`;
      }
    });
  
    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.body.style.userSelect = "auto";
    });
  
    // Expose calculator functions globally
    window.appendToDisplay = appendToDisplay;
    window.clearDisplay = clearDisplay;
    window.calculate = calculate;
  });
  