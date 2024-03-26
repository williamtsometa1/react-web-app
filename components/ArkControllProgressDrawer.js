import debounce from 'lodash/debounce'; // Import debounce function from lodash

export default class CircleDrawer {
  constructor(
    canvasDom,
    radius,
    lineWidth,
    color,
    insideColor,
    dotColor,
    dotWidth,
    percentage,
    percentageCallback // Add the callback function as a parameter
  ) {
    this.canvas = canvasDom;
    this.ctx = this.canvas.getContext('2d');
    this.radius = radius;
    this.lineWidth = lineWidth;
    this.color = color;
    this.insideColor = insideColor;
    this.dragging = false; // Flag to track if button is being dragged
    this.dotColor = dotColor;
    this.dotWidth = dotWidth;

    // Set canvas dimensions
    this.canvas.width = 2.5 * this.radius;
    this.canvas.height = 2.5 * this.radius;

    // Get the initial canvas scale
    this.scaleX = this.canvas.width / this.canvas.offsetWidth;
    this.scaleY = this.canvas.height / this.canvas.offsetHeight;

    // Convert percentage to angle
    const angle = ((percentage * 1.4) / 100) * Math.PI;

    // Calculate button position based on the angle
    const x = (this.radius - this.lineWidth / 2) * Math.cos(angle);
    const y = (this.radius - this.lineWidth / 2) * Math.sin(angle);

    // Draw the material with initial button position
    this.darwMetrial(x, y);

    this.buttonPercentage = percentage;
    this.percentageCallback = debounce(percentageCallback, 300);

    // Add event listeners for mouse events
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  darwMetrial(x, y) {
    this.drawCircle();
    this.drawDecoDot(this.color);
    this.drawAnotherDecoDot();
    this.drawCircleInside(x, y);
    this.drawDecoDot(this.insideColor);
    this.drawButton(x, y);
  }

  drawCircle() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Save the current transformation matrix
    this.ctx.save();

    // Translate to the center of the canvas
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

    // Rotate by 180 degrees
    this.ctx.rotate(Math.PI / 1.25);

    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.color;

    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius - this.lineWidth / 2, 0, 1.4 * Math.PI);
    this.ctx.stroke();

