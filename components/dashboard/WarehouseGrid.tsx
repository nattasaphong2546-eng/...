export default function WarehouseGrid() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        คลังสินค้า
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow">
          <p>ถั่วลายเสือ</p>
          <h3 className="text-2xl font-bold">250 kg</h3>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p>โกโก้</p>
          <h3 className="text-2xl font-bold">120 kg</h3>
        </div>
      </div>
    </div>
  )
}