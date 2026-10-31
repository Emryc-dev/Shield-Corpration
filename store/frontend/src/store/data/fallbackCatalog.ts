import type { Category, Product } from "../types";

export const fallbackCategories: Category[] = [
  {
    id: "cat-smartphones",
    name: "Smartphones",
    slug: "smartphones",
    description: "Téléphones récents pour rester connecté, travailler et communiquer simplement.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cat-computers",
    name: "Ordinateurs",
    slug: "ordinateurs",
    description: "Ordinateurs portables et équipements informatiques pour vos usages professionnels.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cat-audio",
    name: "Audio",
    slug: "audio",
    description: "Casques, écouteurs et enceintes pour le travail, les appels et le divertissement.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cat-accessories",
    name: "Accessoires",
    slug: "accessoires",
    description: "Chargeurs, câbles, stockage et accessoires utiles au quotidien.",
    image: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cat-mobility",
    name: "Mobilité",
    slug: "mobilite",
    description: "Power banks, montres connectées et accessoires pour vos déplacements.",
    image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cat-connectivity",
    name: "Connectivité",
    slug: "connectivite",
    description: "Solutions simples pour connecter vos appareils et améliorer votre environnement numérique.",
    image: "https://images.unsplash.com/photo-1600267165477-6d4cc741b379?auto=format&fit=crop&w=900&q=80",
  },
];

const categoryBySlug = Object.fromEntries(fallbackCategories.map((category) => [category.slug, category]));

