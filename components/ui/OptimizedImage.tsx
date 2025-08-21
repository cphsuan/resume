'use client'

import { useState } from 'react'

import Image, { ImageProps } from 'next/image'

import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  fallback?: string
  aspectRatio?: '1:1' | '4:3' | '16:9' | '21:9' | 'auto'
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  lazy?: boolean
  blur?: boolean
  fadeIn?: boolean
}

const aspectRatioClasses = {
  '1:1': 'aspect-square',
  '4:3': 'aspect-[4/3]',
  '16:9': 'aspect-video',
  '21:9': 'aspect-[21/9]',
  auto: '',
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  fallback = '/images/placeholder.jpg',
  aspectRatio = 'auto',
  objectFit = 'cover',
  lazy = true,
  blur = true,
  fadeIn = true,
  priority = false,
  quality = 85,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    if (fallback && imageSrc !== fallback) {
      setImageSrc(fallback)
    }
  }

  const objectFitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  }

  return (
    <div className={cn('relative overflow-hidden', aspectRatioClasses[aspectRatio], className)}>
      {/* Loading skeleton */}
      {isLoading && fadeIn && (
        <div className="bg-muted absolute inset-0 animate-pulse" aria-hidden="true">
          <div className="h-full w-full bg-gradient-to-br from-transparent via-white/10 to-transparent" />
        </div>
      )}

      {/* Main image */}
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          objectFitClasses[objectFit],
          fadeIn && 'transition-opacity duration-500',
          isLoading && fadeIn ? 'opacity-0' : 'opacity-100',
          'h-full w-full'
        )}
        loading={lazy && !priority ? 'lazy' : undefined}
        priority={priority}
        quality={quality}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        {...(blur && typeof src === 'string' && { placeholder: 'blur', blurDataURL: generateBlurDataURL() })}
        {...props}
      />

      {/* Error state */}
      {hasError && imageSrc === fallback && (
        <div className="bg-muted absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="text-muted-foreground mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <p className="text-muted-foreground mt-2 text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Generate a simple blur data URL for placeholder
function generateBlurDataURL(): string {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null
  if (!canvas) return ''

  canvas.width = 10
  canvas.height = 10
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // Create a simple gradient
  const gradient = ctx.createLinearGradient(0, 0, 10, 10)
  gradient.addColorStop(0, '#f3f4f6')
  gradient.addColorStop(1, '#e5e7eb')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 10, 10)

  return canvas.toDataURL()
}

// Responsive image component with art direction
export function ResponsiveImage({
  desktop,
  tablet,
  mobile,
  alt,
  className,
  ...props
}: {
  desktop: string
  tablet?: string
  mobile?: string
  alt: string
  className?: string
} & Omit<OptimizedImageProps, 'src' | 'alt'>) {
  return (
    <picture className={className}>
      {desktop && <source media="(min-width: 1024px)" srcSet={desktop} />}
      {tablet && <source media="(min-width: 768px)" srcSet={tablet} />}
      {mobile && <source media="(max-width: 767px)" srcSet={mobile} />}
      <OptimizedImage src={desktop} alt={alt} {...props} />
    </picture>
  )
}

// Avatar component using optimized image
export function Avatar({
  src,
  alt,
  size = 'md',
  className,
  ...props
}: {
  src: string
  alt: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
} & Omit<OptimizedImageProps, 'src' | 'alt' | 'width' | 'height'>) {
  const sizeConfig = {
    xs: { width: 24, height: 24, className: 'h-6 w-6' },
    sm: { width: 32, height: 32, className: 'h-8 w-8' },
    md: { width: 40, height: 40, className: 'h-10 w-10' },
    lg: { width: 48, height: 48, className: 'h-12 w-12' },
    xl: { width: 64, height: 64, className: 'h-16 w-16' },
  }

  const config = sizeConfig[size]

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={config.width}
      height={config.height}
      className={cn('rounded-full', config.className, className)}
      aspectRatio="1:1"
      {...props}
    />
  )
}
