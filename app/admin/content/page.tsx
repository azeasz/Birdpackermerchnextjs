"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Interface untuk tipe konten
interface Content {
  id: string;
  type: string;
  title: string;
  content: string;
  status: "published" | "draft";
  updatedAt: string;
}

// Data dummy untuk konten
const getMockContents = (): Promise<Content[]> => {
  return Promise.resolve([
    {
      id: "1",
      type: "about",
      title: "Tentang Kami",
      content: "Birdpacker Merch adalah toko merchandise resmi dari komunitas Birdpacker...",
      status: "published",
      updatedAt: "2023-08-15T10:30:00Z"
    },
    {
      id: "2",
      type: "faq",
      title: "FAQ",
      content: "## Pertanyaan yang Sering Diajukan\n\n### Berapa lama pengiriman?...",
      status: "published",
      updatedAt: "2023-09-10T14:20:00Z"
    },
    {
      id: "3",
      type: "terms",
      title: "Syarat dan Ketentuan",
      content: "# Syarat dan Ketentuan\n\nDengan menggunakan layanan kami, Anda menyetujui...",
      status: "published",
      updatedAt: "2023-07-05T09:15:00Z"
    },
    {
      id: "4",
      type: "privacy",
      title: "Kebijakan Privasi",
      content: "# Kebijakan Privasi\n\nKami menghargai privasi pengguna kami...",
      status: "draft",
      updatedAt: "2023-09-25T16:45:00Z"
    },
    {
      id: "5",
      type: "shipping",
      title: "Informasi Pengiriman",
      content: "# Informasi Pengiriman\n\nKami bekerja sama dengan beberapa jasa pengiriman...",
      status: "published",
      updatedAt: "2023-08-20T11:10:00Z"
    }
  ]);
};

export default function AdminContentPage() {
  const router = useRouter();
  const [contents, setContents] = useState<Content[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const fetchContents = async () => {
      try {
        const data = await getMockContents();
        setContents(data);
      } catch (error) {
        console.error("Error fetching contents:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContents();
  }, []);
  
  const filteredContents = contents.filter(content => 
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    content.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };
  
  if (loading || !mounted) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Konten</h1>
        <Button asChild>
          <Link href="/admin/content/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Konten
          </Link>
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Cari konten..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredContents.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">Tidak ada konten ditemukan</h2>
          <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground">
            Kami tidak dapat menemukan konten yang sesuai dengan kueri Anda. Silakan coba pencarian lain.
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terakhir Diperbarui</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell className="font-medium">{content.title}</TableCell>
                  <TableCell className="capitalize">{content.type}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      content.status === "published" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {content.status === "published" ? "Dipublikasi" : "Draf"}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(content.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Buka menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => router.push(`/admin/content/${content.id}`)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
} 