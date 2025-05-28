function drawMultiLines({
    lines = ["LINE 1", "LINE 2", "LINE 3", "LINE 4", "LINE 5"],
    canvasSize = 768,
    font = "bold 100px Arial Narrow, Arial, sans-serif", // Use a narrow font
    textColor = "#fff",
    letterSpacing = -5 // Negative for tighter letters
}) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = canvasSize;
    const ctx = canvas.getContext('2d');

    // Set text style
    ctx.font = font;
    ctx.fillStyle = textColor;
    ctx.textBaseline = "middle";
    ctx.textAlign = "left"; // We'll handle centering manually

    // Evenly space lines from top to bottom
    const n = lines.length;
    for (let i = 0; i < n; i++) {
        const text = lines[i];
        // Calculate y position
        const y = canvasSize * (0.1 + 0.8 * (i / (n - 1)));

        // Calculate total width with custom letter spacing
        let totalWidth = 0;
        for (let c = 0; c < text.length; c++) {
            totalWidth += ctx.measureText(text[c]).width;
            if (c < text.length - 1) totalWidth += letterSpacing;
        }
        // Start x so text is centered
        let x = (canvasSize - totalWidth) / 2;

        // Draw each character with custom spacing
        for (let c = 0; c < text.length; c++) {
            ctx.fillText(text[c], x, y);
            x += ctx.measureText(text[c]).width + letterSpacing;
        }
    }

    // Show or return the canvas
    document.body.appendChild(canvas);
    // Or: return canvas.toDataURL();
}

// Usage:
drawMultiLines({
    lines: [
        "-DTI-RBT-CARDANO", "", "-PUBLICS-SAP-USAID-", "", "WOLFRAM-ALPHA-"
    ],
    canvasSize: 768,
    font: "bold 100px Arial Narrow, Arial, sans-serif",
    letterSpacing: -5 // Try -10, -5, or 0 for different tightness
});



// // Usage:
// drawMultiLines({
//     lines: [
//         "", "-NICKY-SAP-PUBLICIS-", "", "-AMRES-NICKY-PUBLICIS-", ""
//     ],
//     canvasSize: 768,
//     font: "bold 100px Arial Narrow, Arial, sans-serif",
//     letterSpacing: -5 // Try -10, -5, or 0 for different tightness
// });