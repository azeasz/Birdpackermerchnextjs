import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Truck, HeadphonesIcon, ShieldCheck, Users, Clock, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Tentang Birdpacker Store</h1>

        <div className="prose prose-lg dark:prose-invert mb-12">
          <p>
            Birdpacker Store didirikan pada tahun 2021 dengan visi sederhana: membuat belanja online menjadi lebih mudah, lebih
            aman, dan lebih menyenangkan bagi semua orang. Kami percaya bahwa teknologi seharusnya mempermudah hidup,
            bukan mempersulit.
          </p>

          <p>Sebagai perusahaan e-commerce yang berkembang pesat, kami berkomitmen untuk menyediakan:</p>

          <ul>
            <li>Produk berkualitas tinggi dari merek terpercaya</li>
            <li>Pengalaman belanja yang aman dan nyaman</li>
            <li>Layanan pelanggan yang responsif dan membantu</li>
            <li>Harga yang kompetitif dan nilai yang luar biasa</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-6">Nilai-Nilai Kami</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <ShieldCheck className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Kepercayaan & Keamanan</h3>
            </div>
            <p className="text-muted-foreground">
              Kami memprioritaskan keamanan data dan transaksi Anda. Belanja dengan tenang mengetahui bahwa informasi
              Anda selalu dilindungi.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Award className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Kualitas</h3>
            </div>
            <p className="text-muted-foreground">
              Kami hanya menawarkan produk berkualitas tinggi yang telah melewati standar ketat kami untuk memastikan
              kepuasan pelanggan.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <HeadphonesIcon className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Layanan Pelanggan</h3>
            </div>
            <p className="text-muted-foreground">
              Tim dukungan kami siap membantu Anda dengan pertanyaan, masalah, atau kebutuhan apa pun yang mungkin Anda
              miliki.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Kepedulian</h3>
            </div>
            <p className="text-muted-foreground">
              Kami peduli tentang dampak kami terhadap masyarakat dan lingkungan, berusaha untuk membuat perbedaan
              positif di dunia.
            </p>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-6">Mengapa Memilih Kami</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Pilihan Luas</h3>
            <p className="text-sm text-muted-foreground">
              Ribuan produk dari berbagai kategori untuk memenuhi semua kebutuhan Anda.
            </p>
          </div>

          <div className="text-center">
            <Truck className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Pengiriman Cepat</h3>
            <p className="text-sm text-muted-foreground">Opsi pengiriman cepat dan andal ke seluruh negeri.</p>
          </div>

          <div className="text-center">
            <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Dukungan 24/7</h3>
            <p className="text-sm text-muted-foreground">Tim dukungan kami tersedia 24/7 untuk membantu Anda.</p>
          </div>

          <div className="text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Komunitas</h3>
            <p className="text-sm text-muted-foreground">
              Bergabunglah dengan komunitas pelanggan kami yang berkembang.
            </p>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Tim Kami</h2>
          <p className="text-muted-foreground mb-8">
            Birdpacker Store didukung oleh tim profesional berdedikasi yang bersemangat tentang e-commerce dan pengalaman
            pelanggan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Swiss", role: "CEO & Founder", image: "/placeholder.svg?height=200&width=200" },
              { name: "Winnasis", role: "CTO", image: "/placeholder.svg?height=200&width=200" },
              {
                name: "Manusia",
                role: "Head of Customer Experience",
                image: "/placeholder.svg?height=200&width=200",
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className="object-cover" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

