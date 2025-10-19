/**
 * Simple image upscaler using canvas API
 * Scales image 2x and applies sharpening filter
 */
export const upscaleImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Scale 2x
        const scaleFactor = 2;
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;

        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw scaled image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply sharpening filter
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const sharpened = sharpenImage(imageData);
        ctx.putImageData(sharpened, 0, 0);

        // Convert to base64
        resolve(canvas.toDataURL('image/jpeg', 0.95));
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

// Simple sharpening filter
const sharpenImage = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  const w = imageData.width;
  const h = imageData.height;
  const output = new ImageData(w, h);
  
  // Sharpening kernel
  const kernel = [
    0, -1, 0,
    -1, 5, -1,
    0, -1, 0
  ];

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * w + (x + kx)) * 4 + c;
            const kernelIdx = (ky + 1) * 3 + (kx + 1);
            sum += data[idx] * kernel[kernelIdx];
          }
        }
        const idx = (y * w + x) * 4 + c;
        output.data[idx] = Math.max(0, Math.min(255, sum));
      }
      output.data[(y * w + x) * 4 + 3] = 255; // Alpha
    }
  }

  return output;
};
