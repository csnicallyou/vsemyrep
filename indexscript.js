window.addEventListener("load", function() {
    const draggableElements = document.querySelectorAll(".draggable");

    draggableElements.forEach((element) => {
        element.addEventListener("mousedown", onMouseDown);
    });

    let offsetX, offsetY;
    let draggedElement = null;

    function onMouseDown(e) {
        if (e.target.classList.contains("header")) {
            draggedElement = e.currentTarget;
            const rect = draggedElement.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            draggedElement.classList.add("dragging");
            bringToFront(draggedElement);
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }
    }

    function onMouseMove(e) {
        if (draggedElement) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            draggedElement.style.left = `${newX}px`;
            draggedElement.style.top = `${newY}px`;
        }
    }

    function onMouseUp() {
        if (draggedElement) {
            draggedElement.classList.remove("dragging");
            draggedElement = null;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }
    }


    function bringToFront(element) {
        const divs = document.querySelectorAll(".draggable");
        let highestZIndex = 0;

        divs.forEach((div) => {
            const zIndex = parseInt(window.getComputedStyle(div).zIndex, 10);
            if (!isNaN(zIndex) && zIndex > highestZIndex) {
                highestZIndex = zIndex;
            }
        });

        element.style.zIndex = highestZIndex + 1;
    }
});

function toggleDropUp() {
    var dropUpContent = document.getElementById("dropUpContent");
    dropUpContent.classList.toggle("show");
}

document.addEventListener("click", function(event) {
    var dropUpContent = document.getElementById("dropUpContent");
    var dropUpButton = document.querySelector(".box");

    if (!event.target.closest(".drop-up") && event.target !== dropUpButton) {
        dropUpContent.classList.remove("show");
    }
});

function openTab(divNumber) {
    var divToOpen = document.getElementById("div" + divNumber);
    divToOpen.style.display = "block";
    var tabToOpen = document.getElementById("tab" + divNumber);
    tabToOpen.style.display = "inline-block";
}

function closeTab(divNumber) {
    var divToClose = document.getElementById("div" + divNumber);
    divToClose.style.display = "none";
    var tabToClose = document.getElementById("tab" + divNumber);
    tabToClose.style.display = "none";
}

function loadFrame(elm) {
    var frame1 = document.getElementById('frame2');
    frame1.src = elm.dataset.src;
}

const iconButtons = document.querySelectorAll(".opennew");

iconButtons.forEach(button => {
  button.addEventListener("click", function() {
      const targetURL = button.getAttribute("data-target");
      if (targetURL) {
          window.location.href = targetURL;
      }
  });
});

function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;

  document.getElementById('clock').textContent = timeString;
}

function startTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
}

setInterval(startTime, 1000);
startTime();

