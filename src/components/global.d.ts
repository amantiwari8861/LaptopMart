declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  mrp: number;
  discount: number;
  deliveryDate: string;
};