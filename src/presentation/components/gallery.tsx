import { Giphy } from "@/domain/models/Giphy";
import { memo, useRef } from "react";
import { Dialog, DialogRef } from "./dialog";

interface GalleryProps {
  thumbnails: Giphy[];
}
interface ThumbnailProps {
  thumbnail: Giphy;
  onClickThumbnail(): void;
}

const MemoizedThumbnail = memo(
  ({ thumbnail, onClickThumbnail }: ThumbnailProps) => {
    return (
      <li onClick={() => onClickThumbnail()} role="button">
        <img
          loading="lazy"
          className=" bg-green-400/60 aspect-video w-full h-48 object-cover rounded-s-sm rounded-e-3xl"
          src={thumbnail.url.previewQuality}
          alt="giphy image"
        />
      </li>
    );
  }
);

export function Gallery({ thumbnails }: GalleryProps) {
  const dialogRef = useRef<DialogRef>(null);

  const handleClickThumbnail = (thumbnailIndex: number) => {
    dialogRef.current?.openModal(thumbnailIndex);
  };

  return (
    <ul className="grid grid-cols-gallery gap-3">
      {thumbnails.map((thumbnail, index) => (
        <MemoizedThumbnail
          onClickThumbnail={() => handleClickThumbnail(index)}
          key={thumbnail.id}
          thumbnail={thumbnail}
        />
      ))}

      <Dialog thumbnails={thumbnails} ref={dialogRef} />
    </ul>
  );
}
