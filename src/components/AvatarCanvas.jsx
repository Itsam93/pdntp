import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { createFrameLocator } from "../utils/frameLocator";

const AvatarCanvas = forwardRef(function AvatarCanvas(
  {
    uploadedImage,
    frameImage,
    title,
    fullName,
    config,
    zoom = 1,
    position = { x: 0, y: 0 },
  },
  ref
) {
  const canvasRef = useRef(null);

  useImperativeHandle(ref, () => ({
    download() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const fileName = `${fullName
        .toLowerCase()
        .replace(/\s+/g, "-")}-avatar.png`;

      const link = document.createElement("a");
      link.download = fileName;
      link.href = canvas.toDataURL("image/png");
      link.click();
    },
  }));

  useEffect(() => {
    if (!uploadedImage || !frameImage || !config) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const userImage = new Image();
    const frame = new Image();

    userImage.src = uploadedImage;
    frame.src = frameImage;

    const SIZE = config.canvasSize || 1536;

    const load = (img) =>
      new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

    const render = async () => {
      await Promise.all([load(userImage), load(frame)]);

      await document.fonts.load("600 48px Montserrat");
      await document.fonts.load("700 48px Montserrat");

      canvas.width = SIZE;
      canvas.height = SIZE;

      ctx.clearRect(0, 0, SIZE, SIZE);

      ctx.drawImage(frame, 0, 0, SIZE, SIZE);

      const centerX = config.photo.x + config.photo.width / 2;
      const centerY = config.photo.y + config.photo.height / 2;

      const radius =
        Math.min(config.photo.width, config.photo.height) / 2;

      const locator = createFrameLocator(config, SIZE);

      const fit = locator.computeFit(
        userImage.naturalWidth,
        userImage.naturalHeight
      );

      const scaledWidth = fit.width * zoom;
      const scaledHeight = fit.height * zoom;

      const scaledX = centerX - scaledWidth / 2 + position.x;
      const scaledY = centerY - scaledHeight / 2 + position.y;

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      ctx.drawImage(
        userImage,
        scaledX,
        scaledY,
        scaledWidth,
        scaledHeight
      );

      ctx.restore();

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillStyle = config.title.color;
      ctx.font = `600 ${config.title.fontSize}px Montserrat`;
      ctx.fillText(title, config.title.x, config.title.y);

      ctx.fillStyle = config.fullName.color;
      ctx.font = `700 ${config.fullName.fontSize}px Montserrat`;
      ctx.fillText(fullName, config.fullName.x, config.fullName.y);
    };

    render().catch(console.error);
  }, [uploadedImage, frameImage, title, fullName, config, zoom, position]);

  return (
    <div className="flex flex-col items-center gap-6">
      <canvas
        ref={canvasRef}
        className="w-full max-w-xl rounded-xl border shadow-sm"
      />
    </div>
  );
});

export default AvatarCanvas;