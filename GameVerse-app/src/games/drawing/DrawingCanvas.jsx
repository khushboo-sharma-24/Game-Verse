import { forwardRef, useState, useEffect } from "react";

const DrawingCanvas = forwardRef((props, canvasRef) => {
  const [drawing, setDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [paths, setPaths] = useState([]); // stores all strokes

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.lineWidth = 5;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = "#000"; // black line
      context.fillStyle = "#fff"; // white background
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setCtx(context);
    }
  }, [canvasRef]);

  // Get pointer coordinates relative to canvas
  const getPointerPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;

    // More precise calculation for mobile & high-DPI screens
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const startDraw = (e) => {
    if (!ctx) return;
    const pos = getPointerPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setDrawing(true);
    setPaths((prev) => [...prev, [{ x: pos.x, y: pos.y }]]); // new stroke
  };

  const draw = (e) => {
    if (!drawing || !ctx) return;
    const pos = getPointerPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    // add current point to latest path
    setPaths((prev) => {
      const newPaths = [...prev];
      newPaths[newPaths.length - 1].push({ x: pos.x, y: pos.y });
      return newPaths;
    });
  };

  const stopDraw = () => setDrawing(false);

  // Clear last stroke only
  const clearLastStroke = () => {
    if (!ctx || paths.length === 0) return;
    const newPaths = [...paths];
    newPaths.pop();
    setPaths(newPaths);

    // redraw remaining strokes on white background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    newPaths.forEach((stroke) => {
      if (stroke.length > 0) {
        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);
        stroke.forEach((pt) => ctx.lineTo(pt.x, pt.y));
        ctx.stroke();
      }
    });
  };

  // Clear all strokes
  const clearAll = () => {
    if (!ctx) return;
    ctx.fillStyle = "#fff"; // white background
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setPaths([]);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="draw-canvas"
        style={{
          cursor: "crosshair",
          touchAction: "none",
          border: "1px solid #000",
          backgroundColor: "#fff",
          color: "#000", 
        }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button className="clear-btn" onClick={clearLastStroke}>
          Undo 
        </button>
        <button className="clear-btn" onClick={clearAll}>
          Clear All
        </button>
      </div>
    </>
  );
});

export default DrawingCanvas;
