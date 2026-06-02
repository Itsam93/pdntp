import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AvatarCanvas from "../components/AvatarCanvas";
import { avatarFrames } from "../config/avatarFrames";
import { avatarAssets } from "../config/avatarAssets";

function AvatarPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const config = useMemo(() => avatarFrames[type] || null, [type]);
  const frameImage = useMemo(() => avatarAssets[type]?.frame || null, [type]);

  // =========================
  // LOAD USER
  // =========================
  useEffect(() => {
    const stored = localStorage.getItem("avatarUser");

    if (!stored || !config || !frameImage) {
      navigate("/");
      return;
    }

    setUser(JSON.parse(stored));
  }, [config, frameImage, navigate]);

  // =========================
  // NORMALIZE TEXT
  // =========================
  const fullName = user?.fullName?.toUpperCase() || "";
  const title = user?.title?.toUpperCase() || "";

  // =========================
  // IMAGE UPLOAD
  // =========================
  const handleUpload = (file) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
      const baseSize = 1536;

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: user.fullName,
          title: user.title,
          zone: user.zone,
          region: user.region,
          type,
        }),
      });
    } catch {}
  };

  const handleDownload = async () => {
    await trackDownload();
    canvasRef.current?.download?.();
  };

  if (!config || !frameImage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1c120c] text-white">
        Invalid avatar configuration
      </div>
    );
  }

  if (!user) return null;

  const hasImage = Boolean(image);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c120c] via-[#2b1b12] to-[#3a2418] px-6 py-10">

      {/* HEADER */}
      <div className="text-center mb-10 text-white">
        <h1 className="text-3xl font-bold">
          Create Your {type === "pastor" ? "Pastor" : "Deacon"} Avatar
        </h1>

        <p className="text-white/60 mt-2">
          Upload, adjust, and download your official avatar
        </p>
      </div>

      {/* UPLOAD CARD */}
      <div className="mb-6 max-w-2xl mx-auto rounded-2xl bg-[#f7f1ec] p-6 shadow-xl">

        <div className="flex flex-col items-center gap-4">

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 rounded-xl bg-[#3a2418] text-white font-medium
              hover:bg-[#4a2f1f] transition"
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
            Supported: JPG, PNG, WEBP
          </p>

        </div>
      </div>

      {/* CONTROLS */}
      {hasImage && (
        <div className="mb-6 max-w-2xl mx-auto rounded-2xl bg-[#f7f1ec] p-4 shadow-md">

          <label className="text-sm text-gray-700 block mb-2">
            Zoom
          </label>

          <input
            type="range"
            min="0.5"
            max="2"
            step="0.01"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />

        </div>
      )}

      {/* CANVAS */}
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
            title={title}
            fullName={fullName}
            config={config}
            zoom={zoom}
            position={position}
          />
        </div>
      )}

      {/* ACTIONS */}
      {hasImage && (
        <div className="mt-10 flex flex-col items-center gap-4">

          <button
            onClick={handleDownload}
            className="w-full max-w-xs px-6 py-3 rounded-xl
              bg-gradient-to-r from-[#3a2418] to-[#5a3a25]
              text-white font-semibold shadow-lg
              hover:scale-[1.02] hover:shadow-xl
              active:scale-95 transition-all"
          >
            Download Avatar
          </button>

          <button
            onClick={() => {
              setImage(null);
              setZoom(1);
              setPosition({ x: 0, y: 0 });
            }}
            className="text-sm text-white/70 underline underline-offset-4
              hover:text-white transition"
          >
            Change Picture
          </button>

        </div>
      )}

    </div>
  );
}

export default AvatarPage;