import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import AvatarCanvas from "../components/AvatarCanvas";
import { avatarFrames } from "../config/avatarFrames";
import { avatarAssets } from "../config/avatarAssets";

function AvatarPage() {
  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Single Healing Streams configuration
  const config = avatarFrames.healingStreams;
  const frameImage = avatarAssets.healingStreams.frame;

  // =========================
  // LOAD USER
  // =========================
  useEffect(() => {
    const stored = localStorage.getItem("avatarUser");

    if (!stored) {
      navigate("/");
      return;
    }

    setUser(JSON.parse(stored));
  }, [navigate]);

  // =========================
  // IMAGE UPLOAD
  // =========================
  const handleUpload = (file) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    const img = new Image();

    img.onload = () => {
      const baseSize = config.canvasSize || 1536;

      const scale = Math.max(
        baseSize / img.width,
        baseSize / img.height
      );

      setZoom(scale);
      setPosition({ x: 0, y: 0 });
      setImage(url);
    };

    img.src = url;
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    handleUpload(file);
  };

  // =========================
  // DRAG HANDLING
  // =========================
  const onMouseDown = (e) => {
    setDragging(true);

    setDragStart({
      x: e.clientX - position.x * zoom,
      y: e.clientY - position.y * zoom,
    });
  };

  const onMouseMove = (e) => {
    if (!dragging) return;

    setPosition({
      x: (e.clientX - dragStart.x) / zoom,
      y: (e.clientY - dragStart.y) / zoom,
    });
  };

  const stopDrag = () => setDragging(false);

  // =========================
  // TRACK DOWNLOAD
  // =========================
  const trackDownload = async () => {
    if (!user) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: user.title,
          fullName: user.fullName,
          churchName: user.churchName,
          magazineCategory: user.magazineCategory,
          numberOfCopies: user.numberOfCopies,
        }),
      });
    } catch {
      // Ignore analytics errors
    }
  };

  const handleDownload = async () => {
    await trackDownload();
    canvasRef.current?.download?.();
  };

  if (!user) return null;

  const hasImage = Boolean(image);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B7A3B] via-[#0F8E46] to-[#0C5AA6] px-6 py-10">
      {/* Header */}
      <div className="mb-10 text-center text-white">
        <h1 className="text-4xl font-bold">
          Create Your Healing Streams Avatar
        </h1>

        <p className="mt-3 text-white/90">
          Upload your photo, adjust it, and download your personalized
          Healing Streams avatar.
        </p>
      </div>

      {/* Upload Card */}
      <div className="mx-auto mb-6 max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-xl bg-[#0B7A3B] px-6 py-3 font-semibold text-white transition hover:bg-[#096431]"
          >
            Choose Image
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />

          <p className="text-sm text-gray-500">
            Supported formats: JPG, PNG and WEBP
          </p>
        </div>
      </div>

      {/* Zoom Control */}
      {hasImage && (
        <div className="mx-auto mb-6 max-w-2xl rounded-3xl bg-white p-5 shadow-lg">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Zoom
          </label>

          <input
            type="range"
            min="0.5"
            max="2"
            step="0.01"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-green-700"
          />
        </div>
      )}

      {/* Canvas */}
      {hasImage && (
        <div
          className="flex justify-center"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          <AvatarCanvas
            ref={canvasRef}
            uploadedImage={image}
            frameImage={frameImage}
            fullName={user.fullName}
            numberOfCopies={user.numberOfCopies}
            config={config}
            zoom={zoom}
            position={position}
          />
        </div>
      )}

      {/* Actions */}
      {hasImage && (
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={handleDownload}
            className="w-full max-w-xs rounded-xl bg-gradient-to-r from-[#0B7A3B] to-[#0C5AA6] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
          >
            Download Avatar
          </button>

          <button
            onClick={() => {
              setImage(null);
              setZoom(1);
              setPosition({ x: 0, y: 0 });
            }}
            className="text-sm text-white underline underline-offset-4 transition hover:text-green-100"
          >
            Change Picture
          </button>
        </div>
      )}
    </div>
  );
}

export default AvatarPage;