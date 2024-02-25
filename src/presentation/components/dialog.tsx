import { Giphy } from "@/domain/models/Giphy";
import React, { useImperativeHandle, useRef, useState } from "react";
interface Props {
  thumbnails: Giphy[];
}

export type DialogRef = {
  openModal: (index: number) => void;
};

export const Dialog = React.forwardRef<DialogRef, Props>(
  ({ thumbnails }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0);
    const [imageIsLoading, setImageIsLoading] = useState(true);
    const dialogImageSrc = thumbnails[selectedThumbnailIndex].url.maxQuality;

    const isLastItem = selectedThumbnailIndex + 1 >= thumbnails.length;
    const isFirstItem = selectedThumbnailIndex <= 0;

    const handleCloseModal = () => {
      dialogRef.current?.close();
    };

    const loadNextImage = () => {
      setImageIsLoading(true);
      setSelectedThumbnailIndex((state) => state + 1);
    };

    const loadPreviousImage = () => {
      setImageIsLoading(true);
      setSelectedThumbnailIndex((state) => state - 1);
    };

    useImperativeHandle(ref, () => ({
      openModal: (selectedIndex: number) => {
        setImageIsLoading(true);
        setSelectedThumbnailIndex(selectedIndex);
        dialogRef.current?.showModal();
      },
    }));

    return (
      <dialog ref={dialogRef} className=" backdrop:bg-slate-900/85">
        <div
          onClick={handleCloseModal}
          className="fixed -z-10 bg-transparent inset-0 "
        ></div>
        <div className="relative bg-red-400 size-96">
          <img
            className="size-96 object-cover aspect-video invisible:hidden"
            onLoad={() => setImageIsLoading(false)}
            loading="eager"
            hidden={imageIsLoading}
            src={dialogImageSrc}
            alt="thumbnail"
          />

          <div
            hidden={!imageIsLoading}
            className="position absolute inset-0 animate-pulse bg-green-400/60 size-96"
          />
        </div>
        <div className="flex flex-wrap justify-between gap-3 bg-yellow-400 font-semibold">
          <button
            disabled={isFirstItem}
            type="button"
            className="p-3 flex-1 rounded-tr-none bg-violet-400 hover:bg-violet-500 disabled:bg-slate-400 disabled:hover:bg-slate-400"
            onClick={loadPreviousImage}
          >
            Previous
          </button>
          <button
            disabled={isLastItem}
            type="button"
            className="p-3 flex-1 bg-violet-400 hover:bg-violet-500 disabled:bg-slate-400 disabled:hover:bg-slate-400"
            onClick={loadNextImage}
          >
            Next
          </button>
        </div>
        <button
          className="absolute size-content flex align-center justify-center right-0 top-0 p-3 text-lg bg-violet-400 hover:bg-violet-500"
          type="button"
          onClick={handleCloseModal}
        >
          <span className="text-slate-900">close</span>
        </button>
      </dialog>
    );
  }
);
