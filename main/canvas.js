   // Get the canvas element and its context
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Set the canvas background color
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Function to draw the current page
    function drawPage(pageContent) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'iddle';
      ctx.fillText(pageContent, canvas.width / 2, canvas.height / 2);
    }

    // Function to transition to a new page
    function transitionToNewPage(newPageContent) {
      // Get the current page content
      const currentPageContent = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Create a fade-out animation
      let opacity = 1;
      const fadeOutInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(currentPageContent, 0, 0);
        ctx.globalAlpha = opacity;
        opacity -= 0.1;
        if (opacity <= 0) {
          clearInterval(fadeOutInterval);
          drawPage(newPageContent);
        }
      }, 16); // 16ms = 60fps
    }

    // Example usage:
    drawPage('Page 1');
    setTimeout(() => {
      transitionToNewPage('Page 2');
    }, 2000);

