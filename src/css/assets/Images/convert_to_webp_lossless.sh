#!/bin/bash

# Loop through all JPG and PNG files in the current directory
for image in *.jpg *.png; do
    # Get the filename without the extension
    filename=$(basename "$image" .${image##*.})

    # Create webp_images directory if it doesn't exist
    mkdir -p webp_images

    # Use lossless conversion for all images
    cwebp -lossless "$image" -o "webp_images/$filename".webp

    echo "Converted: $image to webp_images/$filename.webp (lossless)"
done

echo "Batch conversion complete (lossless)."