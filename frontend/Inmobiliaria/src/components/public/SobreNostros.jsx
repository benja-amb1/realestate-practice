import React from 'react';

export const SobreNostros = () => {
  return (
    <>
      <h2 className='h2-nosotros'>Sobre Nosotros</h2>
      <div className='nosotros-container'>
        {/* Imagen a la izquierda */}
        <img 
          src='https://cdn.pixabay.com/photo/2019/05/24/11/00/interior-4226020_1280.jpg' 
          alt="Imagen de interior" 
        />
        
        {/* Contenedor de texto a la derecha */}
        <div className="text">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt sed lacus nec commodo. Sed consequat facilisis pretium. Aenean venenatis nisl at eros imperdiet, a rutrum enim feugiat. Duis consectetur leo dolor, et eleifend tortor commodo id. Quisque tempor dolor eu quam facilisis, eu efficitur urna rhoncus. Nam eget facilisis quam. Morbi erat lacus, cursus et cursus eget, consequat in nisl. Donec fringilla dolor nec placerat euismod. Aliquam erat volutpat. Cras lectus arcu, imperdiet sed tristique varius, cursus ac dolor. Praesent vestibulum elit in dapibus rhoncus. Praesent nec arcu vitae mi congue vulputate vel at quam. Nulla quis molestie enim. Pellentesque consectetur tellus sit amet viverra dictum. Aenean sollicitudin felis et lectus commodo, et ultricies sapien consequat. Curabitur placerat in nisl ac interdum. </p>
          <p>Nullam tempus ligula vitae elit dignissim dapibus id in ante. Cras laoreet fringilla erat, id pharetra lectus consequat at. Aliquam auctor velit nec auctor rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer porttitor neque in euismod sagittis. Vestibulum interdum, urna sed tempor efficitur, tortor libero fringilla lacus, at volutpat nibh dui id enim. Aliquam lobortis, tellus id pharetra scelerisque, enim sem porta purus, nec dignissim elit ex at libero. Cras volutpat pretium lacus. Donec sem tellus, facilisis ut ipsum quis, dictum eleifend nisl. Aenean tempor quis risus venenatis placerat. Cras et augue enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In hac habitasse platea dictumst. Maecenas vel pharetra enim. </p>
        </div>
      </div>
    </>
  );
}
