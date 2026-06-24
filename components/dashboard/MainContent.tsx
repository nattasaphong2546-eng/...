import WarehouseGrid from "./WarehouseGrid"
import EmptyState from "./EmptyState"

import RawMaterialQCForm from "./qc/RawMaterialQCForm"

type Props = {
  selectedDept: string
  selectedSection: string
}

export default function MainContent({
  selectedDept,
  selectedSection,
}: Props) {
  return (
    <div className="flex-1 px-6 pb-6 overflow-auto">
      <div className="bg-card rounded-2xl h-full min-h-[500px] shadow-sm">

        {/* คลังสินค้า */}
        {selectedSection === "คลังสินค้า" ? (
          <WarehouseGrid />

        /* QC ตรวจสอบวัตถุดิบ */
        ) : selectedSection === "ตรวจสอบคุณภาพวัตถุดิบ" ? (
          <RawMaterialQCForm />

        /* หน้าอื่น ๆ */
        ) : (
          <EmptyState
            selectedDept={selectedDept}
            selectedSection={selectedSection}
          />
        )}

      </div>
    </div>
  )
}