document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleButton");
    const images = document.querySelectorAll(".toggle-image");

    let imagesVisible = false;

    toggleButton.addEventListener("click", function () {
        if (imagesVisible) {
            images.forEach(image => {
                image.style.display = "none";
            });
        } else {
            images.forEach(image => {
                image.style.display = "block";
            });
        }
        imagesVisible = !imagesVisible;
    });

  const colorVariables = {
        'contrastbg': '#f948ff',
        'lightest': '#baff79',
        'light': '#9bfc56',
        'mid': '#68d32e',
        'shadow': '#6a8c60',
        'dark': '#121a12',
        'darkest': '#000000',
        'terminalbg': '#000000'
    };
    const root = document.documentElement;
    const div2Content = document.querySelector('#div2 .content');
    const frame1 = document.getElementById('frame2');


    function setIframeBackground(color){
        if(frame1 && frame1.contentDocument){
            const iframeBody = frame1.contentDocument.body;
            if(iframeBody){
                iframeBody.style.backgroundColor = color
            }
        }
    }

    for (const [variable, defaultValue] of Object.entries(colorVariables)) {
        const colorPicker = document.getElementById(`${variable}Color`);
        const storedColor = localStorage.getItem(variable);
        if (storedColor) {
            root.style.setProperty(`--${variable}`, storedColor);
            colorPicker.value = storedColor;
        }

        colorPicker.addEventListener('input', function () {
            root.style.setProperty(`--${variable}`, colorPicker.value);
            if (variable === 'terminalbg') {
                div2Content.style.backgroundColor = colorPicker.value;
                setIframeBackground(colorPicker.value)
            }
            localStorage.setItem(variable, colorPicker.value);
        });

        if (variable === 'terminalbg' && storedColor) {
            div2Content.style.backgroundColor = storedColor;
            setIframeBackground(storedColor);
        }
    }

  const backgroundGifContainer = document.getElementById('background-gif-container');
  let backgroundGif = document.createElement('img');

    const storedGifSrc = localStorage.getItem('backgroundGifSrc');
    const storedGifX = localStorage.getItem('backgroundGifX');
    const storedGifY = localStorage.getItem('backgroundGifY');

    if (storedGifSrc) {
        backgroundGif.src = storedGifSrc;
        backgroundGifContainer.appendChild(backgroundGif);
        backgroundGifContainer.style.left = `${storedGifX || 0}px`;
        backgroundGifContainer.style.top = `${storedGifY || 0}px`;
    }


    let offsetXGif, offsetYGif;
    let draggedGif = null;

    backgroundGif.addEventListener('mousedown', function (e) {
        draggedGif = backgroundGif;
        const rect = backgroundGif.getBoundingClientRect();
        offsetXGif = e.clientX - rect.left;
        offsetYGif = e.clientY - rect.top;
        document.addEventListener('mousemove', onMouseMoveGif);
        document.addEventListener('mouseup', onMouseUpGif);
    });

    function onMouseMoveGif(e) {
        if (draggedGif) {
            const newX = e.clientX - offsetXGif;
            const newY = e.clientY - offsetYGif;
            draggedGif.style.left = `${newX}px`;
            draggedGif.style.top = `${newY}px`;
        }
    }

    function onMouseUpGif() {
        if (draggedGif) {
            draggedGif = null;
            document.removeEventListener('mousemove', onMouseMoveGif);
            document.removeEventListener('mouseup', onMouseUpGif);
            localStorage.setItem('backgroundGifX', draggedGif.style.left);
            localStorage.setItem('backgroundGifY', draggedGif.style.top);
        }
    }

    const gifButton = document.getElementById('openGifSelector');
    const gifList = document.getElementById('gifList');
    const gifs = [
        'gifs/chickenhell.gif',
        'gifs/genie.gif',
        'gifs/havequip.gif',
    ];

    function openGifSelector() {
        document.getElementById('gifSelector').style.display = 'block';
    }

    function closeGifSelector() {
        document.getElementById('gifSelector').style.display = 'none';
    }

    gifButton.addEventListener('click', openGifSelector);

    gifs.forEach(gif => {
        const li = document.createElement('li');
        li.textContent = gif.split('/').pop();
        li.addEventListener('click', function() {
            addDesktopIcon(gif);
            closeGifSelector();
        });
        gifList.appendChild(li)
    });


    const gifFolders = document.querySelectorAll('#div10 .folder');
    gifFolders.forEach(folder => {
        folder.addEventListener('click', function() {
            const gifSrc = this.dataset.src;
            addDesktopIcon(gifSrc);
        });
    });


    function addDesktopIcon(gifSrc) {
        const iconContainer = document.querySelector('.icons');
        const newIcon = document.createElement('button');
        newIcon.classList.add('icon');
        const newImg = document.createElement('img');
        newImg.src = gifSrc;
        newIcon.appendChild(newImg);
        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'path/to/trash-icon.png';
        deleteIcon.style.width = '25px';
        deleteIcon.style.height = '25px';
        deleteIcon.style.cursor = 'pointer';

        deleteIcon.onclick = function() {
            iconContainer.removeChild(newIcon);
        };

         newIcon.appendChild(deleteIcon);
        iconContainer.appendChild(newIcon);
       newIcon.addEventListener("mousedown", onMouseDown);
    }
});
function isValidHex(hex) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  }
    let dragMode = false;
    function toggleDragMode() {
        dragMode = !dragMode;
        const gifIcons = document.querySelectorAll('.gif-icon');
        gifIcons.forEach(icon => {
            icon.style.pointerEvents = dragMode ? 'auto' : 'none';
        });
    }
    let gifCount = 0;
    function addGifIcon(src) {
        if (gifCount >= 5) {
          const errorGif = document.getElementById('errorGif');
           errorGif.style.display = 'block';
            setTimeout(() => {
               errorGif.style.display = 'none';
            }, 2000);
            return;
        }

        const newIcon = document.createElement('div');
        newIcon.className = 'gif-icon draggable';
        newIcon.id = `gifIcon-${gifCount}`;
         newIcon.dataset.gifId = gifCount;
        newIcon.style.position = 'absolute';
        newIcon.style.zIndex = '0';
        newIcon.style.left = (window.innerWidth / 2) - 50 + 'px';
        newIcon.style.top = '10px';


        const gifImage = document.createElement('img');
        gifImage.src = src;
        gifImage.style.maxWidth = '100%';
         gifImage.style.maxHeight = '100%';
         newIcon.appendChild(gifImage);


        newIcon.onmousedown = function (event) {
            if (dragMode) {
              isDragging = true;
              let shiftX = event.clientX - newIcon.getBoundingClientRect().left;
              let shiftY = event.clientY - newIcon.getBoundingClientRect().top;

              function moveAt(pageX, pageY) {
                  newIcon.style.left = pageX - shiftX + 'px';
                  newIcon.style.top = pageY - shiftY + 'px';
              }

              function onMouseMove(event) {
                  moveAt(event.pageX, event.pageY);
              }

              document.addEventListener('mousemove', onMouseMove);

              newIcon.onmouseup = function () {
                  document.removeEventListener('mousemove', onMouseMove);
                  newIcon.onmouseup = null;
                  isDragging = false;
              };
                return false;
            } else {
                newIcon.style.pointerEvents = 'none';
               return;
            }
        };


        let gifContainer = document.getElementById('gifContainer');
         if (!gifContainer) {
             gifContainer = document.createElement('div');
             gifContainer.id = 'gifContainer';
             gifContainer.style.position = 'relative';
             gifContainer.style.zIndex = '-1';
            document.body.appendChild(gifContainer);
         }
         gifContainer.appendChild(newIcon);


        const gifIconsContainer = document.getElementById('gifIconsContainer');
        const iconWrapper = document.createElement('div');
        iconWrapper.style.display = 'flex';
        iconWrapper.style.alignItems = 'center';


        const miniGif = document.createElement('img');
        miniGif.src = src;
        miniGif.style.width = '25px';
        miniGif.style.height = '25px';
        iconWrapper.appendChild(miniGif);


        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'path/to/trash-icon.png';
        deleteIcon.style.width = '25px';
         deleteIcon.style.height = '25px';
        deleteIcon.style.cursor = 'pointer';


         deleteIcon.onclick = function () {
            const gifId = `gifIcon-${newIcon.dataset.gifId}`;
             const mainIcon = document.getElementById(gifId);

             if (mainIcon) {
                 mainIcon.remove();
             }

             gifIconsContainer.removeChild(iconWrapper);
             gifCount--;
             const gifCounter = document.getElementById('gifCounter');
             gifCounter.textContent = `${gifCount}/5`;
             if (gifCount < 5) {
                 gifCounter.style.color = '';
            }
        };


         iconWrapper.appendChild(deleteIcon);
         gifIconsContainer.appendChild(iconWrapper);
         gifCount++;
        const gifCounter = document.getElementById('gifCounter');
        gifCounter.textContent = `${gifCount}/5`;
        if (gifCount === 5) {
          gifCounter.style.color = 'red';
      }
    }
