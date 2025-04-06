import PageContainer from "../container/PageContainer";

export default function Footer() {
  return (
    <div className="mt-8 bg-primary text-white md:mt-16">
      <PageContainer>
        <div className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          <div className="space-y-2 md:space-y-4">
            <h1 className="font-semibold">Vintagee</h1>
            <div className="space-y-2 text-sm">
              <p>Tentang Vintagee</p>
              <p>Blog</p>
              <p>Jual Barang</p>
              <p>Beli Barang</p>
            </div>
          </div>
          <div className="space-y-2 md:space-y-4">
            <h1 className="font-semibold">Jelajahi</h1>
            <div className="space-y-2 text-sm">
              <p>Cara Kerja</p>
              <p>Pertanyaan</p>
            </div>
          </div>
          <div className="space-y-2 md:space-y-4">
            <h1 className="font-semibold">Pusat Bantuan</h1>
            <div className="space-y-2 text-sm">
              <p>Syarat dan Ketentuan</p>
              <p>Kebijakan Privasi</p>
            </div>
          </div>
          <div className="space-y-2 md:space-y-4">
            <h1 className="font-semibold">Ikuti Kami</h1>
            <div className="space-y-2 text-sm">
              <p>Tentang Vintagee</p>
              <p>Blog</p>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
