"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ShoppingCart, Truck, CreditCard, Package, RefreshCw } from "lucide-react"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqCategories = [
    {
      id: "orders",
      label: "Pemesanan",
      icon: <ShoppingCart className="h-4 w-4 mr-2" />,
      questions: [
        {
          question: "Bagaimana cara melakukan pemesanan?",
          answer:
            "Untuk melakukan pemesanan, pilih produk yang Anda inginkan, tambahkan ke keranjang, dan ikuti proses checkout. Anda dapat membayar menggunakan berbagai metode pembayaran yang tersedia.",
        },
        {
          question: "Bisakah saya mengubah pesanan saya setelah dikonfirmasi?",
          answer:
            "Anda dapat mengubah pesanan dalam waktu 1 jam setelah pemesanan. Setelah itu, silakan hubungi layanan pelanggan kami untuk bantuan lebih lanjut.",
        },
        {
          question: "Bagaimana cara membatalkan pesanan?",
          answer:
            "Untuk membatalkan pesanan, masuk ke akun Anda, buka halaman 'Pesanan Saya', pilih pesanan yang ingin dibatalkan, dan klik tombol 'Batalkan Pesanan'. Pembatalan hanya dapat dilakukan sebelum pesanan dikirim.",
        },
        {
          question: "Apakah saya akan menerima konfirmasi pesanan?",
          answer:
            "Ya, Anda akan menerima email konfirmasi segera setelah pesanan berhasil dibuat. Email ini berisi ringkasan pesanan dan nomor pelacakan.",
        },
      ],
    },
    {
      id: "shipping",
      label: "Pengiriman",
      icon: <Truck className="h-4 w-4 mr-2" />,
      questions: [
        {
          question: "Berapa lama waktu pengiriman?",
          answer:
            "Waktu pengiriman bervariasi tergantung lokasi Anda. Pengiriman standar biasanya membutuhkan waktu 3-5 hari kerja, sementara pengiriman ekspres membutuhkan 1-2 hari kerja.",
        },
        {
          question: "Apakah ada biaya pengiriman?",
          answer:
            "Biaya pengiriman dihitung berdasarkan berat, ukuran, dan tujuan pengiriman. Kami menawarkan pengiriman gratis untuk pembelian di atas $50.",
        },
        {
          question: "Bagaimana cara melacak pesanan saya?",
          answer:
            "Anda dapat melacak pesanan dengan masuk ke akun Anda dan mengunjungi halaman 'Pesanan Saya'. Anda juga akan menerima email dengan nomor pelacakan setelah pesanan dikirim.",
        },
        {
          question: "Apakah Anda mengirim ke luar negeri?",
          answer:
            "Ya, kami mengirim ke banyak negara di seluruh dunia. Biaya pengiriman dan waktu pengiriman internasional bervariasi tergantung negara tujuan.",
        },
      ],
    },
    {
      id: "payment",
      label: "Pembayaran",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      questions: [
        {
          question: "Metode pembayaran apa yang diterima?",
          answer:
            "Kami menerima berbagai metode pembayaran termasuk kartu kredit/debit (Visa, Mastercard, American Express), PayPal, transfer bank, dan pembayaran melalui dompet digital.",
        },
        {
          question: "Apakah pembayaran saya aman?",
          answer:
            "Ya, semua transaksi pembayaran diproses melalui gateway pembayaran yang aman dengan enkripsi SSL. Kami tidak menyimpan informasi kartu kredit Anda.",
        },
        {
          question: "Kapan kartu kredit saya akan ditagih?",
          answer:
            "Kartu kredit Anda akan ditagih segera setelah pesanan dikonfirmasi. Jika pesanan tidak dapat dipenuhi, pembayaran akan dikembalikan sepenuhnya.",
        },
        {
          question: "Bisakah saya membayar dengan cicilan?",
          answer:
            "Ya, kami menawarkan opsi pembayaran cicilan untuk pembelian di atas nilai tertentu. Silakan pilih opsi ini saat checkout untuk melihat persyaratan dan ketentuan yang berlaku.",
        },
      ],
    },
    {
      id: "returns",
      label: "Pengembalian",
      icon: <RefreshCw className="h-4 w-4 mr-2" />,
      questions: [
        {
          question: "Bagaimana kebijakan pengembalian Anda?",
          answer:
            "Kami menerima pengembalian dalam waktu 30 hari sejak tanggal pembelian. Produk harus dalam kondisi asli dengan semua label dan kemasan.",
        },
        {
          question: "Bagaimana cara memulai pengembalian?",
          answer:
            "Untuk memulai pengembalian, masuk ke akun Anda, buka halaman 'Pesanan Saya', pilih pesanan yang relevan, dan klik 'Minta Pengembalian'. Ikuti petunjuk untuk menyelesaikan proses.",
        },
        {
          question: "Berapa lama waktu untuk menerima pengembalian dana?",
          answer:
            "Setelah pengembalian diterima dan diproses, pengembalian dana biasanya membutuhkan waktu 5-10 hari kerja untuk muncul di akun Anda, tergantung pada metode pembayaran asli.",
        },
        {
          question: "Apakah saya harus membayar biaya pengiriman untuk pengembalian?",
          answer:
            "Biaya pengiriman untuk pengembalian ditanggung oleh pelanggan, kecuali jika produk yang diterima cacat atau salah kirim.",
        },
      ],
    },
    {
      id: "account",
      label: "Akun",
      icon: <Package className="h-4 w-4 mr-2" />,
      questions: [
        {
          question: "Bagaimana cara membuat akun?",
          answer:
            "Untuk membuat akun, klik 'Daftar' di pojok kanan atas halaman. Isi formulir dengan informasi yang diperlukan dan ikuti petunjuk untuk menyelesaikan pendaftaran.",
        },
        {
          question: "Bagaimana cara mengubah kata sandi saya?",
          answer:
            "Untuk mengubah kata sandi, masuk ke akun Anda, buka halaman 'Profil', pilih tab 'Keamanan', dan klik 'Ubah Kata Sandi'. Ikuti petunjuk untuk menetapkan kata sandi baru.",
        },
        {
          question: "Bagaimana cara mengelola alamat pengiriman saya?",
          answer:
            "Untuk mengelola alamat pengiriman, masuk ke akun Anda, buka halaman 'Profil', dan pilih tab 'Alamat'. Di sini Anda dapat menambah, mengedit, atau menghapus alamat pengiriman.",
        },
        {
          question: "Bagaimana jika saya lupa kata sandi?",
          answer:
            "Jika Anda lupa kata sandi, klik 'Lupa Kata Sandi' di halaman login. Masukkan alamat email Anda, dan kami akan mengirimkan instruksi untuk mengatur ulang kata sandi.",
        },
      ],
    },
  ]

  const filteredFAQs = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqCategories

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pertanyaan yang Sering Diajukan</h1>

      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari pertanyaan..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="orders" className="max-w-3xl mx-auto">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          {faqCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center">
              {category.icon}
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  {category.icon}
                  <span className="ml-2">{category.label}</span>
                </h2>

                {category.questions.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    Tidak ada hasil yang cocok dengan pencarian Anda.
                  </p>
                )}
              </Card>
            </TabsContent>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Tidak ada hasil yang cocok dengan pencarian Anda.</p>
            <Button onClick={() => setSearchQuery("")}>Hapus Pencarian</Button>
          </div>
        )}
      </Tabs>

      <div className="max-w-3xl mx-auto mt-12 text-center">
        <h2 className="text-xl font-bold mb-4">Masih Punya Pertanyaan?</h2>
        <p className="text-muted-foreground mb-6">
          Jika Anda tidak menemukan jawaban yang Anda cari, jangan ragu untuk menghubungi tim dukungan kami.
        </p>
        <Button asChild>
          <a href="/contact">Hubungi Kami</a>
        </Button>
      </div>
    </main>
  )
}

