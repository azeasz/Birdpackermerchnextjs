"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft } from "lucide-react"
import ProductForm from "@/components/admin/product-form"
import type { Product } from "@/lib/types"

// Mock data untuk produk
const getMockProduct = (id: string): Promise<Product | null> => {
  // Simulasi delay network
  return new Promise((resolve) => {
    setTimeout(() => {
      // Data produk contoh berdasarkan ID
      const products: Record<string, Product> = {
        "1": {
          id: "1",
          name: "Birdpacker T-Shirt",
          description: "Kaos keren dengan logo Birdpacker",
          price: 150000,
          image: "/images/tshirt.jpg",
          categoryId: "1",
          rating: 4.5,
          reviewCount: 12,
          inStock: true,
          isNew: true,
          discount: 0,
          features: ["100% Katun", "Logo bordir", "Ukuran S-XXL"],
          specifications: {
            "Material": "Katun",
            "Ukuran": "S, M, L, XL, XXL",
            "Berat": "200g"
          },
          createdAt: new Date().toISOString(),
          category: {
            id: "1",
            name: "Pakaian",
            description: "Berbagai jenis pakaian Birdpacker",
            image: "/images/categories/clothing.jpg"
          }
        },
        "2": {
          id: "2",
          name: "Birdpacker Hoodie",
          description: "Hoodie nyaman dengan logo Birdpacker",
          price: 350000,
          image: "/images/hoodie.jpg",
          categoryId: "1",
          rating: 4.8,
          reviewCount: 8,
          inStock: true,
          isNew: false,
          discount: 5,
          features: ["Bahan tebal", "Kantong depan", "Hoodie adjustable"],
          specifications: {
            "Material": "Katun tebal",
            "Ukuran": "M, L, XL",
            "Berat": "450g"
          },
          createdAt: new Date().toISOString(),
          category: {
            id: "1",
            name: "Pakaian",
            description: "Berbagai jenis pakaian Birdpacker",
            image: "/images/categories/clothing.jpg"
          }
        }
      };
      
      if (products[id]) {
        resolve(products[id]);
      } else {
        resolve(null);
      }
    }, 1000);
  });
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const fetchProduct = async () => {
      try {
        const data = await getMockProduct(productId);
        if (!data) {
          router.push('/404');
          return;
        }
        setProduct(data);
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data produk");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, router]);

  if (loading || !mounted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Memuat data produk...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => router.push('/admin/products')}>
          Kembali ke Daftar Produk
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/admin/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Produk</h1>
        <p className="text-muted-foreground">
          Edit informasi produk yang sudah ada.
        </p>
      </div>
      
      {product && <ProductForm product={product} />}
    </div>
  );
} 