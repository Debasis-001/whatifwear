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
};

export const products: Product[] = [
  {
    id: "obsidian-drift-jacket",
    name: "Obsidian Drift Jacket",
    price: 7999,
    category: "Men",
    rating: 4.8,
    description:
      "A heavyweight street shell with clean lines and a sharp city silhouette.",
    colors: ["#0F172A", "#3F3F46", "#14532D"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "noir-crop-hoodie",
    name: "Noir Crop Hoodie",
    price: 5499,
    category: "Women",
    rating: 4.7,
    description:
      "Soft brushed fabric with minimalist tailoring for elevated daily layering.",
    colors: ["#18181B", "#0A0A0A", "#3B0764"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "graphite-relaxed-tee",
    name: "Graphite Relaxed Tee",
    price: 2499,
    category: "Unisex",
    rating: 4.6,
    description:
      "Premium cotton jersey tee made for a loose fit and all-day movement.",
    colors: ["#111827", "#404040", "#0F766E"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1503341338985-b35f44f7f5e3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "neon-stitch-parka",
    name: "Neon Stitch Parka",
    price: 9999,
    category: "GenZ",
    rating: 4.9,
    description:
      "Statement outerwear featuring technical detailing and tonal neon accents.",
    colors: ["#09090B", "#1A2E05", "#1E293B"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "shadow-cargo-pants",
    name: "Shadow Cargo Pants",
    price: 4299,
    category: "Men",
    rating: 4.5,
    description:
      "Tapered cargo build with lightweight structure and durable matte finish.",
    colors: ["#0A0A0A", "#3F3F46", "#374151"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "luxe-knit-dress",
    name: "Luxe Knit Dress",
    price: 6399,
    category: "Women",
    rating: 4.8,
    description:
      "Tailored stretch knit dress designed for evening transitions and sharp layering.",
    colors: ["#111827", "#27272A", "#1E1B4B"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "utility-bomber",
    name: "Utility Bomber",
    price: 7299,
    category: "Unisex",
    rating: 4.7,
    description:
      "Modern bomber silhouette with clean seams and soft-insulated interior.",
    colors: ["#111827", "#052E16", "#334155"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    id: "velocity-panel-tee",
    name: "Velocity Panel Tee",
    price: 2899,
    category: "GenZ",
    rating: 4.6,
    description:
      "Color-blocked street tee inspired by motion graphics and clubwear energy.",
    colors: ["#09090B", "#064E3B", "#0F172A"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
    ],
  },
];

export const productById = new Map(products.map((product) => [product.id, product]));

export const categoryTabs: ProductCategory[] = ["Men", "Women", "Unisex", "GenZ"];
