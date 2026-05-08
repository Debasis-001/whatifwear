export type ProductCategory = "Men" | "Women" | "Unisex" | "GenZ";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  rating: number;
  description: string;
  colors: string[];
  sizes: string[];
  images: string[];
  isNew?: boolean;
};

export const products: Product[] = [
  {
    id: "obsidian-drift-jacket",
    name: "Obsidian Drift Jacket",
    price: 799,
    category: "Men",
    rating: 4.8,
    description:
      "A heavyweight street shell with clean lines and a sharp city silhouette.",
    colors: ["#0F172A", "#3F3F46", "#14532D"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/products/black-puzzle-1.jpeg",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "red-reson-oversized-tee",
    name: "Oversized Tee",
    price: 799,
    category: "Unisex",
    rating: 4.7,
    description:
      "Soft brushed fabric with minimalist tailoring for elevated daily layering.",
    colors: ["#18181B", "#0A0A0A", "#3B0764"],
    sizes: ["S", "M", "L", "XL"],
    images:[
     "/products/red-reson-6.jpeg",
     "/products/red-reson-2.jpeg",
     "/products/red-reson-4.jpeg",
     "/products/red-reson-1.jpeg",
     "/products/red-reson-5.jpeg",
     "/products/red-reson-3.jpeg",
     "/products/red-reson-7.jpeg",
    ],
  },
  {
    id: "white-relaxed-tee",
    name: "Cyberpunk White Tee",
    price: 799,
    category: "Unisex",
    rating: 4.5,
    description:
      "Premium cotton jersey tee made for a loose fit and all-day movement.",
    colors: ["#111827", "#404040", "#0F766E"],
    sizes: ["S", "M", "L", "XL"],
    images: [
     "/products/white-cyber-2.jpeg",
     "/products/white-cyber-1.jpeg",
     "/products/white-cyber-3.jpeg",
     "/products/white-cyber-4.jpeg",
     "/products/white-cyber-5.jpeg",
     "/products/white-cyber-6.jpeg",
     "/products/white-cyber-7.jpeg",
      
    ],
  },
  {
    id: "neon-stitch-parka",
    name: "Neon Stitch Parka",
    price: 799,
    category: "GenZ",
    rating: 4.9,
    description:
      "Statement outerwear featuring technical detailing and tonal neon accents.",
    colors: ["#09090B", "#1A2E05", "#1E293B"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/products/blue-limit-1.jpeg",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "shadow-cargo-pants",
    name: "Shadow Cargo Pants",
    price: 799,
    category: "Men",
    rating: 4.5,
    description:
      "Tapered cargo build with lightweight structure and durable matte finish.",
    colors: ["#0A0A0A", "#3F3F46", "#374151"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/products/fusion-1.jpeg",
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "luxe-knit-dress",
    name: "Aura Women's Tee",
    price: 799,
    category: "Women",
    rating: 4.8,
    description:
      "Tailored stretch knit dress designed for evening transitions and sharp layering.",
    colors: ["#111827", "#27272A", "#1E1B4B"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/products/pink-women-3.jpeg",
      "/products/pink-women-2.jpeg",
      "/products/pink-women-1.jpeg",
      "/products/pink-women-4.jpeg",
      "/products/pink-women-5.jpeg",
      "/products/pink-women-6.jpeg",
      "/products/pink-women-7.jpeg",
      "/products/pink-women-8.jpeg",
      "/products/pink-women-9.jpeg",


      
      
    ],
  },
  {
    id: "sunflower-oversized-tee",
    name: "Sunflower Oversized Tee",
    price: 799,
    category: "Unisex",
    rating: 4.7,
    description:
      "Modern bomber silhouette with clean seams and soft-insulated interior.",
    colors: ["#111827", "#052E16", "#334155"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/products/sunflower-tee-1.jpeg",
      "/products/sunflower-tee-2.jpeg",
      "/products/sunflower-tee-3.jpeg",
      "/products/sunflower-tee-4.jpeg",
      "/products/sunflower-tee-5.jpeg",
      "/products/sunflower-tee-6.jpeg",
      "/products/sunflower-tee-7.jpeg",
      "/products/sunflower-tee-8.jpeg",
      "/products/sunflower-tee-9.jpeg",
    
    
    ],
  },
  {
    id: "velocity-panel-tee",
    name: "Velocity Panel Tee",
    price: 799,
    category: "GenZ",
    rating: 4.6,
    description:
      "Color-blocked street tee inspired by motion graphics and clubwear energy.",
    colors: ["#09090B", "#064E3B", "#0F172A"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/products/botanical-brown-1.jpeg",
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "midnight-blazer",
    name: "Midnight Tailored Blazer",
    price: 799,
    category: "Women",
    rating: 4.9,
    description:
      "Impeccably tailored blazer with sharp lapels and luxurious Italian wool blend.",
    colors: ["#0F172A", "#1F2937", "#111827"],
    sizes: ["S", "M", "L", "XL"],
    images: [
       "/products/mindspace-brown-1.jpeg",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80",
    ],
    isNew: true,
  },
  {
    id: "silk-wrap-blouse",
    name: "Silk Wrap Blouse",
    price: 799,
    category: "Women",
    rating: 4.8,
    description:
      "Flowing silk blouse with elegant draping and timeless feminine silhouette.",
    colors: ["#FAF8F5", "#D9D2C8", "#1F2937"],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/products/mindset-wine-1.jpeg",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    ],
    isNew: true,
  },
  {
    id: "essential-linen-shirt",
    name: "Essential Linen Shirt",
    price: 4999,
    category: "Unisex",
    rating: 4.7,
    description:
      "Breathable organic linen shirt perfect for warm seasons and relaxed elegance.",
    colors: ["#F3EEE8", "#B8B8A6", "#6E725F"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
    ],
    isNew: true,
  },
  {
    id: "tech-joggers-elite",
    name: "Tech Joggers Elite",
    price: 5299,
    category: "GenZ",
    rating: 4.6,
    description:
      "Performance-meets-style joggers with moisture-wicking fabric and sleek tapered fit.",
    colors: ["#0A0A0A", "#374151", "#1E3A5F"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1480429370612-2a7878e64768?auto=format&fit=crop&w=900&q=80",
    ],
  },
];

export const productById = new Map(products.map((product) => [product.id, product]));

export const categoryTabs: ProductCategory[] = ["Men", "Women", "Unisex", "GenZ"];
