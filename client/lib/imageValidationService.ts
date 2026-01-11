/**
 * Image Validation Service
 * 
 * Validates images for NSFW content BEFORE uploading to storage.
 * All image uploads must pass this validation first.
 * 
 * This service:
 * - Calls /api/nsfw-check endpoint
 * - Handles validation errors gracefully
 * - Provides user-friendly error messages
 * - Logs validation results
 */

export interface ImageValidationResult {
  approved: boolean;
  category?: 'safe' | 'nsfw' | 'uncertain';
  confidence?: number;
  error?: string;
  code?: string;
}

/**
 * Validate image for NSFW content
 * 
 * @param file - Image file to validate
 * @returns Validation result
 */
export async function validateImage(
  file: File,
): Promise<ImageValidationResult> {
  try {
    // Validate file is an image
    if (!file.type.startsWith('image/')) {
      return {
        approved: false,
        error: 'File must be an image',
        code: 'INVALID_FILE_TYPE',
      };
    }

    // Validate file size (50MB limit)
    const MAX_FILE_SIZE_MB = 50;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return {
        approved: false,
        error: `File size exceeds ${MAX_FILE_SIZE_MB}MB limit`,
        code: 'FILE_TOO_LARGE',
      };
    }

    // Create form data
    const formData = new FormData();
    formData.append('file', file);

    console.log('[ImageValidation] Validating image:', file.name);

    // Send to NSFW check endpoint
    const response = await fetch('/api/nsfw-check', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      console.warn('[ImageValidation] Image validation failed:', {
        status: response.status,
        code: errorData.code,
        error: errorData.error,
      });

      // Handle rate limiting
      if (response.status === 429) {
        return {
          approved: false,
          error: 'Too many validation requests. Please try again in a moment.',
          code: 'RATE_LIMIT_EXCEEDED',
        };
      }

      // Handle NSFW content detected
      if (response.status === 403) {
        console.warn('[ImageValidation] NSFW content detected:', {
          fileName: file.name,
          category: errorData.details?.category,
          confidence: errorData.details?.confidence,
        });

        return {
          approved: false,
          error: 'Image contains prohibited content and cannot be uploaded',
          code: 'NSFW_CONTENT_DETECTED',
          category: errorData.details?.category || 'nsfw',
        };
      }

      // Handle other errors
      return {
        approved: false,
        error:
          errorData.error ||
          'Image validation failed. Please try again or contact support.',
        code: errorData.code || 'VALIDATION_ERROR',
      };
    }

    // Parse successful response
    const result = await response.json();

    console.log('[ImageValidation] Image approved:', {
      fileName: file.name,
      category: result.category,
      confidence: result.confidence,
    });

    return {
      approved: true,
      category: result.category,
      confidence: result.confidence,
    };
  } catch (error) {
    console.error('[ImageValidation] Network error:', error);

    // FAIL-SAFE: Reject on network errors
    return {
      approved: false,
      error:
        'Network error during image validation. Please check your connection and try again.',
      code: 'NETWORK_ERROR',
    };
  }
}

/**
 * Validate multiple images
 */
export async function validateImages(
  files: File[],
): Promise<Map<File, ImageValidationResult>> {
  const results = new Map<File, ImageValidationResult>();

  for (const file of files) {
    const result = await validateImage(file);
    results.set(file, result);

    // Stop validation on first critical error
    if (result.code === 'NETWORK_ERROR' || result.code === 'RATE_LIMIT_EXCEEDED') {
      break;
    }
  }

  return results;
}

/**
 * Get user-friendly error message
 */
export function getValidationErrorMessage(result: ImageValidationResult): string {
  if (result.approved) {
    return '';
  }

  switch (result.code) {
    case 'INVALID_FILE_TYPE':
      return 'Please upload an image file (PNG, JPG, WebP, GIF)';

    case 'FILE_TOO_LARGE':
      return result.error || 'File size is too large';

    case 'NSFW_CONTENT_DETECTED':
      return 'This image contains prohibited content. Please select a different image.';

    case 'RATE_LIMIT_EXCEEDED':
      return 'Too many uploads. Please wait a moment and try again.';

    case 'NETWORK_ERROR':
      return 'Network connection error. Please check your internet and try again.';

    case 'VALIDATION_ERROR':
      return 'Image validation failed. Please try again or contact support.';

    default:
      return result.error || 'Image validation failed. Please try again.';
  }
}
