import React, { useEffect, useState } from 'react';

const Gallery = ({ title }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!title) return;

    setLoading(true);

    // Step 1: Get image file names
    fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${title}&prop=images`)
      .then(res => res.json())
      .then(async data => {
        const page = Object.values(data.query.pages)[0];
        const imageFiles = page.images?.filter(img =>
          img.title.match(/\.(jpg|jpeg|png|svg)$/i)
        ).slice(0, 10); // cap it to 10 images

        if (!imageFiles?.length) {
          setGalleryImages([]);
          setLoading(false);
          return;
        }

        // Step 2: Fetch actual image URLs
        const urls = await Promise.all(imageFiles.map(async (img) => {
          try {
            const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${img.title}&prop=imageinfo&iiprop=url`);
            const data = await res.json();
            const filePage = Object.values(data.query.pages)[0];
            return filePage?.imageinfo?.[0]?.url || null;
          } catch {
            return null;
          }
        }));

        setGalleryImages(urls.filter(Boolean));
        setLoading(false);
      });
  }, [title]);

  if (!title) return null;

  return (
    <div style={{ marginTop: '2vw' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Gallery of {title}
      </h3>
      {loading ? (
        <p>Loading images… please maintain emotional stability.</p>
      ) : galleryImages.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {galleryImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`${title} ${index + 1}`}
              style={{
                width: '200px',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e)=>{
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow= '0px 4px 20px rgba(0,0, 0,0.3)'
              }}
              onMouseLeave={(e)=>{
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow= 'none'
              }}
            />
          ))}
        </div>
      ) : (
        <p>No images found. Apparently, the Mughal Empire wasn't photogenic.</p>
      )}
    </div>
  );
};

export default Gallery;
