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
type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};
type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  mrp: number;
  discount: number;
  deliveryDate: string;
  rating?: number;
};

type Sentiment = "Positive" | "Negative" | "Neutral";

type Review = {
  id: number;
  title: string;
  date: string;
  rating: number;
  comment: string;
  sentiment: Sentiment;
};