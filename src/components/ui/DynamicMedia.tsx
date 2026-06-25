import Image, { ImageProps } from 'next/image';

interface DynamicMediaProps extends Omit<ImageProps, 'src' | 'alt'> {
  media: any;
  alt: string;
  videoClassName?: string;
}

export const DynamicMedia = ({ media, alt, videoClassName, className, ...props }: DynamicMediaProps) => {
  if (!media) return null;

  const isVideo = media?.type === 'video';
  const src = media?.url || (typeof media === 'string' ? media : '');

  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={videoClassName || className || "object-cover w-full h-full"}
      />
    );
  }

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      {...props}
    />
  );
};