    // Restore the transformation matrix to its original state
    this.ctx.restore();
  }

  drawCircleInside(x, y) {
    // Save the current transformation matrix
    this.ctx.save();

    // Translate to the center of the canvas
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

    // Rotate by 180 degrees
    this.ctx.rotate(Math.PI / 1.25);

    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.insideColor;

    // Calculate the angle between the start and end points of the inner circle arc
    let startAngle = Math.atan2(0, this.radius - this.lineWidth / 2);
    let endAngle = Math.atan2(y, x);
    if (startAngle < 0) {
      startAngle += 2 * Math.PI; // Ensure start angle is positive
    }
    if (endAngle < 0) {
      endAngle += 2 * Math.PI; // Ensure end angle is positive
    }
    if (endAngle < startAngle) {
      endAngle += 2 * Math.PI; // Ensure end angle is greater than start angle
    }

    // Draw the inner circle arc
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius - this.lineWidth / 2, startAngle, endAngle);
    this.ctx.stroke();

    // Restore the transformation matrix to its original state
    this.ctx.restore();
  }

  drawButton(x, y) {
    // Save the current transformation matrix
    this.ctx.save();

    // Translate to the center of the canvas
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

    // Rotate by 180 degrees
    this.ctx.rotate(Math.PI / 1.25);

    // Calculate the position of the button
    const buttonRadius = this.dotWidth; // Adjust button size as needed
    this.buttonX = (this.radius - this.lineWidth / 2) * Math.cos(0);
    this.buttonY = (this.radius - this.lineWidth / 2) * Math.sin(0);

    // Draw the button with box-shadow
    this.ctx.fillStyle = this.dotColor; // Adjust button color as needed
    this.ctx.beginPath();
    if (x) {
      this.ctx.arc(x, y, buttonRadius, 0, Math.PI * 2);
    } else {
      this.ctx.arc(this.buttonX, this.buttonY, buttonRadius, 0, Math.PI * 2);
    }
    this.ctx.shadowColor = '#FFFFFF33';
    this.ctx.shadowOffsetX = 0.8045409321784973;
    this.ctx.shadowOffsetY = 0.8045409321784973;
    this.ctx.shadowBlur = 1.6090818643569946;
    this.ctx.fill();

    // Restore the transformation matrix to its original state
    this.ctx.restore();

    // Store button center coordinates
    this.buttonCenter = { x: this.buttonX, y: this.buttonY };
    this.buttonRadius = buttonRadius;
  }

  drawDecoDot(color) {
    // Save the current transformation matrix
    this.ctx.save();

    // Translate to the center of the canvas
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

    // Rotate by 180 degrees
    this.ctx.rotate(Math.PI / 1.25);

    // Calculate the position of the button
    const buttonRadius = this.lineWidth / 2; // Adjust button size as needed
    const buttonX = (this.radius - this.lineWidth / 2) * Math.cos(0);
    const buttonY = (this.radius - this.lineWidth / 2) * Math.sin(0);

    // Draw the button
    this.ctx.fillStyle = color; // Adjust button color as needed
    this.ctx.beginPath();
    this.ctx.arc(buttonX, buttonY, buttonRadius, 0, Math.PI * 2);
    this.ctx.fill();

    // Restore the transformation matrix to its original state
    this.ctx.restore();

    // Store button center coordinates
    this.buttonCenter = { x: this.buttonX, y: this.buttonY };
    this.buttonRadius = buttonRadius;
  }

  drawAnotherDecoDot() {
    // Save the current transformation matrix
    this.ctx.save();

    // Translate to the center of the canvas
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

    // Rotate by 180 degrees
    this.ctx.rotate(Math.PI / 1.25);

    // Calculate the position of the end of the gray circle arc
    const endX = (this.radius - this.lineWidth / 2) * Math.cos(1.4 * Math.PI);
    const endY = (this.radius - this.lineWidth / 2) * Math.sin(1.4 * Math.PI);

    // Calculate the position of the button
    const buttonRadius = this.lineWidth / 2; // Adjust button size as needed

    // Draw the button at the end of the gray circle arc
    this.ctx.fillStyle = this.color; // Adjust button color as needed
    this.ctx.beginPath();
    this.ctx.arc(endX, endY, buttonRadius, 0, Math.PI * 2);
    this.ctx.fill();

    // Restore the transformation matrix to its original state
    this.ctx.restore();
  }

  // Method to handle mouse down event
  // Method to handle mouse down event
  handleMouseDown(event) {
    // Check if already dragging, if so, return early
    if (this.dragging) {
      return;
    }

    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Translate mouse coordinates to canvas center
    const canvasCenterX = this.canvas.width / 2;
    const canvasCenterY = this.canvas.height / 2;

    // Translate mouse coordinates to canvas space
    const canvasMouseX = mouseX - canvasCenterX;
    const canvasMouseY = mouseY - canvasCenterY;

    // Reverse rotation
    const unRotatedX =
      canvasMouseX * Math.cos(-Math.PI / 1.25) -
      canvasMouseY * Math.sin(-Math.PI / 1.25);
    const unRotatedY =
      canvasMouseX * Math.sin(-Math.PI / 1.25) +
      canvasMouseY * Math.cos(-Math.PI / 1.25);

    // Calculate angle of the line connecting mouse and circle center
    let angle = Math.atan2(unRotatedY, unRotatedX);
    if (angle < 0) {
      angle += 2 * Math.PI; // Ensure angle is positive
    }

    // Calculate button position on circle circumference
    const x = (this.radius - this.lineWidth / 2) * Math.cos(angle);
    const y = (this.radius - this.lineWidth / 2) * Math.sin(angle);

    // Calculate distance between unrotated mouse coordinates and button center
    const distance = Math.sqrt((unRotatedX - x) ** 2 + (unRotatedY - y) ** 2);

    if (distance <= this.buttonRadius) {
      console.log('Mouse down inside the button!');
      this.dragging = true;
      this.offsetX = x - mouseX;
      this.offsetY = y - mouseY;
    } else {
      console.log('Mouse down outside the button.');
    }
  }

  // Method to handle mouse move event
  handleMouseMove(event) {
    if (this.dragging) {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Translate mouse coordinates to canvas center
      const canvasCenterX = this.canvas.width / 2;
      const canvasCenterY = this.canvas.height / 2;

      // Translate mouse coordinates to canvas space
      const canvasMouseX = mouseX - canvasCenterX;
      const canvasMouseY = mouseY - canvasCenterY;

      // Reverse rotation
      const unRotatedX =
        canvasMouseX * Math.cos(-Math.PI / 1.25) -
        canvasMouseY * Math.sin(-Math.PI / 1.25);
      const unRotatedY =
        canvasMouseX * Math.sin(-Math.PI / 1.25) +
        canvasMouseY * Math.cos(-Math.PI / 1.25);

      // Calculate angle of the line connecting mouse and circle center
      let angle = Math.atan2(unRotatedY, unRotatedX);
      if (angle < 0) {
        angle += 2 * Math.PI; // Ensure angle is positive
      }

      // Calculate button position on circle circumference
      const x = (this.radius - this.lineWidth / 2) * Math.cos(angle);
      const y = (this.radius - this.lineWidth / 2) * Math.sin(angle);

      // Calculate angle between current mouse position and start point of the circle arc
      let startAngle = Math.atan2(0, this.radius - this.lineWidth / 2);
      let endAngle = Math.atan2(unRotatedY, unRotatedX);
      if (startAngle < 0) {
        startAngle += 2 * Math.PI; // Ensure start angle is positive
      }
      if (endAngle < 0) {
        endAngle += 2 * Math.PI; // Ensure end angle is positive
      }
      if (endAngle < startAngle) {
        endAngle += 2 * Math.PI; // Ensure end angle is greater than start angle
      }

      // Redraw the whole canvas only if the new position is within the arc
      if (endAngle >= startAngle && endAngle <= 1.4 * Math.PI) {
        this.darwMetrial(x, y);
        this.calculateButtonPercentage(x, y);
      }
    }
  }

  // Method to handle mouse up event
  handleMouseUp(event) {
    this.dragging = false;
  }

  // Method to calculate the button position percentage
  calculateButtonPercentage(x, y) {
    // Calculate the angle of the button position relative to the center of the circle
    let angle = Math.atan2(y, x);
    if (angle < 0) {
      angle += 2 * Math.PI; // Ensure angle is positive
    }

    // Calculate the total angle of the circle
    let totalAngle = 1.4 * Math.PI; // Assuming the arc covers 1.4 * Math.PI radians

    // Calculate the percentage
    this.buttonPercentage = Math.ceil((angle / totalAngle) * 100);
    // Call the callback function to notify the component
    if (typeof this.percentageCallback === 'function') {
      this.percentageCallback(this.buttonPercentage);
    }
  }
}
