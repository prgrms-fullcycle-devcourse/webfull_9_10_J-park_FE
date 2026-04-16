'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Slider,
} from '@heroui/react';

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // needed if using remote images with CORS
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function cropToBlob(
  imageSrc: string,
  area: Area,
  opts?: {
    mime?: string;
    quality?: number;
    outWidth?: number;
    outHeight?: number;
  },
): Promise<Blob> {
  const {
    mime = 'image/jpeg',
    quality = 0.92,
    outWidth,
    outHeight,
  } = opts || {};
  const img = await loadImage(imageSrc);

  const cropCanvas = document.createElement('canvas');
  cropCanvas.width = Math.max(1, Math.round(area.width));
  cropCanvas.height = Math.max(1, Math.round(area.height));
  const ctx = cropCanvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  ctx.drawImage(
    img,
    Math.max(0, Math.round(area.x)),
    Math.max(0, Math.round(area.y)),
    Math.round(area.width),
    Math.round(area.height),
    0,
    0,
    cropCanvas.width,
    cropCanvas.height,
  );

  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = outWidth || cropCanvas.width;
  finalCanvas.height = outHeight || cropCanvas.height;
  const fctx = finalCanvas.getContext('2d');
  if (!fctx) throw new Error('Canvas 2D context unavailable');
  fctx.imageSmoothingEnabled = true;
  fctx.imageSmoothingQuality = 'high';
  fctx.drawImage(cropCanvas, 0, 0, finalCanvas.width, finalCanvas.height);

  return new Promise<Blob>((resolve, reject) => {
    finalCanvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error('Failed to export image'));
        else resolve(blob);
      },
      mime,
      quality,
    );
  });
}

/** Simple hook to manage ObjectURLs for File inputs */
function useObjectUrl(file?: File | null) {
  const [url, setUrl] = useState<string | undefined>();
  useEffect(() => {
    if (!file) return setUrl(undefined);
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);
  return url;
}

export type BannerCropperModalProps = {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  src?: string;
  file?: File | null;
  aspect?: number;
  outWidth?: number;
  outHeight?: number;
  onConfirm: (blob: Blob, previewUrl: string) => void;
  accept?: string;
  mime?: string;
  initialZoom?: number;
};

/**
 * 다른 개임 프로젝트에서 끓어온 이미지 크롭 모달입니다.
 */

export default function IconCropperModal({
  isOpen,
  onOpenChange,
  src,
  file,
  aspect = 1, // 1:1
  outWidth = 200,
  outHeight = 200,
  onConfirm,
  accept = 'image/*',
  mime = 'image/jpeg',
  initialZoom = 1,
}: BannerCropperModalProps) {
  const fileUrl = useObjectUrl(file || undefined);
  const [localSrc, setLocalSrc] = useState<string | undefined>(src || fileUrl);
  useEffect(() => setLocalSrc(src || fileUrl), [src, fileUrl]);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [areaPixels, setAreaPixels] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onCropComplete = useCallback(
    (_: Area, pixels: Area) => setAreaPixels(pixels),
    [],
  );

  const handleFile = useCallback((f?: File | null) => {
    if (!f) return;
    const u = URL.createObjectURL(f);
    setLocalSrc(u);
    // Reset state for new image
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  }, []);

  const confirm = useCallback(async () => {
    if (!localSrc || !areaPixels) return;
    try {
      setBusy(true);
      const blob = await cropToBlob(localSrc, areaPixels, {
        mime,
        quality: 0.92,
        outWidth,
        outHeight,
      });
      const preview = URL.createObjectURL(blob);
      onConfirm(blob, preview);
    } catch (err) {
      console.error(err);
      alert('이미지를 내보내는 중 오류가 발생했습니다.');
    } finally {
      setBusy(false);
    }
  }, [areaPixels, localSrc, onConfirm, outWidth, outHeight, mime]);

  const handleSliderChange = useCallback((val: number | number[]) => {
    setZoom(Array.isArray(val) ? val[0] : (val as number));
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      hideCloseButton
      onOpenChange={onOpenChange}
      size="sm"
      backdrop="opaque"
      scrollBehavior="outside"
      classNames={{ base: 'rounded-2xl' }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between">
              <div>
                <div className="font-semibold">프로필 이미지</div>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className="relative  min-h-[320px] w-full overflow-hidden rounded-xl bg-neutral-100">
                  {localSrc ? (
                    <Cropper
                      image={localSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={aspect}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                      restrictPosition
                      showGrid={false}
                      objectFit="contain"
                      cropShape="rect"
                      minZoom={1}
                      maxZoom={4}
                      zoomSpeed={0.9}
                      classes={{ containerClassName: '!rounded-xl' }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-sm text-neutral-600">
                      <div
                        className="cursor-pointer rounded-xl border-2 border-dashed border-neutral-300 bg-white/60 p-6"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="font-medium">이미지를 업로드하세요</div>
                        <div className="mt-1 text-xs text-neutral-500">
                          PNG/JPG, 최대 5MB
                        </div>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        className="hidden"
                        onChange={(e) =>
                          handleFile(e.target.files?.[0] || null)
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="rounded-xl border p-4">
                    <div className="mb-2 text-sm font-medium">확대</div>
                    <Slider
                      aria-label="Zoom"
                      minValue={1}
                      maxValue={4}
                      step={0.01}
                      value={zoom}
                      onChange={handleSliderChange}
                      showTooltip
                      getTooltipValue={(v) =>
                        (Array.isArray(v) ? v[0] : v).toFixed(2)
                      }
                    />
                    <div className="mt-2 text-xs text-neutral-500">
                      트랙 드래그 또는 마우스 휠로 확대/축소
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                취소
              </Button>
              <Button
                color="primary"
                className="text-white"
                isDisabled={!localSrc || !areaPixels || busy}
                isLoading={busy}
                onPress={() => {
                  confirm();
                  onClose();
                }}
              >
                저장
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