document.addEventListener('DOMContentLoaded', function () {
  const gifListContainer = document.getElementById('gif-list-container');
  if (gifListContainer) {
    loadGifList();
  }
});

async function loadGifList() {
  try {
    const response = await fetch('get-gifs.php');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const gifs = await response.json();
    if (gifs.length) {
      gifs.forEach(gif => {
        const folder = document.createElement('div');
        folder.className = 'folder';
        folder.dataset.src = `gifs/${gif}`;
        const img = document.createElement('img');
        folder.appendChild(img);
        const br = document.createElement('br');
        folder.appendChild(br);
        const text = document.createTextNode(gif.replace(/\.[^/.]+$/, ''));
        folder.appendChild(text);
        gifListContainer.appendChild(folder);
      });
    } else {
      gifListContainer.innerHTML = "<p>No gifs found!</p>";
    }
      document.querySelectorAll('#div10 .folder').forEach(folder => {
        folder.addEventListener('click', function () {
          const gifSrc = this.getAttribute('data-src');
          addGifIcon(gifSrc);
        });
      });
  } catch (error) {
    console.error('Failed to load gifs:', error);
    gifListContainer.innerHTML = "<p>Failed to load gifs</p>";
  }
}
 const container = document.body;
    const sparkleImage = "https://i.imgur.com/F8aTF8B.png";
    const sparkleSizeRange = [5, 5];

    function lerp(a, b, f) {
      return (b - a) * f + a;
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getSparkleSize() {
      return getRandomInt(sparkleSizeRange[0], sparkleSizeRange[1]);
    }

    function sparkleEffect(x, y) {
      const s = getSparkleSize();
      x -= s / 2;
      y -= s / 2;
      x = Math.floor(x) + getRandomInt(-15, 15);
      y = Math.floor(y) + getRandomInt(-15, 15);
      const fx = x + getRandomInt(-50, 50);
      const fy = y + getRandomInt(-50, 50);
      const sparkle = document.createElement("img");
      sparkle.src = sparkleImage;
      sparkle.style.pointerEvents = "none";
      sparkle.style.position = "fixed";
      sparkle.style.width = `${s}px`;
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.webkitTouchCallout = "none";
      sparkle.style.webkitUserSelect = "none";
      sparkle.style.khtmlUserSelect = "none";
      sparkle.style.mozUserSelect = "none";
      sparkle.style.msUserSelect = "none";
      sparkle.style.userSelect = "none";
      sparkle.style.zIndex = 99999;
      container.appendChild(sparkle);
      let f = 0;
      const interval = setInterval(function () {
        const _x = Math.floor(lerp(x, fx, f));
        const _y = Math.floor(lerp(y, fy, f));
        sparkle.style.left = `${_x}px`;
        sparkle.style.top = `${_y}px`;
        sparkle.style.opacity = 1 - f;
        f += 0.01;
        if (f > 1) {
          clearInterval(interval);
          container.removeChild(sparkle);
        }
      }, 6);
    }

    function createSparkles(x, y) {
      for (let i = 0; i < 20; i++) {
        sparkleEffect(x, y);
      }
    }

    container.addEventListener("click", function (event) {
      const x = event.clientX;
      const y = event.clientY;
      createSparkles(x, y);
    });