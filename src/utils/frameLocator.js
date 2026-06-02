export function createFrameLocator(frameConfig, canvasSize = 1536) {
  const photo = frameConfig.photo;

  const frameCenter = {
    x: photo.x + photo.width / 2,
    y: photo.y + photo.height / 2,
  };

  return {
    canvasSize,
    photo,
    frameCenter,

    // CORE FUNCTION
    computeFit(imageWidth, imageHeight) {
      if (!imageWidth || !imageHeight) {
        console.error("[FrameLocator] Invalid image dimensions:", {
          imageWidth,
          imageHeight,
        });

        return {
          scale: 1,
          x: photo.x,
          y: photo.y,
          width: photo.width,
          height: photo.height,
        };
      }

      // Cover-style scaling 
      const scale = Math.max(
        photo.width / imageWidth,
        photo.height / imageHeight
      );

      const width = imageWidth * scale;
      const height = imageHeight * scale;

      // Center inside frame box
      const x = photo.x + (photo.width - width) / 2;
      const y = photo.y + (photo.height - height) / 2;

      const result = {
        scale,
        x,
        y,
        width,
        height,
      };

      console.log("[FrameLocator] computeFit result:", result);

      return result;
    },

    // ALIGNMENT DEBUG
    getAlignmentDelta(imageState) {
      const imageCenter = {
        x: imageState.x + imageState.width / 2,
        y: imageState.y + imageState.height / 2,
      };

      const delta = {
        dx: imageCenter.x - frameCenter.x,
        dy: imageCenter.y - frameCenter.y,
      };

      console.log("[FrameLocator] alignment delta:", delta);

      return delta;
    },

    // SNAP TO FRAME CENTER
    snapToCenter(imageState) {
      const centered = {
        ...imageState,
        x: frameCenter.x - imageState.width / 2,
        y: frameCenter.y - imageState.height / 2,
      };

      console.log("[FrameLocator] snapToCenter:", centered);

      return centered;
    },
  };
}