export const fallbackProducts: Product[] = [
  {
    id: "prod-smartphone-pro",
    name: "Smartphone Pro Series",
    slug: "smartphone-pro-series",
    brand: "The Shield Store",
    category: categoryBySlug.smartphones,
    shortDescription: "Un smartphone polyvalent pour les usages quotidiens et professionnels.",
    description: "Produit sélectionné pour illustrer le catalogue avec des informations de démonstration.",
    availability: "limited",
    images: [
      {
        id: "img-smartphone-pro",
        url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
        alt: "Smartphone moderne posé sur un fond clair",
      },
    ],
    features: [
      { name: "Usage", value: "Mobilité" },
      { name: "Type", value: "Smartphone" },
    ],
    isFeatured: true,
    isPopular: true,
    relatedProductSlugs: ["ecouteurs-true-wireless", "power-bank-compact"],
  },
  {
    id: "prod-headset-studio",
    name: "Casque Audio Studio",
    slug: "casque-audio-studio",
    brand: "The Shield Store",
    category: categoryBySlug.audio,
    shortDescription: "Casque confortable pour appels, concentration et écoute prolongée.",
    description: "Produit sélectionné pour illustrer le catalogue avec des informations de démonstration.",
    availability: "in_stock",
    images: [
      {
        id: "img-headset-studio",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
        alt: "Casque audio noir présenté sur une surface claire",
      },
    ],
    features: [
      { name: "Usage", value: "Audio" },
      { name: "Type", value: "Casque" },
    ],
    isFeatured: true,
    isNew: true,
    relatedProductSlugs: ["ecouteurs-true-wireless", "mini-enceinte-bluetooth"],
  },
  {
    id: "prod-earbuds",
    name: "Écouteurs True Wireless",
    slug: "ecouteurs-true-wireless",
    brand: "The Shield Store",
    category: categoryBySlug.audio,
    shortDescription: "Écouteurs compacts pour appels, déplacements et écoute mobile.",
    description: "Produit sélectionné pour illustrer le catalogue avec des informations de démonstration.",
    availability: "in_stock",
    images: [
      {
        id: "img-earbuds",
        url: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80",
        alt: "Écouteurs sans fil dans leur boîtier",
      },
    ],
    features: [
      { name: "Usage", value: "Mobilité" },
      { name: "Type", value: "Écouteurs" },
    ],
    isFeatured: true,
    isPopular: true,
    relatedProductSlugs: ["casque-audio-studio", "smartphone-pro-series"],
  },
  {
    id: "prod-speaker",
    name: "Mini Enceinte Bluetooth",
    slug: "mini-enceinte-bluetooth",
    brand: "The Shield Store",
    category: categoryBySlug.audio,
    shortDescription: "Une enceinte compacte pour bureau, maison ou déplacements.",
    description: "Produit sélectionné pour illustrer le catalogue avec des informations de démonstration.",
    availability: "preorder",
    images: [
      {
        id: "img-speaker",
        url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80",
        alt: "Enceinte Bluetooth compacte sur une table",
      },
    ],
    features: [
      { name: "Usage", value: "Audio" },
      { name: "Type", value: "Enceinte" },
    ],
    isFeatured: true,
    isNew: true,
    relatedProductSlugs: ["casque-audio-studio", "ecouteurs-true-wireless"],
  },
  {
    id: "prod-laptop",
    name: "Laptop Business",
    slug: "laptop-business",
    brand: "The Shield Store",
    category: categoryBySlug.ordinateurs,
    shortDescription: "Ordinateur portable adapté au travail, aux études et à la productivité.",
    description: "Produit sélectionné pour illustrer le catalogue avec des informations de démonstration.",
    availability: "limited",
    images: [
      {
        id: "img-laptop",
        url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
        alt: "Ordinateur portable ouvert sur un bureau",
      },
    ],
    features: [
      { name: "Usage", value: "Productivité" },
      { name: "Type", value: "Ordinateur" },
    ],
    isPopular: true,
    relatedProductSlugs: ["webcam-hd", "stockage-externe-ssd"],
  },
  {
    id: "prod-power-bank",
    name: "Power Bank Compact",
    slug: "power-bank-compact",
    brand: "The Shield Store",
    category: categoryBySlug.mobilite,
    shortDescription: "Batterie externe compacte pour garder vos appareils chargés.",
    description: "Produit sélectionné pour illustrer le catalogue avec des informations de démonstration.",
    availability: "in_stock",
    images: [
      {
        id: "img-power-bank",
        url: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80",
        alt: "Batterie externe compacte avec câble de charge",
      },
    ],
    features: [
      { name: "Usage", value: "Recharge" },
      { name: "Type", value: "Power bank" },
    ],
    isNew: true,
    relatedProductSlugs: ["smartphone-pro-series", "cable-usb-c-renforce"],
  },
  {
    id: "prod-cable",
    name: "Câble USB-C Renforcé",
    slug: "cable-usb-c-renforce",
    brand: "The Shield Store",
    category: categoryBySlug.accessoires,
    shortDescription: "Câble robuste pour recharge et transfert de données.",
    description: "Produit sélectionné pour illustrer le catalogue avec des informations de démonstration.",
    availability: "in_stock",
    images: [
      {
        id: "img-cable",
        url: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?auto=format&fit=crop&w=900&q=80",
        alt: "Câbles et accessoires électroniques organisés",
      },
    ],
    features: [
      { name: "Usage", value: "Accessoire" },
      { name: "Type", value: "Câble" },
    ],
    relatedProductSlugs: ["power-bank-compact", "smartphone-pro-series"],
  },
  {
    id: "prod-webcam",
    name: "Webcam HD",
    slug: "webcam-hd",
    brand: "The Shield Store",
    category: categoryBySlug.connectivite,
    shortDescription: "Webcam pour réunions, support client et collaboration à distance.",
    description: "Produit sélectionné pour illustrer le catalogue avec des informations de démonstration.",
    availability: "out_of_stock",
    images: [
      {
        id: "img-webcam",
        url: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=900&q=80",
        alt: "Webcam fixée sur un écran d'ordinateur",
      },
    ],
    features: [
      { name: "Usage", value: "Collaboration" },
      { name: "Type", value: "Webcam" },
    ],
    relatedProductSlugs: ["laptop-business", "stockage-externe-ssd"],
  },
  {
    id: "prod-ssd",
    name: "Stockage Externe SSD",
    slug: "stockage-externe-ssd",
    brand: "The Shield Store",
    category: categoryBySlug.accessoires,
    shortDescription: "Stockage portable pour sauvegardes, documents et projets.",
    description: "Produit sélectionné pour illustrer le catalogue avec des informations de démonstration.",
    availability: "limited",
    images: [
      {
        id: "img-ssd",
        url: "https://images.unsplash.com/photo-1597138804456-e7dca7f59d21?auto=format&fit=crop&w=900&q=80",
        alt: "Disque externe compact sur un bureau",
      },
    ],
    features: [
      { name: "Usage", value: "Stockage" },
      { name: "Type", value: "SSD externe" },
    ],
    isPopular: true,
    relatedProductSlugs: ["laptop-business", "cable-usb-c-renforce"],
  },
];

export const fallbackFeaturedProducts = fallbackProducts.filter((product) => product.isFeatured).slice(0, 4);
