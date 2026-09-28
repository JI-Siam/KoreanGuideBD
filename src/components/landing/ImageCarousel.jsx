import React from 'react';
import Image from 'next/image';

const ImageCarousel = () => {
    return (
        <div className='bg-white'>

            <section className='p-10 bg-white'>
                                       <div className="carousel w-full h-[80vh]">
  <div id="item1" className="carousel-item w-full relative">
    <Image
      src="/var4.jpg"
      alt="Carousel Image 1"
      fill
      className="object-cover rounded-xl" />
  </div>
  <div id="item2" className="carousel-item w-full relative">
    <Image
      src="/var2.jpg"
      alt="Carousel Image 2"
      fill
      className="object-cover rounded-xl" />
  </div>
  <div id="item3" className="carousel-item w-full relative">
    <Image
      src="/var3.jpg"
      alt="Carousel Image 3"
      fill
      className="object-cover rounded-xl" />
  </div>
  <div id="item4" className="carousel-item w-full relative">
    <Image
      src="/var1.jpg"
      alt="Carousel Image 4"
      fill
      className="object-cover rounded-xl" />
  </div>
</div>
<div className="flex w-full justify-center gap-2 py-2">
  <a href="#item1" className="btn btn-xs">1</a>
  <a href="#item2" className="btn btn-xs">2</a>
  <a href="#item3" className="btn btn-xs">3</a>
  <a href="#item4" className="btn btn-xs">4</a>
</div>
            </section>
     
        </div>
    );
};

export default ImageCarousel;